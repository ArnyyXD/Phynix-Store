import Link from "next/link";
import Banner from "../components/Banner";
import styles from "./home.module.css";

const GAME_CARDS = [
  {
    id: "valorant",
    label: "Valorant",
    emoji: "◆",
    accent: "#E63960",
    glow: "rgba(230,57,96,0.35)",
    bg: "rgba(230,57,96,0.08)",
    tag: "Ranked · Skins · Agents",
    desc: "Immortal to Radiant accounts with Vandal/Phantom skin vaults.",
  },
  {
    id: "clash_of_clans",
    label: "Clash of Clans",
    emoji: "▲",
    accent: "#F2A93B",
    glow: "rgba(242,169,59,0.35)",
    bg: "rgba(242,169,59,0.08)",
    tag: "Town Hall 9–17 · Heroes",
    desc: "Maxed heroes, champion leagues, and rare war bases.",
  },
  {
    id: "bgmi",
    label: "BGMI",
    emoji: "●",
    accent: "#FF8A3D",
    glow: "rgba(255,138,61,0.35)",
    bg: "rgba(255,138,61,0.08)",
    tag: "Ace · Conqueror · Skins",
    desc: "High-tier ranked accounts with M416 glaciers and mythic outfits.",
  },
  {
    id: "free_fire",
    label: "Free Fire",
    emoji: "🔥",
    accent: "#FF4500",
    glow: "rgba(255,69,0,0.35)",
    bg: "rgba(255,69,0,0.08)",
    tag: "Heroic · Grandmaster · Bundles",
    desc: "Premium bundles, evo guns, and Grandmaster rank accounts.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Banner />
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>TRUSTED GAME ACCOUNT MARKETPLACE</div>
        <h1 className={styles.heading}>
          Buy, sell &amp; trade game accounts — <span className={styles.headingAccent}>safely</span>.
        </h1>
        <p className={styles.subheading}>
          Valorant · Clash of Clans · BGMI · Free Fire — verified sellers, a
          middleman that holds payment until everything checks out.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/buy" className="btn-primary">
            Browse Accounts
          </Link>
          <Link href="/sell" className="btn-ghost">
            List Your Account
          </Link>
        </div>
      </section>

      {/* Game Cards */}
      <section className={styles.gamesSection}>
        <h2 className={styles.sectionTitle}>Browse by Game</h2>
        <div className={styles.gamesGrid}>
          {GAME_CARDS.map((g) => (
            <Link
              key={g.id}
              href={`/buy?game=${g.id}`}
              className={styles.gameCard}
              style={{
                "--game-accent": g.accent,
                "--game-glow": g.glow,
                "--game-bg": g.bg,
              }}
            >
              <div className={styles.gameCardTop}>
                <span className={styles.gameEmoji}>{g.emoji}</span>
                <span className={styles.gameTag}>{g.tag}</span>
              </div>
              <div className={styles.gameCardBody}>
                <h3 className={styles.gameLabel}>{g.label}</h3>
                <p className={styles.gameDesc}>{g.desc}</p>
              </div>
              <div className={styles.gameCardFooter}>
                <span className={styles.browseLink}>Browse accounts →</span>
              </div>
              <div className={styles.gameCardGlow} />
            </Link>
          ))}
        </div>
      </section>

      {/* Price Tiers */}
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
