export function initCopy() {
  const button = document.querySelector("[data-copy]");
  const status = document.querySelector("[data-copy-status]");
  if (!button || !status) return;

  const value = button.getAttribute("data-copy") || "";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      const label = button.textContent;
      button.textContent = "Copied to clipboard.";
      status.textContent = "Copied to clipboard.";
      window.setTimeout(() => {
        button.textContent = label;
      }, 2500);
    } catch {
      status.textContent = "Copy is unavailable in this browser. Select the email address instead.";
    }
  });
}
