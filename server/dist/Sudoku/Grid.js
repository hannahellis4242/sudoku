"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findNextIndex = (index, values) => {
    if (values[index]) {
        return findNextIndex(index + 1, values);
    }
    return index;
};
const hasDuplicate = (ts) => {
    let [head, ...tail] = ts;
    while (tail.length !== 0) {
        const index = tail.findIndex((value) => head === value);
        if (index >= 0) {
            return true;
        }
        [head, ...tail] = tail;
    }
    return false;
};
const checkIndices = (indices, values) => {
    //build array
    const vs = [];
    for (const index of indices) {
        const value = values[index];
        if (value) {
            vs.push(value);
        }
    }
    return !hasDuplicate(vs);
};
const toCheck = [
    //rows
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    //-----
    [27, 28, 29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    //-----
    [54, 55, 56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77, 78, 79, 80],
    //
    //columns
    [0, 9, 18, 27, 36, 45, 54, 63, 72],
    [1, 10, 19, 28, 37, 46, 55, 64, 73],
    [2, 11, 20, 29, 38, 47, 56, 65, 74],
    //-----
    [3, 12, 21, 30, 39, 48, 57, 66, 75],
    [4, 13, 22, 31, 40, 49, 58, 67, 76],
    [5, 14, 23, 32, 41, 50, 59, 68, 77],
    //-----
    [6, 15, 24, 33, 42, 51, 60, 69, 78],
    [7, 16, 25, 34, 43, 52, 61, 70, 79],
    [8, 17, 26, 35, 44, 53, 62, 71, 80],
    //
    //squares
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80], //squareBottomRight
];
/*const showGridHTML = (values: Array<number | null>) => {
  let out = "<table>";
  for (let row = 0; row < 9; ++row) {
    out += "<tr>";
    for (let col = 0; col < 9; ++col) {
      out += "<td>";
      const index = row * 9 + col;
      const value = values[index];
      if (value) {
        out += value.toString();
      } else {
        out += "--";
      }
      out += "</td>";
    }
    out += "</tr>";
  }
  out += "</table>";
  return out;
};*/
const showGrid = (values) => {
    return values
        .map((x) => {
        if (x) {
            return x.toString();
        }
        else {
            return " ";
        }
    })
        .reduce((acc, x) => acc + "," + x);
};
const checkAll = (values) => {
    //console.log(showGrid(values));
    for (const indices of toCheck) {
        if (!checkIndices(indices, values)) {
            return false;
        }
    }
    return true;
};
class Grid {
    constructor(p, c) {
        this.values = new Array(81).fill(null);
        //use the problem to fill in the known values
        p.entries.forEach((entry) => {
            this.values[entry.index] = entry.value;
        });
        //then use the candidate to fill in the rest
        let index = 0;
        for (const value of c.values) {
            if (index < this.values.length) {
                index = findNextIndex(index, this.values);
                this.values[index] = value;
            }
            else {
                console.error("too many values in candidate");
                break;
            }
        }
    }
    accept() {
        //accept the grid if all values are filled. ie none are null
        const i = this.values.findIndex((value) => value === null);
        if (i < 0) {
            return checkAll(this.values);
        }
        return false;
    }
    reject() {
        //return false; //just curious how long a brute force method would take
        return !checkAll(this.values);
    }
    show() {
        return this.values.toString();
    }
}
exports.default = Grid;
