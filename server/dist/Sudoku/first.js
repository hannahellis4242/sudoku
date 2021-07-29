"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.first = void 0;
const Candidate_1 = __importDefault(require("./Candidate"));
const first = (p, c) => {
    const gaps = 81 - p.entries.length;
    if (c.values.length < gaps) {
        const cp = [...c.values];
        cp.push(1);
        return new Candidate_1.default(cp);
    }
    return null;
};
exports.first = first;
