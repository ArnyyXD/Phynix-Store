"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

// Three blurred color blobs, each easing toward the cursor at a different
// speed, with dormant idle-detection (0% CPU when mouse is idle) and automatic
// touch-device disabling (silky-smooth 60/120fps scrolling on mobile).
export default function CursorGlow() {
  const blobRefs = useRef([]);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    // Disable on touch-only devices to save battery and maximize 120Hz scroll performance
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const initial = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    target.current = initial;
    current.current = current.current.map(() => ({ ...initial }));

    let rafId = null;
    let isRunning = false;
    const speeds = [0.1, 0.06, 0.035];

    function step() {
      let maxDelta = 0;

      current.current = current.current.map((pos, i) => {
        const speed = speeds[i] ?? 0.08;
        const dx = (target.current.x - pos.x) * speed;
        const dy = (target.current.y - pos.y) * speed;
        const absD = Math.abs(dx) + Math.abs(dy);
        if (absD > maxDelta) maxDelta = absD;

        return {
          x: pos.x + dx,
          y: pos.y + dy,
        };
      });

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = current.current[i];
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      });

      // If blobs have caught up within 0.1px, sleep until next mousemove to keep 0% idle CPU
      if (maxDelta > 0.1) {
        rafId = requestAnimationFrame(step);
      } else {
        isRunning = false;
      }
    }

    function startAnimation() {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(step);
      }
    }

    function handlePointerMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
      startAnimation();
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    startAnimation();

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
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
