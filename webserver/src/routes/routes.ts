import { Router, RequestHandler } from "express";

type Result = number[];
type Results = Result[];
interface Solution {
  id: string;
  results: Results;
}

const solutions: Solution[] = [];

const postProblem: RequestHandler = (req, res) => {
  res.status(404).send();
};

export const getSolutionById: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const index = solutions.findIndex((s: Solution) => s.id === id);
  if (index >= 0) {
    const results = solutions[index].results;
    res.status(200).send({ id, done: true, results });
  } else {
    res.status(200).send({ id, done: false });
  }
};

const router = Router();
router.post("/", postProblem);
router.get("/id/:id", getSolutionById);
export default router;
