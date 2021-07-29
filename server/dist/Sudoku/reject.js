"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = void 0;
const Grid_1 = __importDefault(require("./Grid"));
const reject = (p, c) => {
    return new Grid_1.default(p, c).reject();
};
exports.reject = reject;
