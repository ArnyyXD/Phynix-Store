"use client";
import styles from "./ValorantBG.module.css";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  key: i,
  left: (i * 37 + (i % 5) * 13) % 100,
  top: (i * 29 + (i % 4) * 17) % 100,
  delay: ((i * 1.3) % 8).toFixed(2),
  duration: (6 + (i % 6) * 1.4).toFixed(2),
  size: 1 + (i % 3),
  drift: ((i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12)).toFixed(0),
  opacity: (0.3 + (i % 4) * 0.15).toFixed(2),
}));

const LINES = Array.from({ length: 6 }, (_, i) => ({
  key: i,
  delay: (i * 1.8).toFixed(2),
  top: 10 + i * 14,
}));

export default function ValorantBG() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {/* Scanline overlay */}
      <div className={styles.scanlines} />

      {/* Geometric corner accents */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* Horizontal energy lines */}
      {LINES.map((l) => (
        <div
          key={l.key}
          className={styles.energyLine}
          style={{
            top: `${l.top}%`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.key}
          className={styles.particle}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}

      {/* Central radial glow */}
      <div className={styles.radialGlow} />

      {/* Side vignette glows */}
      <div className={`${styles.sideGlow} ${styles.sideGlowLeft}`} />
      <div className={`${styles.sideGlow} ${styles.sideGlowRight}`} />
    </div>
  );
}
