import fs from "fs";
import { solve } from "./Backtrack/backtrack";
import { accept } from "./Sudoku/accept";
import SudokuCandidate from "./Sudoku/Candidate";
import { first } from "./Sudoku/first";
import { next } from "./Sudoku/next";
import Grid from "./Sudoku/Grid";
import SudokuProblem, { Entry } from "./Sudoku/Problem";
import { reject } from "./Sudoku/reject";
import { root } from "./Sudoku/root";

const createProblemID = (p: SudokuProblem) => {
  if (p.entries.length !== 0) {
    return p.entries
      .map((x: Entry) => x.index.toString() + "," + x.value.toString())
      .reduce((acc: string, x: string) => acc + ":" + x);
  } else {
    return "";
  }
};

type IndexValuePair = [number, number];
type InputData = IndexValuePair[];

type Result = number[];
type Results = Result[];
class Solution {
  constructor(public id: string, public results: Results) {}
}

const run = async (file: string) => {
  return new Promise<Solution>((res, rej) => {
    fs.readFile(file, (err: Error | null, data: Buffer) => {
      if (err) {
        rej(err);
        return;
      }
      const input: InputData = JSON.parse(data.toString());
      const entries: Entry[] = input.map(
        (x: IndexValuePair) => new Entry(x[0], x[1])
      );
      const p = new SudokuProblem(entries);
      const id = createProblemID(p);
      const results: Results = [];
      const output = (p: SudokuProblem, c: SudokuCandidate) => {
        results.push(
          new Grid(p, c).values.map((x: number | null) => {
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
        res(new Solution(id, results));
      });
    });
  });
};

const list = ["problem.json", "problem2.json", "p3.json"];
list.forEach((file: string) => {
  run(file)
    .then((s: Solution) => console.log(s))
    .catch((err: Error) => {
      console.error(err.message);
    });
});
console.log("main done");
