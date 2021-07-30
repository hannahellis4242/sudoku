import fs from "fs";
import SudokuProblem from "./Sudoku/Problem";
import { Solution, createProblem, run, InputData } from "./utils/run";

const runOnFile = async (file: string) => {
  const start = new Date().getTime();
  console.log("starting ", file, " : ", start);
  return new Promise<string>((res, rej) => {
    fs.readFile(file, (err: Error | null, data: Buffer) => {
      if (err) {
        rej(err);
      } else {
        res(data.toString());
      }
    });
  })
    .then((s: string) => JSON.parse(s))
    .then((raw: InputData) => createProblem(raw))
    .then((p: SudokuProblem) => run(p))
    .then((s: Solution) => {
      const end = new Date().getTime();
      console.log("ending ", file, " : ", end, " ; runtime ", end - start);
      return s;
    });
};

const list = [
  "problem.json",
  "problem2.json",
  "problem3.json",
  "problem4.json",
  "problem5.json",
];
list.forEach((file: string) => {
  runOnFile(file)
    .then((s: Solution) => console.log(s))
    .catch((err: Error) => {
      console.error("Error : ", err.message);
    });
});
console.log("main done");
