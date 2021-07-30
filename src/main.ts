import fs from "fs";
import { Solution, createProblem, run } from "./utils/run";

const runOnFile = async (file: string) => {
  console.log("starting");
  return new Promise<Solution>((res, rej) => {
    fs.readFile(file, (err: Error | null, data: Buffer) => {
      if (err) {
        rej(err);
        return;
      }
      res(run(createProblem(JSON.parse(data.toString()))));
      console.log("ending");
    });
  });
};

const list = ["problem.json", "problem2.json", "p3.json"];
list.forEach((file: string) => {
  runOnFile(file)
    .then((s: Solution) => console.log(s))
    .catch((err: Error) => {
      console.error(err.message);
    });
});
console.log("main done");
