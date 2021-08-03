export class Entry {
  constructor(public index: number, public value: number) {}
}

export default class SudokuProblem {
  constructor(public entries: Entry[]) {}
}
