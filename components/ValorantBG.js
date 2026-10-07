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

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Particle Sparks ──────────────────────────────────────────────────
    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.4 - Math.random() * 0.8,
      alpha: 0.2 + Math.random() * 0.7,
      life: Math.random(),
      maxLife: 0.003 + Math.random() * 0.005,
    }));

    function resetParticle(p) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 15;
      p.vx = (Math.random() - 0.5) * 0.5;
      p.vy = -0.4 - Math.random() * 0.8;
      p.r = 0.8 + Math.random() * 2.2;
      p.life = 0;
      p.maxLife = 0.003 + Math.random() * 0.005;
    }

    // ── Sweeping Energy Waves (Valorant Plasma Streams) ───────────────────
    const waves = [
      { amplitude: 40, frequency: 0.002, speed: 0.02, color: "rgba(230, 57, 96, 0.18)", yRatio: 0.3 },
      { amplitude: 60, frequency: 0.0015, speed: -0.015, color: "rgba(255, 46, 62, 0.14)", yRatio: 0.5 },
      { amplitude: 35, frequency: 0.0025, speed: 0.025, color: "rgba(255, 138, 61, 0.12)", yRatio: 0.7 },
    ];

    // ── Tactical Geometry & Beams ─────────────────────────────────────────
    const beams = [
      { y: 0.15, speed: 0.00015, phase: 0, width: 0.35 },
      { y: 0.38, speed: 0.00011, phase: Math.PI * 0.5, width: 0.25 },
      { y: 0.62, speed: 0.00018, phase: Math.PI, width: 0.4 },
      { y: 0.85, speed: 0.00012, phase: Math.PI * 1.5, width: 0.28 },
    ];

    // ── Drawing Tactical Crosshair HUD Accent ────────────────────────────
    function drawHUDAccents() {
      const W = canvas.width, H = canvas.height;
      ctx.save();
      ctx.strokeStyle = "rgba(230, 57, 96, 0.25)";
      ctx.lineWidth = 1;

      // Top Left Coordinate Readout
      ctx.font = "10px 'Orbitron', sans-serif";
      ctx.fillStyle = "rgba(230, 57, 96, 0.4)";
      ctx.fillText(`SYS.LOC // 88.4° N [VALORANT_STORE_CORE]`, 35, 45);

      // Corner Brackets
      const bSize = 40;
      const margin = 25;
      const pulse = 0.4 + 0.4 * Math.sin(t * 0.02);

      ctx.strokeStyle = `rgba(230, 57, 96, ${pulse})`;

      // Top Left Corner
      ctx.beginPath();
      ctx.moveTo(margin, margin + bSize);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + bSize, margin);
      ctx.stroke();

      // Top Right Corner
      ctx.beginPath();
      ctx.moveTo(W - margin - bSize, margin);
      ctx.lineTo(W - margin, margin);
      ctx.lineTo(W - margin, margin + bSize);
      ctx.stroke();

      // Bottom Left Corner
      ctx.beginPath();
      ctx.moveTo(margin, H - margin - bSize);
      ctx.lineTo(margin, H - margin);
      ctx.lineTo(margin + bSize, H - margin);
      ctx.stroke();

      // Bottom Right Corner
      ctx.beginPath();
      ctx.moveTo(W - margin - bSize, H - margin);
      ctx.lineTo(W - margin, H - margin);
      ctx.lineTo(W - margin, H - margin - bSize);
      ctx.stroke();

      ctx.restore();
    }

    // ── Render Wave Stream ────────────────────────────────────────────────
    function drawWave(wave) {
      const W = canvas.width, H = canvas.height;
      const baseY = wave.yRatio * H;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 10) {
        const y = baseY + Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
      ctx.restore();
    }

    // ── Render Energy Beams ───────────────────────────────────────────────
    function drawBeam(beam) {
      const W = canvas.width, H = canvas.height;
      const progress = (Math.sin(t * beam.speed + beam.phase) + 1) / 2;
      const x = progress * W * 1.5 - W * 0.25;
      const bw = beam.width * W;
      const y = beam.y * H;

      const grad = ctx.createLinearGradient(x - bw, y, x + bw, y);
      grad.addColorStop(0, "rgba(230, 57, 96, 0)");
      grad.addColorStop(0.3, "rgba(230, 57, 96, 0.08)");
      grad.addColorStop(0.5, "rgba(255, 107, 133, 0.35)");
      grad.addColorStop(0.7, "rgba(230, 57, 96, 0.08)");
      grad.addColorStop(1, "rgba(230, 57, 96, 0)");

      ctx.save();
      ctx.fillStyle = grad;
      ctx.fillRect(x - bw, y - 2, bw * 2, 4);
      ctx.restore();
    }

    // ── Main Animation Loop ───────────────────────────────────────────────
    function render() {
      const W = canvas.width, H = canvas.height;
      t++;

      ctx.clearRect(0, 0, W, H);

      // Base Dark Canvas Background matching Phynix Store theme
      ctx.fillStyle = "#0A0808";
      ctx.fillRect(0, 0, W, H);

      // Central Ambient Radial Glows
      const radGlow1 = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.6);
      radGlow1.addColorStop(0, "rgba(230, 57, 96, 0.16)");
      radGlow1.addColorStop(0.5, "rgba(74, 10, 20, 0.12)");
      radGlow1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radGlow1;
      ctx.fillRect(0, 0, W, H);

      const radGlow2 = ctx.createRadialGradient(W * 0.85, H * 0.2, 0, W * 0.85, H * 0.2, W * 0.35);
      radGlow2.addColorStop(0, "rgba(255, 46, 62, 0.12)");
      radGlow2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radGlow2;
      ctx.fillRect(0, 0, W, H);

      // Draw Animated Waves
      for (const w of waves) drawWave(w);

      // Draw Energy Beams
      for (const b of beams) drawBeam(b);

      // Draw Ember Sparks
      for (const p of particles) {
        p.life += p.maxLife;
        if (p.life > 1) resetParticle(p);
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) resetParticle(p);

        const fade = p.life < 0.15 ? p.life / 0.15 : p.life > 0.8 ? 1 - (p.life - 0.8) / 0.2 : 1;

        ctx.save();
        ctx.globalAlpha = p.alpha * fade;
        const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        pGlow.addColorStop(0, "#FF6B85");
        pGlow.addColorStop(0.5, "rgba(230, 57, 96, 0.6)");
        pGlow.addColorStop(1, "rgba(230, 57, 96, 0)");
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Tactical HUD Overlay
      drawHUDAccents();

      // Scanline Effect Overlay
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1);
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
