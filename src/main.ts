import fs from "fs";
import SudokuProblem from "./Sudoku/Problem";
import { Solution, createProblem, run, InputData } from "./utils/run";
import objectHash from "object-hash";

const openAndReadFile = async (file: string) => {
  return new Promise<string>((res, rej) => {
    fs.readFile(file, (err: Error | null, data: Buffer) => {
      if (err) {
        rej(err);
      } else {
        res(data.toString());
      }
    });
  });
};

const list = [
  "problem.json",
  "problem2.json",
  "problem3.json",
  "problem4.json",
  //"problem5.json",
];
const promises = list.map((file: string) =>
  openAndReadFile(file)
    .then((s: string) => JSON.parse(s))
    .then((raw: InputData) => createProblem(raw))
    .catch((err: Error) => {
      console.error("Error : ", err.message);
      return null;
    })
);
Promise.all(promises).then((value: (SudokuProblem | null)[]) => {
  const problems: SudokuProblem[] = [];
  value
    .filter((v: SudokuProblem | null) => v !== null)
    .forEach((x: SudokuProblem | null) => problems.push(x as SudokuProblem));
  console.log("solving problems");
  problems.forEach((problem: SudokuProblem) => {
    const id = objectHash(problem);
    console.log("starting ", id);
    run(problem).then((value: Solution) => {
      console.log("finshed ", id);
      console.log(value);
    });
  });
});
console.log("main done");
