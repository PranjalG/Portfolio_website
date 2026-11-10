export async function initResume() {
  const links = [...document.querySelectorAll('a[href="public/resume.pdf"]')];
  const note = document.querySelector("#resume-note");
  if (!links.length) return;

  links.forEach((link) => link.setAttribute("aria-describedby", "resume-note"));

  let available = false;
  try {
    const response = await fetch("public/resume.pdf", { method: "HEAD" });
    available = response.ok;
  } catch {
    available = false;
  }

  if (available) {
    if (note) note.hidden = true;
    return;
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (!note) return;
      note.hidden = false;
      note.focus();
    });
  });
}
