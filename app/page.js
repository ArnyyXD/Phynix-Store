"use client";

import { useState } from "react";
import Link from "next/link";
import Banner from "../components/Banner";
import styles from "./home.module.css";

const GAME_CARDS = [
  {
    id: "valorant",
    label: "Valorant",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    logoUrl: "/icons/valorant.svg",
    accent: "#E63960",
    glow: "rgba(230,57,96,0.5)",
    bg: "rgba(230,57,96,0.12)",
    tag: "Ranked · Skins · Agents",
    desc: "Immortal to Radiant accounts with Vandal/Phantom skin vaults.",
  },
  {
    id: "clash_of_clans",
    label: "Clash of Clans",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    logoUrl: "/icons/clash_of_clans.svg",
    accent: "#F2A93B",
    glow: "rgba(242,169,59,0.5)",
    bg: "rgba(242,169,59,0.12)",
    tag: "Town Hall 9–17 · Heroes",
    desc: "Maxed heroes, champion leagues, and rare war bases.",
  },
  {
    id: "bgmi",
    label: "BGMI",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    logoUrl: "/icons/bgmi.svg",
    accent: "#FF8A3D",
    glow: "rgba(255,138,61,0.5)",
    bg: "rgba(255,138,61,0.12)",
    tag: "Ace · Conqueror · Skins",
    desc: "High-tier ranked accounts with M416 glaciers and mythic outfits.",
  },
  {
    id: "free_fire",
    label: "Free Fire",
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    logoUrl: "/icons/free_fire.svg",
    accent: "#FF4500",
    glow: "rgba(255,69,0,0.5)",
    bg: "rgba(255,69,0,0.12)",
    tag: "Heroic · Grandmaster · Bundles",
    desc: "Premium bundles, evo guns, and Grandmaster rank accounts.",
  },
];

const BUDGET_OPTIONS = [
  {
    id: "3-4k",
    priceRange: "₹3k – ₹4k",
    title: "Starter Ranks & Clean History",
    desc: "Budget smurfs, entry-level ranks, and clean account histories.",
  },
  {
    id: "5-7k",
    priceRange: "₹5k – ₹7k",
    title: "Mid Ranks & Stacked Skins",
    desc: "Competitive ranks, stacked inventories, and popular skin bundles.",
  },
  {
    id: "8-10k",
    priceRange: "₹8k – ₹10k",
    title: "High Rank & Premium Bundles",
    desc: "Top-tier high rank accounts, exclusive collections, and maxed accounts.",
  },
];

export default function HomePage() {
  const [selectedGameId, setSelectedGameId] = useState("valorant");
  const selectedGame = GAME_CARDS.find((g) => g.id === selectedGameId) || GAME_CARDS[0];

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
            Browse All Accounts
          </Link>
          <Link href="/sell" className="btn-ghost">
            List Your Account
          </Link>
        </div>
      </section>

      {/* Step 1: Select Game */}
      <section className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>STEP 1</span>
          <h2 className={styles.sectionTitle}>Select a Game</h2>
        </div>

        <div className={styles.gamesGrid}>
          {GAME_CARDS.map((g) => {
            const isSelected = selectedGameId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGameId(g.id)}
                className={`${styles.gameCard} ${isSelected ? styles.gameCardSelected : ""}`}
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
                  <span className={styles.gameIconWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.logoUrl} alt={`${g.label} Logo`} className={styles.gameCardLogoImg} />
                  </span>
                  {isSelected ? (
                    <span className={styles.selectedTag}>✓ Selected</span>
                  ) : (
                    <span className={styles.gameTag}>{g.tag}</span>
                  )}
                </div>

                <div className={styles.gameCardBody}>
                  <h3 className={styles.gameLabel}>{g.label}</h3>
                  <p className={styles.gameDesc}>{g.desc}</p>
                </div>

                <div className={styles.gameCardFooter}>
                  <span className={styles.selectBtnText}>
                    {isSelected ? "Game Selected — Choose Budget Below ↓" : "Select Game →"}
                  </span>
                </div>

                <div className={`${styles.gameCardGlow} ${isSelected ? styles.glowActive : ""}`} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Choose Budget Tier for Selected Game */}
      <section className={styles.budgetSection}>
        <div className={styles.budgetSectionHeader}>
          <div className={styles.stepTitleRow}>
            <span className={styles.stepBadgeAccent}>STEP 2</span>
            <h2 className={styles.budgetTitle}>
              Select Budget for <span style={{ color: selectedGame.accent }}>{selectedGame.label}</span>
            </h2>
          </div>
          <p className={styles.budgetSubtext}>
            Click a price range below to filter live <strong>{selectedGame.label}</strong> accounts within your budget:
          </p>
        </div>

        <div className={styles.tiersGrid}>
          {BUDGET_OPTIONS.map((tier) => (
            <Link
              key={tier.id}
              href={`/buy?game=${selectedGame.id}&budget=${tier.id}`}
              className={styles.tierCard}
              style={{ "--tier-accent": selectedGame.accent, "--tier-glow": selectedGame.glow }}
            >
              <div className={styles.tierTop}>
                <span className={styles.tierPrice}>{tier.priceRange}</span>
                <span className={styles.tierGameBadge} style={{ color: selectedGame.accent }}>
                  {selectedGame.label}
                </span>
              </div>
              <h4 className={styles.tierTitle}>{tier.title}</h4>
              <p className={styles.tierDesc}>{tier.desc}</p>
              <div className={styles.tierActionRow}>
                <span className={styles.tierActionText} style={{ color: selectedGame.accent }}>
                  Browse {tier.priceRange} {selectedGame.label} Accounts →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAllRow}>
          <Link
            href={`/buy?game=${selectedGame.id}`}
            className="btn-ghost"
            style={{ borderColor: selectedGame.accent, color: "#fff" }}
          >
            Browse All {selectedGame.label} Listings →
          </Link>
        </div>
      </section>
    </div>
  );
}
