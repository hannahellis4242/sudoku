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

type IndexValuePair = [number, number];
type InputData = IndexValuePair[];

fs.readFile("problem.json", (err: Error | null, data: Buffer) => {
  if (err) {
    console.error(err.message);
  }
  const input: InputData = JSON.parse(data.toString());
  const entries: Entry[] = [];
  for (const indexValuePair of input) {
    entries.push(new Entry(indexValuePair[0], indexValuePair[1]));
  }
  const p = new SudokuProblem(entries);
  const output = (p: SudokuProblem, c: SudokuCandidate) => {
    console.log(new Grid(p, c).show());
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
});
