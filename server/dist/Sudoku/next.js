"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.next = void 0;
const Candidate_1 = __importDefault(require("./Candidate"));
const next = (_, c) => {
    const last = c.values[c.values.length - 1];
    if (last < 9) {
        const cp = [...c.values];
        cp.pop();
        cp.push(last + 1);
        return new Candidate_1.default(cp);
    }
    return null;
};
exports.next = next;
