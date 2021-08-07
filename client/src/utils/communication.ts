import axios, { AxiosResponse } from "axios";

type Result = number[];
export type Results = Result[];
interface GetResult {
  id: string;
  done: boolean;
  results: Results;
}

const pollForSolution = (id: string) => {
  console.log("pollForSolution() is fired");
  return new Promise<Results>((resolve, reject) => {
    const pollingDelay = 1000;
    let result: Results | null = null;

    const pollState = () => {
      axios
        .get("/solver/id/" + encodeURI(id))
        .then((value: AxiosResponse<GetResult>) => {
          console.log("data : ", value.data);
          result = value.data.results;
          continueCheckingForCompletion();
        })
        .catch((err: Error) => reject(err));
    };

    const continueCheckingForCompletion = () => {
      if (!result) {
        setTimeout(pollState, pollingDelay);
      } else {
        resolve(result);
      }
    };

    continueCheckingForCompletion();
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

export const processSudoku = (data: InputData) => {
  return new Promise<Results>((resolve, reject) => {
    axios
      .post("/solver", data)
      .then((_: AxiosResponse<any>) => pollForSolution(createID(data)))
      .then((value: Results) => resolve(value))
      .catch((error: Error) => reject(error));
  });
};
