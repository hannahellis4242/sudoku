"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
class Entry {
    constructor(index, value) {
        this.index = index;
        this.value = value;
    }
}
exports.Entry = Entry;
class SudokuProblem {
    constructor(entries) {
        this.entries = entries;
    }
}
exports.default = SudokuProblem;
