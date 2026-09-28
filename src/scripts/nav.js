// Mobile menu: the hamburger button toggles the nav links open and closed.
export function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.getElementById(toggle?.getAttribute("aria-controls"));
  if (!toggle || !links) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after choosing a section so it doesn't cover the page.
  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
}
