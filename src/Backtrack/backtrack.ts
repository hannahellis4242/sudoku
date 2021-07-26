export type OutputFn<P, C> = (problem: P, candidate: C) => void;
export type RejectFn<P, C> = (problem: P, candidate: C) => boolean;
export type AcceptFn<P, C> = (problem: P, candidate: C) => boolean;
export type FirstFn<P, C> = (problem: P, candidate: C) => C | null;
export type NextFn<P, C> = (problem: P, candidate: C) => C | null;

const backtrack = <P, C>(
  problem: P,
  candidate: C,
  first: FirstFn<P, C>,
  next: NextFn<P, C>,
  reject: RejectFn<P, C>,
  accept: AcceptFn<P, C>,
  output: OutputFn<P, C>
) => {
  if (reject(problem, candidate)) {
    return;
  }
  if (accept(problem, candidate)) {
    output(problem, candidate);
  }
  let extension = first(problem, candidate);
  while (extension !== null) {
    backtrack(problem, extension, first, next, reject, accept, output);
    extension = next(problem, extension);
  }
};

export type RootFn<P, C> = (problem: P) => C;
export const solve = async <P, C>(
  problem: P,
  root: RootFn<P, C>,
  first: FirstFn<P, C>,
  next: NextFn<P, C>,
  reject: RejectFn<P, C>,
  accept: AcceptFn<P, C>,
  output: OutputFn<P, C>
) => {
  backtrack(problem, root(problem), first, next, reject, accept, output);
};
