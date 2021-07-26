import Candidate from "./Candidate";
import Problem from "./Problem";

export const next = (_: Problem, c: Candidate) => {
  const last = c.values[c.values.length - 1];
  if (last < 9) {
    const cp = [...c.values];
    cp.pop();
    cp.push(last + 1);
    return new Candidate(cp);
  }
  return null;
};
