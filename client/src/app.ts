import axios, { AxiosResponse } from "axios";

const buildSelect = (id: string) => {
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

const elements = document.getElementsByTagName("main");
if (elements.length !== 0) {
  const main = elements[0];
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
      button.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        const data = cells
          .map((select: HTMLSelectElement) => {
            const matches = select.id.match("cell_(\\d*)");
            if (matches && matches.length !== 0) {
              const index = parseInt(matches[1]);
              if (!isNaN(index) && select.value !== " ") {
                const num = parseInt(select.value);
                if (!isNaN(num)) {
                  return [index, num];
                }
              }
            }
            return null;
          })
          .filter((value: number[] | null) => value !== null);
        axios
          .post("/solver", data)
          .then((value: AxiosResponse<any>) => {
            console.log("response : ", value);
          })
          .catch((error: Error) => console.log(error));
      });
      form.appendChild(button);
    }
    inputSection.appendChild(form);
    main.appendChild(inputSection);
  }
}
