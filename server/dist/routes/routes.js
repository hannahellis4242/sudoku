"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolutionById = void 0;
const express_1 = require("express");
const backtrack_1 = require("../Backtrack/backtrack");
const accept_1 = require("../Sudoku/accept");
const first_1 = require("../Sudoku/first");
const next_1 = require("../Sudoku/next");
const Grid_1 = __importDefault(require("../Sudoku/Grid"));
const Problem_1 = __importStar(require("../Sudoku/Problem"));
const reject_1 = require("../Sudoku/reject");
const root_1 = require("../Sudoku/root");
const createProblemID = (p) => {
    if (p.entries.length !== 0) {
        return p.entries
            .map((x) => x.index.toString() + "," + x.value.toString())
            .reduce((acc, x) => acc + ":" + x);
    }
    else {
        return "";
    }
};
class Solution {
    constructor(id, results) {
        this.id = id;
        this.results = results;
    }
}
const solutions = [];
const run = async (id, p) => {
    return new Promise((resolve) => {
        console.log("solving ", id);
        const results = [];
        const output = (p, c) => {
            const grid = new Grid_1.default(p, c);
            results.push(grid.values.map((x) => {
                if (x) {
                    return x;
                }
                else {
                    return -1;
                }
            }));
        };
        backtrack_1.solve(p, root_1.root, first_1.first, next_1.next, reject_1.reject, accept_1.accept, output).then(() => {
            console.log("solved : ", id);
            solutions.push(new Solution(id, results));
            console.log(results);
        });
        resolve();
    });
};
const convertToProblem = (raw) => {
    if (raw.length !== 0) {
        return new Problem_1.default(raw.map((value) => new Problem_1.Entry(value[0], value[1])));
    }
    else {
        return new Problem_1.default([]);
    }
};
const postProblem = async (req, res) => {
    const problem = convertToProblem(req.body);
    const id = createProblemID(problem);
    const index = solutions.findIndex((s) => s.id === id);
    if (index >= 0) {
        const results = solutions[index].results;
        res.status(200).send({ id, done: true, results });
    }
    else {
        console.log("sending response");
        res.status(200).send({ id, done: false });
        console.log("running solver");
        run(id, problem);
    }
    console.log("done post");
};
const getSolutionById = (req, res) => {
    const id = req.params.id;
    const index = solutions.findIndex((s) => s.id === id);
    if (index >= 0) {
        const results = solutions[index].results;
        res.status(200).send({ id, done: true, results });
    }
    else {
        res.status(200).send({ id, done: false });
    }
};
exports.getSolutionById = getSolutionById;
const router = express_1.Router();
router.post("/", postProblem);
router.get("/id/:id", exports.getSolutionById);
exports.default = router;
