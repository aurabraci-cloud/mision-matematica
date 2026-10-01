/**
 * MISIÓN MATEMÁTICA — EFECTOS VISUALES (Canvas FX y Partículas)
 * Confeti de victoria, chispas estelares e indicadores flotantes de XP.
 */

window.GAME_FX = (function () {
  const canvas = document.getElementById("fx-canvas");
  let ctx = null;
  let particles = [];
  let animationId = null;

  if (canvas) {
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createConfettiBurst(x, y, count = 70) {
    if (!canvas || !ctx) return;
    const colors = ["#facc15", "#38bdf8", "#10b981", "#ec4899", "#8b5cf6", "#f97316"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: x || canvas.width / 2,
        y: y || canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
        shape: Math.random() > 0.5 ? "circle" : "rect"
      });
    }

    if (!animationId) {
      animate();
    }
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravedad suave
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animate);
    } else {
      animationId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return {
    launchVictoryConfetti: function () {
      if (!canvas) return;
      // Dos ráfagas laterales y una central
      createConfettiBurst(canvas.width * 0.3, canvas.height * 0.4, 50);
      setTimeout(() => createConfettiBurst(canvas.width * 0.7, canvas.height * 0.4, 50), 200);
      setTimeout(() => createConfettiBurst(canvas.width * 0.5, canvas.height * 0.3, 80), 400);
    },

    spawnFloatingXP: function (text, targetElement) {
      const el = document.createElement("div");
      el.className = "floating-xp-indicator";
      el.textContent = text;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        el.style.left = `${rect.left + rect.width / 2}px`;
        el.style.top = `${rect.top}px`;
      } else {
        el.style.left = "50vw";
        el.style.top = "50vh";
      }

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  };
})();
