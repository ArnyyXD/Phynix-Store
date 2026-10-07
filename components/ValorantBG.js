"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ValorantBG.module.css";

export default function ValorantBG() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  // Check if custom video file exists in public/
  const videoSources = [
    "/valorant-bg.mp4",
    "/valorant.mp4",
    "/bg.mp4"
  ];

  // Mobile browsers routinely pause a background <video> when the screen
  // locks, the tab backgrounds, or an autoplay heuristic silently blocks
  // it on first load -- and never resume it on their own. This is the
  // actual cause of "stuck on a frozen frame" on phones. We never rely on
  // CSS to hide or fight the browser's own native play button; instead we
  // just make sure play() actually gets (re)called whenever it matters.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Belt-and-suspenders: some iOS versions don't reliably honor the
    // `muted` HTML attribute in time for the autoplay check unless the JS
    // property is also set explicitly before play() is called.
    video.muted = true;
    video.playsInline = true;

    function tryPlay() {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay was blocked (e.g. iOS Low Power Mode). It'll be
          // retried on the next visibility change or user gesture below.
        });
      }
    }

    tryPlay();

    function handleVisibility() {
      if (document.visibilityState === "visible") tryPlay();
    }

    // Covers the "locked phone / switched apps, came back to a frozen
    // frame" case directly.
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", tryPlay);

    // Covers any lingering autoplay block: the first tap/click anywhere on
    // the page counts as a user gesture under mobile autoplay policy, so
    // this needs no visible button and doesn't require the video itself
    // to be tappable (it intentionally stays pointer-events: none so it
    // never blocks taps meant for the actual page).
    function handleFirstGesture() {
      tryPlay();
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    }
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("click", handleFirstGesture, { once: true });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    };
  }, []);

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

    const beams = [
      { y: 0.15, speed: 0.00015, phase: 0, width: 0.35 },
      { y: 0.38, speed: 0.00011, phase: Math.PI * 0.5, width: 0.25 },
      { y: 0.62, speed: 0.00018, phase: Math.PI, width: 0.4 },
      { y: 0.85, speed: 0.00012, phase: Math.PI * 1.5, width: 0.28 },
    ];

    function drawHUDAccents() {
      const W = canvas.width, H = canvas.height;
      ctx.save();
      ctx.strokeStyle = "rgba(230, 57, 96, 0.25)";
      ctx.lineWidth = 1;

      ctx.font = "10px 'Staatliches', sans-serif";
      ctx.fillStyle = "rgba(230, 57, 96, 0.4)";
      ctx.fillText(`SYS.LOC // 88.4° N [VALORANT_STORE_CORE]`, 35, 45);

      const bSize = 40;
      const margin = 25;
      const pulse = 0.4 + 0.4 * Math.sin(t * 0.02);

      ctx.strokeStyle = `rgba(230, 57, 96, ${pulse})`;

      ctx.beginPath();
      ctx.moveTo(margin, margin + bSize);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + bSize, margin);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(W - margin - bSize, margin);
      ctx.lineTo(W - margin, margin);
      ctx.lineTo(W - margin, margin + bSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(margin, H - margin - bSize);
      ctx.lineTo(margin, H - margin);
      ctx.lineTo(margin + bSize, H - margin);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(W - margin - bSize, H - margin);
      ctx.lineTo(W - margin, H - margin);
      ctx.lineTo(W - margin, H - margin - bSize);
      ctx.stroke();

      ctx.restore();
    }

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

    function render() {
      const W = canvas.width, H = canvas.height;
      t++;

      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#0A0808";
      ctx.fillRect(0, 0, W, H);

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

      for (const b of beams) drawBeam(b);

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

      drawHUDAccents();

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

  return (
    <div className={styles.wrap} aria-hidden="true">
      {hasVideo && !videoError && (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex="-1"
          onError={() => setVideoError(true)}
        >
          {videoSources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.overlay} />
    </div>
  );
}
