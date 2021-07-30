import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { createProblem, createID, run, Solution } from "./utils/run";
import SudokuProblem from "./Sudoku/Problem";

const app = express();
app.use(json());

const solutions: Solution[] = [];

const values: number[] = [];
app.post("/solver", (req: Request, res: Response) => {
  const p = createProblem(req.body);
  console.log("sending");
  res.status(200).send({ id: createID(p), done: false });
  console.log("running");
  const prom = new Promise<SudokuProblem>((resolve) => resolve(p))
    .then((p: SudokuProblem) => run(p))
    .then((s: Solution) => {
      console.log("adding solution");
      solutions.push(s);
      console.log("done");
    });
  console.log(prom);
  console.log("post - done");
});

app.get("/solver/:tagId", (req: Request, res: Response) => {
  const id = req.params.tagId;
  const index = solutions.findIndex((s: Solution) => s.id === id);
  if (index >= 0) {
    res
      .status(200)
      .send({ id, done: true, solutions: solutions[index].results });
  } else {
    res.status(200).send({ id, done: false });
  }
});

app.listen(3000, () => console.log("listening on port 3000"));
