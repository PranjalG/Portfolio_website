export function initCopy() {
  const button = document.querySelector("[data-copy]");
  const status = document.querySelector("[data-copy-status]");
  if (!button || !status) return;

  const value = button.getAttribute("data-copy") || "";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = "Email copied.";
    } catch {
      status.textContent = "Copy is unavailable in this browser. Select the email address instead.";
    }
  });
}
