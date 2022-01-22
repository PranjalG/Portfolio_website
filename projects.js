/* plain/vanilla JavaScript */

const div = document.querySelector(".image4");

const icon = document.querySelector(".insta");

const button1 = document.querySelector(".p1");

div.addEventListener("mouseenter", () => {
  icon.style.opacity = 1;
  div.style.opacity = 0;
  button1.style.opacity = 1;
});

div.addEventListener("mouseleave", () => {
  icon.style.opacity = 0;
  div.style.opacity = 1;
  button1.style.opacity = 0;
});
