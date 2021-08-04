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

const getSolution = (x: Input) => {
  const sock = new Socket();
  sock.connect(5000, "127.0.0.1", () => {
    console.log("Connected sudoku sever");
    sock.write(JSON.stringify(x));
  });
  let str = "";
  sock.on("data", (data: Buffer) => {
    console.log("server sent : ", data.toString());
    str += data.toString();
  });
  sock.on("close", () => {
    console.log("Connection closed");
    solutions.push(JSON.parse(str.toString()));
  });
};

const postProblem: RequestHandler = (req, res) => {
  getSolution(req.body);
  res.status(200).send();
};

export const getSolutionById: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const index = solutions.findIndex((s: Solution) => s.id === id);
  if (index >= 0) {
    const results = solutions[index].results;
    res.status(200).send({ id, done: true, results });
  } else {
    res.status(200).send({ id, done: false });
  }
};

const router = Router();
router.post("/", postProblem);
router.get("/id/:id", getSolutionById);
export default router;
