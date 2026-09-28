// Image carousel. Markup contract:
//   [data-slider]
//     [data-slides] > .slide (one per image)
//     [data-slider-prev], [data-slider-next]
export function initSliders(root = document) {
  for (const slider of root.querySelectorAll("[data-slider]")) {
    createSlider(slider);
  }
}

function createSlider(slider) {
  const track = slider.querySelector("[data-slides]");
  const slides = track.children;
  let index = 0;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    Array.from(slides).forEach((slide, i) => {
      slide.setAttribute("aria-hidden", String(i !== index));
    });
  };

  slider.querySelector("[data-slider-prev]")?.addEventListener("click", () => show(index - 1));
  slider.querySelector("[data-slider-next]")?.addEventListener("click", () => show(index + 1));

  show(0);
}
