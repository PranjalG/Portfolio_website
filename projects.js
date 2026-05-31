const revealElements = document.querySelectorAll('.reveal-on-scroll');
const observerOptions = {
  threshold: 0.18,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const dpr = window.devicePixelRatio || 1;
  const nodes = [];
  const pointer = { x: 0, y: 0 };
  const maxDistance = 150;

  function resizeCanvas() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes.length = 0;
    const count = Math.max(18, Math.min(28, Math.round(width / 60)));
    for (let i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.6 + 0.8,
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(width * 0.25, height * 0.2, 0, width * 0.25, height * 0.2, width * 0.7);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20 || node.x > width + 20) {
        node.vx *= -1;
      }
      if (node.y < -20 || node.y > height + 20) {
        node.vy *= -1;
      }
    });

    for (let i = 0; i < nodes.length; i += 1) {
      const nodeA = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 - distance / 1200})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      node.vx += dx * 0.00015;
      node.vy += dy * 0.00015;
      node.vx *= 0.99;
      node.vy *= 0.99;

      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawFrame);
  }

  function updatePointer(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  }

  canvas.addEventListener('mousemove', updatePointer);
  canvas.addEventListener('mouseleave', () => {
    pointer.x = width * 0.5;
    pointer.y = height * 0.5;
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(drawFrame);
}

document.addEventListener('DOMContentLoaded', initHeroCanvas);

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim() || 'Guest';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:gaurpranjal236@gmail.com?subject=${subject}&body=${body}`;
  });
}
