import axios, { AxiosResponse } from "axios";
import { IndexValuePair, getDataFromCell } from "./utils/utils";

const elements = document.getElementsByTagName("main");
if (elements.length !== 0) {
  const main = elements[0];
  const resultSection = document.createElement("section");
  resultSection.id = "results";
  const cells: HTMLSelectElement[] = [];
  //adding input table
  {
    const inputSection = document.createElement("section");
    {
      const header = document.createElement("header");
      header.innerText = "Sudoku Solver";
      inputSection.appendChild(header);
    }
    {
      const p = document.createElement("p");
      p.innerText = "Please Enter your problem below";
      inputSection.appendChild(p);
    }
    const form = document.createElement("form");
    const table = document.createElement("table");
    table.id = "sudoku";
    for (let row = 0; row < 9; ++row) {
      const rowEl = document.createElement("tr");
      for (let col = 0; col < 9; ++col) {
        const cell = document.createElement("td");
        const select = buildSelect("cell_" + (row * 9 + col).toString());
        cell.appendChild(select);
        rowEl.appendChild(cell);
        cells.push(select);
      }
      table.appendChild(rowEl);
    }
    form.appendChild(table);
    {
      const button = document.createElement("input");
      button.type = "submit";
      button.value = "Solve";
      button.addEventListener("click", async (event: MouseEvent) => {
        event.preventDefault();
        handleSolve(cells, resultSection);
      });
      form.appendChild(button);
    }
    inputSection.appendChild(form);
    main.appendChild(inputSection);
    main.appendChild(resultSection);
  }
}
