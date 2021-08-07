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

export const getDataFromCell = (
  cell: HTMLSelectElement
): IndexValuePair | null => {
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

export const buildSolution = async (results: Results, parent: HTMLElement) => {
  //clear
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
  parent.innerText = JSON.stringify(results);
};

export const handleSolve = (
  cells: HTMLSelectElement[],
  parent: HTMLElement
) => {
  parent.innerText = "Calculating Solutions.\nPlease Wait...";
  const data = cells
    .map((cell: HTMLSelectElement) => getDataFromCell(cell))
    .filter((value: IndexValuePair | null) => value !== null) as InputData;
  processSudoku(data)
    .then((result: Results) => buildSolution(result, parent))
    .catch((err: Error) => {
      console.log(err);
      parent.innerText = "An Error Occured please try again.";
    });
};
