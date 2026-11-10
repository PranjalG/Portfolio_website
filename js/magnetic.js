export function initMagnetic() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (reduce || !fine) return;

  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      element.style.setProperty("--mx", `${Math.max(-10, Math.min(10, x * 0.2))}px`);
      element.style.setProperty("--my", `${Math.max(-8, Math.min(8, y * 0.28))}px`);
    });

    element.addEventListener("mouseleave", () => {
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    });
  });
}
