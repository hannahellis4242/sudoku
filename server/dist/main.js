"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
const body_parser_1 = require("body-parser");
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/solver", routes_1.default);
app.get("/", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/index.html")));
app.get("/index.html", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/index.html")));
app.get("/help.html", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/help.html")));
app.get("/about.html", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/about.html")));
app.get("/style.css", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/style/style.css")));
app.get("/scripts/app.js", (_, res) => res.sendFile(path_1.default.join(__dirname, "../public/scripts/app.js")));
app.get("*", (req, res) => {
    console.log(req.url);
    res.status(404).send();
});
/*
app.post("/solver", (req: Request, res: Response) => {
  setTimeout(() => console.log("post waited"), 10000);
  res.status(200).send({ message: "Hello" });
});
*/
app.listen(3000, () => console.log("sudoku server lisening on port 3000"));
