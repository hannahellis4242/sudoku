"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accept = void 0;
const Grid_1 = __importDefault(require("./Grid"));
const accept = (p, c) => {
    return new Grid_1.default(p, c).accept();
};
exports.accept = accept;
