"use client";
import { useEffect, useRef } from "react";
import styles from "./ValorantBG.module.css";

export default function ValorantBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    // ── Resize handler ──────────────────────────────────────────────────
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Particles ────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.5,
      alpha: 0.2 + Math.random() * 0.6,
      life: Math.random(), // 0–1
      maxLife: 0.004 + Math.random() * 0.003,
    }));

    function resetParticle(p) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 10;
      p.vx = (Math.random() - 0.5) * 0.4;
      p.vy = -0.3 - Math.random() * 0.6;
      p.r = 0.5 + Math.random() * 1.8;
      p.life = 0;
      p.maxLife = 0.003 + Math.random() * 0.004;
    }

    // ── Scan beams ────────────────────────────────────────────────────────
    const beams = [
      { y: 0.18, speed: 0.00012, phase: 0, width: 0.28 },
      { y: 0.42, speed: 0.00009, phase: Math.PI, width: 0.22 },
      { y: 0.67, speed: 0.00014, phase: 1.5, width: 0.32 },
      { y: 0.83, speed: 0.00008, phase: 0.8, width: 0.20 },
    ];

    // ── Valorant-style geometry triangles ─────────────────────────────────
    const triangles = [
      { cx: 0.15, cy: 0.25, size: 38, rot: 0,   speed: 0.0004, alpha: 0.18 },
      { cx: 0.85, cy: 0.18, size: 28, rot: 1.2, speed: 0.0006, alpha: 0.14 },
      { cx: 0.08, cy: 0.72, size: 22, rot: 0.5, speed: 0.0003, alpha: 0.12 },
      { cx: 0.92, cy: 0.65, size: 32, rot: 2.1, speed: 0.0005, alpha: 0.16 },
      { cx: 0.5,  cy: 0.88, size: 18, rot: 0.9, speed: 0.0007, alpha: 0.10 },
    ];

    // ── Grid lines ────────────────────────────────────────────────────────
    function drawGrid() {
      const W = canvas.width, H = canvas.height;
      const COLS = 16, ROWS = 10;
      ctx.strokeStyle = "rgba(230,57,96,0.06)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i <= COLS; i++) {
        const x = (i / COLS) * W;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let j = 0; j <= ROWS; j++) {
        const y = (j / ROWS) * H;
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();
    }

    // ── Diamond accent (Valorant logo shape) ─────────────────────────────
    function drawDiamond(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#E63960";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.6, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.6, y);
      ctx.closePath();
      ctx.stroke();
      // inner fill glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0, "rgba(230,57,96,0.15)");
      grad.addColorStop(1, "rgba(230,57,96,0)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    // ── Scan beam draw ────────────────────────────────────────────────────
    function drawBeam(beam) {
      const W = canvas.width, H = canvas.height;
      const progress = ((Math.sin(t * beam.speed + beam.phase) + 1) / 2);
      const x = progress * W * 1.4 - W * 0.2;
      const bw = beam.width * W;
      const y = beam.y * H;

      const grad = ctx.createLinearGradient(x - bw, y, x + bw, y);
      grad.addColorStop(0, "rgba(230,57,96,0)");
      grad.addColorStop(0.3, "rgba(230,57,96,0.04)");
      grad.addColorStop(0.5, "rgba(255,107,133,0.18)");
      grad.addColorStop(0.7, "rgba(230,57,96,0.04)");
      grad.addColorStop(1, "rgba(230,57,96,0)");

      ctx.save();
      ctx.fillStyle = grad;
      ctx.fillRect(x - bw, y - 1, bw * 2, 2);

      // thin bright line in center
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "rgba(255,107,133,0.8)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - bw * 0.4, y);
      ctx.lineTo(x + bw * 0.4, y);
      ctx.stroke();
      ctx.restore();
    }

    // ── Corner HUD brackets ───────────────────────────────────────────────
    function drawCorners() {
      const W = canvas.width, H = canvas.height;
      const size = 55;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.0008);
      const alpha = 0.3 + pulse * 0.35;
      const glow = `rgba(230,57,96,${alpha})`;

      const corners = [
        { x: 20,     y: 20,     dx: 1,  dy: 1  },
        { x: W - 20, y: 20,     dx: -1, dy: 1  },
        { x: 20,     y: H - 20, dx: 1,  dy: -1 },
        { x: W - 20, y: H - 20, dx: -1, dy: -1 },
      ];

      ctx.save();
      ctx.strokeStyle = glow;
      ctx.lineWidth = 1.5;
      if (pulse > 0.7) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#E63960";
      }
      for (const c of corners) {
        ctx.beginPath();
        ctx.moveTo(c.x + c.dx * size, c.y);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(c.x, c.y + c.dy * size);
        ctx.stroke();
      }
      ctx.restore();
    }

    // ── Central radial glow ────────────────────────────────────────────────
    function drawRadialGlow() {
      const W = canvas.width, H = canvas.height;
      const breathe = 0.85 + 0.15 * Math.sin(t * 0.0005);
      const r = Math.min(W, H) * 0.55 * breathe;
      const grad = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, r);
      grad.addColorStop(0, "rgba(230,57,96,0.10)");
      grad.addColorStop(0.4, "rgba(74,10,20,0.09)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Main draw loop ────────────────────────────────────────────────────
    function draw() {
      const W = canvas.width, H = canvas.height;
      t++;

      // clear with dark base
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0A0808";
      ctx.fillRect(0, 0, W, H);

      // layered radial gradients (body background vibe)
      const bg1 = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.65);
      bg1.addColorStop(0, "rgba(230,57,96,0.13)");
      bg1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg1;
      ctx.fillRect(0, 0, W, H);

      const bg2 = ctx.createRadialGradient(W * 0.08, H * 0.15, 0, W * 0.08, H * 0.15, W * 0.4);
      bg2.addColorStop(0, "rgba(74,10,20,0.3)");
      bg2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg2;
      ctx.fillRect(0, 0, W, H);

      const bg3 = ctx.createRadialGradient(W * 0.92, H * 0.85, 0, W * 0.92, H * 0.85, W * 0.4);
      bg3.addColorStop(0, "rgba(74,10,20,0.25)");
      bg3.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg3;
      ctx.fillRect(0, 0, W, H);

      drawRadialGlow();
      drawGrid();

      // scan beams
      for (const b of beams) drawBeam(b);

      // rotating geometry triangles → diamonds
      for (const tri of triangles) {
        tri.rot += tri.speed;
        const x = tri.cx * W;
        const y = tri.cy * H;
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.001 + tri.rot * 5);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tri.rot);
        ctx.translate(-x, -y);
        drawDiamond(x, y, tri.size * pulse, tri.alpha * pulse);
        ctx.restore();
      }

      // particles
      for (const p of particles) {
        p.life += p.maxLife;
        if (p.life > 1) resetParticle(p);
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) resetParticle(p);

        const fade = p.life < 0.15
          ? p.life / 0.15
          : p.life > 0.75
          ? 1 - (p.life - 0.75) / 0.25
          : 1;

        ctx.save();
        ctx.globalAlpha = p.alpha * fade;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grad.addColorStop(0, "rgba(255,107,133,1)");
        grad.addColorStop(0.5, "rgba(230,57,96,0.5)");
        grad.addColorStop(1, "rgba(230,57,96,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawCorners();

      // scanlines overlay
      ctx.save();
      ctx.globalAlpha = 0.035;
      for (let sy = 0; sy < H; sy += 4) {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, sy + 3, W, 1);
      }
      ctx.restore();

      // vignette edges
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
