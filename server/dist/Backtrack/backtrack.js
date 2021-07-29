"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = void 0;
const backtrack = (problem, candidate, first, next, reject, accept, output) => {
    if (reject(problem, candidate)) {
        return;
    }
    if (accept(problem, candidate)) {
        output(problem, candidate);
    }
    let extension = first(problem, candidate);
    while (extension !== null) {
        backtrack(problem, extension, first, next, reject, accept, output);
        extension = next(problem, extension);
    }
};
const solve = async (problem, root, first, next, reject, accept, output) => {
    return new Promise((resolve) => resolve(backtrack(problem, root(problem), first, next, reject, accept, output)));
};
exports.solve = solve;
