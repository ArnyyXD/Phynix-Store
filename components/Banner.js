import Image from "next/image";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.glowRing} aria-hidden="true" />
      <div className={styles.iconWrap}>
        <Image
          src="/logo.png"
          alt="Phynix Store"
          width={104}
          height={104}
          className={styles.icon}
          priority
        />
      </div>
      <h1 className={styles.title}>
        PHYNIX <span className={styles.titleAccent}>STORE</span>
      </h1>
      <p className={styles.tagline}>Rise into your next rank — secure, verified, escrow-backed.</p>
    </div>
  );
}
