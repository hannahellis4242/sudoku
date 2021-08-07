import express, { Request, Response } from "express";
import path from "path";
import router from "./routes/routes";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use("/solver", router);
app.use("/img", express.static(path.join(__dirname, "../public/img")));
app.get("/", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
app.get("/index.html", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
app.get("/help.html", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/help.html"))
);
app.get("/about.html", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/about.html"))
);
app.get("/style.css", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/style/style.css"))
);
app.get("/scripts/app.js", (_: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../public/scripts/app.js"))
);
app.get("*", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(404).send();
});
app.listen(3000, () => console.log("sudoku server lisening on port 3000"));
