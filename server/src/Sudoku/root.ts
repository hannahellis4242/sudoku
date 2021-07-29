import Candidate from "./Candidate";
import Problem from "./Problem";

export const root = (_: Problem) => {
  return new Candidate([]);
};
