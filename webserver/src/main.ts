import express, { Request, Response } from "express";
import path from "path";
import router from "./routes/routes";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use("/solver", router);
app.use("/", express.static(path.join(__dirname, "../public")));
app.get("*", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(404).send();
});
app.listen(3000, () => console.log("sudoku server lisening on port 3000"));
