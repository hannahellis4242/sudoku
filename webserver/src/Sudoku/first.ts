import Candidate from "./Candidate";
import Problem from "./Problem";

export const first = (p: Problem, c: Candidate) => {
  const gaps = 81 - p.entries.length;
  if (c.values.length < gaps) {
    const cp = [...c.values];
    cp.push(1);
    return new Candidate(cp);
  }
  return null;
};
