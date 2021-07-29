import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { NextFn, solve } from "../Backtrack/backtrack";
import { accept } from "../Sudoku/accept";
import SudokuCandidate from "../Sudoku/Candidate";
import { first } from "../Sudoku/first";
import { next } from "../Sudoku/next";
import Grid from "../Sudoku/Grid";
import SudokuProblem, { Entry } from "../Sudoku/Problem";
import { reject } from "../Sudoku/reject";
import { root } from "../Sudoku/root";

const createProblemID = (p: SudokuProblem) => {
  if (p.entries.length !== 0) {
    return p.entries
      .map((x: Entry) => x.index.toString() + "," + x.value.toString())
      .reduce((acc: string, x: string) => acc + ":" + x);
  } else {
    return "";
  }
};
type Result = number[];
class Solution {
  constructor(public id: string, public results: Result[]) {}
}
const solutions: Solution[] = [];

const run = async (id: string, p: SudokuProblem) => {
  return new Promise<void>((resolve) => {
    console.log("solving ", id);
    const results: Result[] = [];
    const output = (p: SudokuProblem, c: SudokuCandidate) => {
      const grid = new Grid(p, c);
      results.push(
        grid.values.map((x: number | null) => {
          if (x) {
            return x;
          } else {
            return -1;
          }
        })
      );
    };
    solve<SudokuProblem, SudokuCandidate>(
      p,
      root,
      first,
      next,
      reject,
      accept,
      output
    ).then(() => {
      console.log("solved : ", id);
      solutions.push(new Solution(id, results));
      console.log(results);
    });
    resolve();
  });
};

type RawEntry = [number, number];
type RawData = RawEntry[];

const convertToProblem = (raw: RawData) => {
  if (raw.length !== 0) {
    return new SudokuProblem(
      raw.map((value: RawEntry) => new Entry(value[0], value[1]))
    );
  } else {
    return new SudokuProblem([]);
  }
};

const postProblem: RequestHandler = async (req, res) => {
  const problem = convertToProblem(req.body);
  const id = createProblemID(problem);
  const index = solutions.findIndex((s: Solution) => s.id === id);
  if (index >= 0) {
    const results = solutions[index].results;
    res.status(200).send({ id, done: true, results });
  } else {
    console.log("sending response");
    res.status(200).send({ id, done: false });
    console.log("running solver");
    run(id, problem);
  }
  console.log("done post");
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
