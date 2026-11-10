export function initCitations() {
  const buttons = [...document.querySelectorAll(".cite-mark")];
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let closeTimer = 0;

  buttons.forEach((button) => {
    const pop = document.getElementById(button.getAttribute("aria-controls") || "");
    if (!pop || typeof pop.showPopover !== "function") return;

    const place = () => {
      const rect = button.getBoundingClientRect();
      const width = Math.min(280, window.innerWidth - 16);
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      const below = rect.bottom + 8;
      const top = below + 150 > window.innerHeight ? Math.max(8, rect.top - 150) : below;
      pop.style.left = `${left}px`;
      pop.style.top = `${top}px`;
    };

    const open = () => {
      window.clearTimeout(closeTimer);
      place();
      if (!pop.matches(":popover-open")) pop.showPopover();
      button.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      window.clearTimeout(closeTimer);
      if (pop.matches(":popover-open")) pop.hidePopover();
      button.setAttribute("aria-expanded", "false");
    };

    const scheduleClose = () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(close, 160);
    };

    const toggle = () => {
      if (pop.matches(":popover-open")) close();
      else open();
    };

    button.addEventListener("click", (event) => {
      if (fine && event.detail > 0) return;
      toggle();
    });

    if (fine) {
      button.addEventListener("mouseenter", open);
      button.addEventListener("mouseleave", scheduleClose);
      pop.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
      pop.addEventListener("mouseleave", scheduleClose);
    }

    pop.addEventListener("toggle", () => {
      const expanded = pop.matches(":popover-open");
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    window.addEventListener("resize", () => {
      if (pop.matches(":popover-open")) place();
    });
  });
}
