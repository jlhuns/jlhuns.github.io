import "./styles/main.css";
import { initNav } from "./scripts/nav.js";
import { initSliders } from "./scripts/slider.js";

initNav();
initSliders();

for (const el of document.querySelectorAll("[data-current-year]")) {
  el.textContent = String(new Date().getFullYear());
}
