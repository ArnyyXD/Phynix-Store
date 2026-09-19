import Link from "next/link";
import Banner from "../components/Banner";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Banner />
      <section className={styles.hero}>
        <h1 className={styles.heading}>
          Buy, sell, rent or EMI game accounts — safely.
        </h1>
        <p className={styles.subheading}>
          Valorant, Clash of Clans, BGMI &amp; Free Fire. Verified sellers, a middleman
          that holds payment until everything checks out, and seller KYC
          before any payout.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/buy" className="btn-primary">
            Buy accounts
          </Link>
          <Link href="/rent" className="btn-primary">
            Rent accounts
          </Link>
          <Link href="/sell" className="btn-ghost">
            List your account
          </Link>
        </div>
      </section>

      <section className={styles.tiers}>
        <div className={styles.tierCard}>
          <span className={styles.tierPrice}>₹3k – ₹4k</span>
          <span className={styles.tierLabel}>Starter ranks, clean history</span>
        </div>
        <div className={styles.tierCard}>
          <span className={styles.tierPrice}>₹5k – ₹7k</span>
          <span className={styles.tierLabel}>Mid ranks, larger skin vaults</span>
        </div>
        <div className={styles.tierCard}>
          <span className={styles.tierPrice}>₹8k – ₹10k</span>
          <span className={styles.tierLabel}>High rank, premium bundles</span>
        </div>
      </section>
    </div>
  );
}
