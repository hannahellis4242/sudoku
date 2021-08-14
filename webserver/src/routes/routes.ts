import { Router, RequestHandler } from "express";
import { Socket } from "net";

type InputEntry = [number, number];
type Input = InputEntry[];

type Result = number[];
type Results = Result[];
interface Solution {
  id: string;
  results: Results;
}

const solutions: Solution[] = [];

const getSolution = (x: Input, port: number) => {
  const sock = new Socket();
  const ip = process.env.SOLVER_DOMAIN_NAME as string;
  sock.connect(port, ip, () => {
    console.log("Connected sudoku sever");
    sock.write(JSON.stringify(x) + "\n");
  });
  let str = "";
  sock.on("data", (data: Buffer) => {
    console.log("server sent : ", data.toString());
    str += data.toString();
  });
  sock.on("close", () => {
    console.log("Connection closed");
    console.log(str);
    if (str.length !== 0) {
      solutions.push(JSON.parse(str.toString()));
      console.log("solutions in cache : ", solutions.length);
    }
  });
};

export type IndexValuePair = [number, number];
export type InputData = IndexValuePair[];
const createID = (p: InputData) => {
  if (p.length !== 0) {
    return p
      .map(
        (x: IndexValuePair) =>
          x[0].toString().padStart(2, "0") + x[1].toString()
      )
      .reduce((acc: string, x: string) => acc + x);
  } else {
    return "";
  }
};

const postProblem: RequestHandler = (req, res) => {
  const id = createID(req.body);
  const index = solutions.findIndex((s: Solution) => s.id === id);
  if (index < 0) {
    res.status(200).send({ id, done: false });
    getSolution(req.body, 5000);
  } else {
    res.status(200).send({ id, done: true });
  }
};

const getSolutionById: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  console.log("id : ", id);
  const index = solutions.findIndex((s: Solution) => s.id === id);
  console.log("found index : ", index);
  if (index >= 0) {
    const results = solutions[index].results;
    console.log(results);
    res.status(200).send({ id, done: true, results });
    console.log("sent");
  } else {
    res.status(200).send({ id, done: false });
  }
};

const router = Router();
router.post("/", postProblem);
router.get("/id/:id", getSolutionById);
export default router;
