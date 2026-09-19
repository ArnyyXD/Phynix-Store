import styles from "./WingWisps.module.css";

// Abstract smoky "wing" shapes fanned out at the left and right edges,
// evoking the flame-wing silhouettes in the brand reference image. Pure
// CSS blur + a slow opacity/scale breathe -- cheap to render, no JS.
export default function WingWisps() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={`${styles.wing} ${styles.left}`}>
        <span className={styles.feather} style={{ "--i": 0 }} />
        <span className={styles.feather} style={{ "--i": 1 }} />
        <span className={styles.feather} style={{ "--i": 2 }} />
        <span className={styles.feather} style={{ "--i": 3 }} />
      </div>
      <div className={`${styles.wing} ${styles.right}`}>
        <span className={styles.feather} style={{ "--i": 0 }} />
        <span className={styles.feather} style={{ "--i": 1 }} />
        <span className={styles.feather} style={{ "--i": 2 }} />
        <span className={styles.feather} style={{ "--i": 3 }} />
      </div>
    </div>
  );
}
