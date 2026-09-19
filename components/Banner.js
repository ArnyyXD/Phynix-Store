import Image from "next/image";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.glowRing} aria-hidden="true" />
      <Image
        src="/logo.png"
        alt="Phynix Store"
        width={96}
        height={96}
        className={styles.icon}
        priority
      />
      <h1 className={styles.title}>
        PHYNIX<span className={styles.titleAccent}>STORE</span>
      </h1>
      <p className={styles.tagline}>Rise into your next rank.</p>
    </div>
  );
}
