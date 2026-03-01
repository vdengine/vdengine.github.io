import { elements } from "./elements-data.js";

const container = document.querySelector(".periodic-table");
const infoPanel = document.getElementById("info-panel");

function getBlock(el) {
  if (el.symbol === "He") return "s";
  if (el.col <= 2) return "s";
  if (el.col <= 12 && el.row >= 4) return "d";
  return "p";
}

elements.forEach(el => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.style.gridColumn = el.col;
  cell.style.gridRow = el.row;

  cell.classList.add(getBlock(el));

  cell.innerHTML = `
    <div class="number">${el.number}</div>
    <div class="symbol">${el.symbol}</div>
    <div class="mass">${el.mass}</div>
  `;

  cell.addEventListener("click", () => {
    infoPanel.innerHTML = `
      <strong>${el.symbol}</strong><br>
      Atomic Number: ${el.number}<br>
      Atomic Mass: ${el.mass}
    `;
    infoPanel.classList.add("show");
  });

  container.appendChild(cell);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".cell")) {
    infoPanel.classList.remove("show");
  }
});