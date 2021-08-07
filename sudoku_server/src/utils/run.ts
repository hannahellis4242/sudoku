import SudokuProblem, { Entry } from "../Sudoku/Problem";
import SudokuCandidate from "../Sudoku/Candidate";
import Grid from "../Sudoku/Grid";
import { solve } from "../Backtrack/backtrack";
import { root } from "../Sudoku/root";
import { first } from "../Sudoku/first";
import { next } from "../Sudoku/next";
import { reject } from "../Sudoku/reject";
import { accept } from "../Sudoku/accept";

type IndexValuePair = [number, number];
export type InputData = IndexValuePair[];
export const createProblem = (data: InputData) => {
  return new SudokuProblem(
    data.map((x: IndexValuePair) => new Entry(x[0], x[1]))
  );
};

type Result = number[];
type Results = Result[];
export class Solution {
  constructor(public id: string, public results: Results) {}
}

export const createID = (p: SudokuProblem) => {
  if (p.entries.length !== 0) {
    return p.entries
      .map(
        (x: Entry) => x.index.toString().padStart(2, "0") + x.value.toString()
      )
      .reduce((acc: string, x: string) => acc + x);
  } else {
    return "";
  }
};

export const run = async (p: SudokuProblem) => {
  return new Promise<Solution>((resolve) => {
    const id = createID(p);
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
    );
    resolve(new Solution(id, results));
  });
};
