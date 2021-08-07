import {
  processSudoku,
  IndexValuePair,
  InputData,
  Results,
} from "./communication";

export const buildSelect = (id: string) => {
  const select = document.createElement("select");
  select.id = id;
  //blank option
  {
    const option = document.createElement("option");
    option.value = " ";
    option.innerText = " ";
    select.appendChild(option);
  }
  //number options
  for (let i = 1; i <= 9; ++i) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.innerText = i.toString();
    select.appendChild(option);
  }
  return select;
};

const getDataFromCell = (cell: HTMLSelectElement): IndexValuePair | null => {
  const matches = cell.id.match("cell_(\\d*)");
  if (matches && matches.length !== 0) {
    const index = parseInt(matches[1]);
    if (!isNaN(index) && cell.value !== " ") {
      const num = parseInt(cell.value);
      if (!isNaN(num)) {
        return [index, num];
      }
    }
  }
  return null;
};

const clear = (x: HTMLElement) => {
  while (x.lastChild) {
    x.removeChild(x.lastChild);
  }
};

const buildSolutionTable = (result: number[], parent: HTMLElement) => {
  const table = document.createElement("table");
  for (let row = 0; row < 9; ++row) {
    const tableRow = document.createElement("tr");
    const rowIndexStart = row * 9;
    for (let col = 0; col < 9; ++col) {
      const index = rowIndexStart + col;
      const tableData = document.createElement("td");
      tableData.innerText = result[index].toString();
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  parent.appendChild(table);
};

const buildSolution = (results: Results, parent: HTMLElement) => {
  clear(parent);
  results.forEach((result: number[]) => {
    const div = document.createElement("div");
    div.classList.add("solution");
    buildSolutionTable(result, div);
    parent.appendChild(div);
  });
};

export const handleSolve = (
  cells: HTMLSelectElement[],
  parent: HTMLElement
) => {
  {
    clear(parent);
    const p = document.createElement("p");
    p.id = "waiting";
    p.innerText = "Calculating Solutions.\nPlease Wait...";
    parent.appendChild(p);
  }
  const data = cells
    .map((cell: HTMLSelectElement) => getDataFromCell(cell))
    .filter((value: IndexValuePair | null) => value !== null) as InputData;
  processSudoku(data)
    .then((result: Results) => buildSolution(result, parent))
    .catch((err: Error) => {
      clear(parent);
      const p = document.createElement("p");
      p.id = "error";
      p.innerText = "An error occure\nplease try again.";
      parent.appendChild(p);
    });
};
