import styles from "./EmberParticles.module.css";

const PARTICLE_COUNT = 22;

// Deterministic pseudo-randomness from the index (not Math.random()) so the
// server-rendered HTML and the client's first render match exactly -- using
// real randomness here would cause a hydration mismatch.
function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const left = (i * 43 + (i % 3) * 11) % 100;
    const delay = ((i * 1.7) % 9).toFixed(2);
    const duration = (7 + (i % 5) * 1.6).toFixed(2);
    const size = 2 + (i % 3);
    const drift = ((i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6)).toFixed(0);
    return { key: i, left, delay, duration, size, drift };
  });
}

const PARTICLES = buildParticles();

export default function EmberParticles() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.key}
          className={styles.ember}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
