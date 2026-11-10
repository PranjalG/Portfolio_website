const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function curvePath(bend) {
  const peak = Math.round(90 + bend);
  return `M0 340 C140 340 180 220 300 200 C420 180 480 300 600 280 C760 250 820 ${peak} 980 120 C1100 150 1140 200 1200 160`;
}

function splitLines() {
  document.querySelectorAll("[data-split]").forEach((line) => {
    const text = line.textContent.trim();
    line.replaceChildren();
    const words = text.split(" ");
    words.forEach((word, index) => {
      const wrap = document.createElement("span");
      wrap.className = "split-word";
      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.className = "split-char";
        span.textContent = char;
        wrap.appendChild(span);
      });
      line.appendChild(wrap);
    });
  });
}

export function initHero() {
  const hero = document.querySelector(".hero");
  const curve = document.querySelector("[data-load-curve]");
  const glowPath = document.querySelector("[data-load-glow]");
  if (!hero || !curve || !glowPath) return;

  const draw = (bend) => {
    const path = curvePath(bend);
    curve.setAttribute("d", path);
    glowPath.setAttribute("d", path);
  };
  draw(0);

  if (reduceMotion || !window.gsap) return;

  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  if (window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", () => window.ScrollTrigger && window.ScrollTrigger.update());
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("has-lenis");
  }

  splitLines();
  document.querySelectorAll("[data-split]").forEach((line, index) => {
    gsap.from(line.querySelectorAll(".split-char"), {
      yPercent: 120,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.018,
      delay: 0.05 + index * 0.16,
    });
  });

  gsap.from(".hero-name, .eyebrow, .hero-role, .hero-value, .hero-actions, .device-wrap", {
    y: 18,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.05,
    delay: 0.12,
  });

  const length = curve.getTotalLength();
  gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(curve, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top 85%",
      end: "bottom 55%",
      scrub: 0.6,
    },
  });

  const glow = document.querySelector("[data-hero-glow]");
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!fine) return;

  let target = 0;
  let current = 0;
  let frame = 0;

  const settle = () => {
    current += (target - current) * 0.08;
    draw(current);
    if (Math.abs(target - current) > 0.35) {
      frame = requestAnimationFrame(settle);
    } else {
      frame = 0;
      draw(target);
    }
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(settle);
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const ny = (event.clientY - rect.top) / rect.height;
    target = (ny - 0.4) * 64;
    if (glow) {
      glow.style.setProperty("--gx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      glow.style.setProperty("--gy", `${ny * 100}%`);
    }
    wake();
  });

  hero.addEventListener("pointerleave", () => {
    target = 0;
    wake();
  });
}
