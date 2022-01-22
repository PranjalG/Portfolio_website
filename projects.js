/* plain/vanilla JavaScript */

const boa = document.querySelector(".image1");
const boaBlock = document.querySelector(".block1");
boaBlock.addEventListener("mouseenter", () => {
  boaBlock.style.opacity = 1;
  boa.style.opacity = 0;
});
boaBlock.addEventListener("mouseleave", () => {
  boaBlock.style.opacity = 0;
  boa.style.opacity = 1;
});

const ttt = document.querySelector(".image2");
const tttBlock = document.querySelector(".block2");
tttBlock.addEventListener("mouseenter", () => {
  tttBlock.style.opacity = 1;
  ttt.style.opacity = 0;
});
tttBlock.addEventListener("mouseleave", () => {
  tttBlock.style.opacity = 0;
  ttt.style.opacity = 1;
});

const dk = document.querySelector(".image3");
const dkBlock = document.querySelector(".block3");
dkBlock.addEventListener("mouseenter", () => {
  dkBlock.style.opacity = 1;
  dk.style.opacity = 0;
});
dkBlock.addEventListener("mouseleave", () => {
  dkBlock.style.opacity = 0;
  dk.style.opacity = 1;
});

const td = document.querySelector(".image4");
const tdBlock = document.querySelector(".block4");
tdBlock.addEventListener("mouseenter", () => {
  tdBlock.style.opacity = 1;
  td.style.opacity = 0;
});
tdBlock.addEventListener("mouseleave", () => {
  tdBlock.style.opacity = 0;
  td.style.opacity = 1;
});

const dc = document.querySelector(".image5");
const dcBlock = document.querySelector(".block5");
dcBlock.addEventListener("mouseenter", () => {
  dcBlock.style.opacity = 1;
  dc.style.opacity = 0;
});
dcBlock.addEventListener("mouseleave", () => {
  dcBlock.style.opacity = 0;
  dc.style.opacity = 1;
});

const fad = document.querySelector(".image6");
const fadBlock = document.querySelector(".block6");
fadBlock.addEventListener("mouseenter", () => {
  fadBlock.style.opacity = 1;
  fad.style.opacity = 0;
});
fadBlock.addEventListener("mouseleave", () => {
  fadBlock.style.opacity = 0;
  fad.style.opacity = 1;
});
