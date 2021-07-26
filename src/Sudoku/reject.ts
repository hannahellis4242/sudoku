import Candidate from "./Candidate";
import Grid from "./Grid";
import Problem from "./Problem";

export const reject = (p: Problem, c: Candidate) => {
  return new Grid(p, c).reject();
};
