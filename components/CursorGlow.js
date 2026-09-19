"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

// Three blurred color blobs, each easing toward the cursor at a different
// speed, so they trail behind one another and overlap/blend as they move --
// this is what gives the "mixing like water" feel. mix-blend-mode: screen
// makes overlapping colors lighten into each other instead of just stacking.
export default function CursorGlow() {
  const blobRefs = useRef([]);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const hasMoved = useRef(false);

  useEffect(() => {
    const initial = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    target.current = initial;
    current.current = current.current.map(() => ({ ...initial }));

    function handlePointerMove(e) {
      hasMoved.current = true;
      target.current = { x: e.clientX, y: e.clientY };
    }

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", (e) => {
      if (e.touches[0]) handlePointerMove(e.touches[0]);
    });

    const speeds = [0.1, 0.06, 0.035];
    let raf;

    function animate() {
      current.current = current.current.map((pos, i) => {
        const speed = speeds[i] ?? 0.08;
        return {
          x: pos.x + (target.current.x - pos.x) * speed,
          y: pos.y + (target.current.y - pos.y) * speed,
        };
      });

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = current.current[i];
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      });

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={(el) => (blobRefs.current[0] = el)} className={`${styles.blob} ${styles.purple}`} />
      <div ref={(el) => (blobRefs.current[1] = el)} className={`${styles.blob} ${styles.crimson}`} />
      <div ref={(el) => (blobRefs.current[2] = el)} className={`${styles.blob} ${styles.violet}`} />
    </div>
  );
}
