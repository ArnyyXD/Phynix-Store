import Link from "next/link";
import Banner from "../components/Banner";
import styles from "./home.module.css";

const GAME_CARDS = [
  {
    id: "valorant",
    label: "Valorant",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    accent: "#E63960",
    glow: "rgba(230,57,96,0.5)",
    bg: "rgba(230,57,96,0.12)",
    tag: "Ranked · Skins · Agents",
    desc: "Immortal to Radiant accounts with Vandal/Phantom skin vaults.",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 22H7.5L12 13L16.5 22H22L12 2Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "clash_of_clans",
    label: "Clash of Clans",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    accent: "#F2A93B",
    glow: "rgba(242,169,59,0.5)",
    bg: "rgba(242,169,59,0.12)",
    tag: "Town Hall 9–17 · Heroes",
    desc: "Maxed heroes, champion leagues, and rare war bases.",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 6L16 11H8L12 6Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "bgmi",
    label: "BGMI",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    accent: "#FF8A3D",
    glow: "rgba(255,138,61,0.5)",
    bg: "rgba(255,138,61,0.12)",
    tag: "Ace · Conqueror · Skins",
    desc: "High-tier ranked accounts with M416 glaciers and mythic outfits.",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "free_fire",
    label: "Free Fire",
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    accent: "#FF4500",
    glow: "rgba(255,69,0,0.5)",
    bg: "rgba(255,69,0,0.12)",
    tag: "Heroic · Grandmaster · Bundles",
    desc: "Premium bundles, evo guns, and Grandmaster rank accounts.",
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 7 7 7 13C7 16.31 9.69 19 13 19C15.5 19 17.6 17.4 18.5 15.2C17.5 15.7 16.3 15.8 15.3 15.3C13.5 14.4 12.8 12.3 13.6 10.5C12.1 11.8 11.5 13.8 12 15.7C10.8 15.3 10 14.2 10 13C10 9 12 2 12 2Z" fill="currentColor"/>
      </svg>
    ),
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
              <div className={styles.gameCardImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.banner} alt={g.label} className={styles.gameCardImage} />
                <div className={styles.gameCardOverlay} />
              </div>

              <div className={styles.gameCardTop}>
                <span className={styles.gameIconWrap}>{g.iconSvg}</span>
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
