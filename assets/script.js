// ============================================================
// REPO BRAIN — ambient graph background + interactions
// ============================================================

(function ambientGraph() {
  const canvas = document.getElementById('graph-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 150;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 1,
    }));
  }
  makeNodes();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      // gentle attraction toward cursor within radius — "recall" feel
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        n.x += dx * 0.0025;
        n.y += dy * 0.0025;
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(124, 111, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(69, 232, 209, 0.5)';
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(step);
  }

  if (prefersReduced) {
    // draw one static frame instead of looping
    step();
  } else {
    requestAnimationFrame(step);
  }
})();

// ---------- scroll reveal ----------
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
})();

// ---------- OS tabs (Mac/Linux vs Windows setup) ----------
(function tabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs').dataset.group;
      document
        .querySelectorAll(`.tab-btn[data-group="${group}"]`)
        .forEach((b) => b.classList.remove('active'));
      document
        .querySelectorAll(`.tab-panel[data-group="${group}"]`)
        .forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document
        .querySelector(`.tab-panel[data-group="${group}"][data-tab="${btn.dataset.tab}"]`)
        .classList.add('active');
    });
  });
})();

// ---------- copy to clipboard ----------
(function copyButtons() {
  document.querySelectorAll('.codeblock').forEach((block) => {
    const btn = block.querySelector('.copy-btn');
    const code = block.querySelector('pre');
    if (!btn || !code) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1500);
      } catch {
        btn.textContent = 'Press Ctrl+C';
      }
    });
  });
})();
