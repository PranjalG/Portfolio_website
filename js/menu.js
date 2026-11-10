export function initMenu() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-menu]");
  if (!header || !toggle || !nav) return;

  const setOpen = (open) => {
    header.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 960px)");
  desktop.addEventListener("change", () => {
    if (desktop.matches) setOpen(false);
  });

  const links = [...nav.querySelectorAll("a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        if (link.getAttribute("href") === `#${visible.target.id}`) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
  );

  sections.forEach((section) => spy.observe(section));
}
