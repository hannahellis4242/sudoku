"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const Candidate_1 = __importDefault(require("./Candidate"));
const root = (_) => {
    return new Candidate_1.default([]);
};
exports.root = root;
