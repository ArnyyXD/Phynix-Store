"use client";

import { useState } from "react";
import Link from "next/link";
import Banner from "../components/Banner";
import styles from "./home.module.css";

const GAME_CARDS = [
  {
    id: "valorant",
    label: "Valorant",
    banner: "/banners/valorant.jpg",
    logoUrl: "/icons/valorant.png",
    accent: "#E63960",
    glow: "rgba(230,57,96,0.5)",
    bg: "rgba(230,57,96,0.12)",
    tag: "Ranked · Skins · Agents",
  },
  {
    id: "clash_of_clans",
    label: "Clash of Clans",
    banner: "/banners/coc.jpg",
    logoUrl: "/icons/coc.png",
    accent: "#F2A93B",
    glow: "rgba(242,169,59,0.5)",
    bg: "rgba(242,169,59,0.12)",
    tag: "Town Hall 9–17 · Heroes",
  },
  {
    id: "bgmi",
    label: "BGMI",
    banner: "/banners/bgmi.jpg",
    logoUrl: "/icons/bgmi.png",
    accent: "#FF8A3D",
    glow: "rgba(255,138,61,0.5)",
    bg: "rgba(255,138,61,0.12)",
    tag: "Ace · Conqueror · Skins",
  },
  {
    id: "free_fire",
    label: "Free Fire",
    banner: "/banners/freefire.jpg",
    logoUrl: "/icons/freefire.png",
    accent: "#FF4500",
    glow: "rgba(255,69,0,0.5)",
    bg: "rgba(255,69,0,0.12)",
    tag: "Heroic · Grandmaster · Bundles",
  },
];

const FEATURES = [
  {
    icon: "💎",
    title: "Platinum & Elite Skins",
    subtitle: "Stacked Inventories",
    desc: "Vandal & Phantom skins vaults, Champions bundles, Glacier M416, rare upgradable gun labs, and mythic outfits curated for collectors.",
  },
  {
    icon: "👑",
    title: "High-Profile Accounts",
    subtitle: "Peak Competitiveness",
    desc: "Immortal to Radiant, Conqueror, and Grandmaster ranked accounts with high KD, legacy badges, maxed town halls, and clean records.",
  },
  {
    icon: "🛡️",
    title: "Safe & Secured Trading",
    subtitle: "Middleman Escrow",
    desc: "100% human-verified escrow. Payment is safely held until you verify and change email, 2FA, and full account credentials.",
  },
  {
    icon: "⚡",
    title: "Instant Handover",
    subtitle: "Fast & Smooth Support",
    desc: "Direct coordination over WhatsApp middleman desk. Zero bots, prompt delivery, and end-to-end guidance from start to finish.",
  },
];

export default function HomePage() {
  const [selectedGameId, setSelectedGameId] = useState("valorant");

  return (
    <div className={styles.page}>
      <Banner />

      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowBadge}>🎮 Game Marketplace</span>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowSub}>Valorant · COC · BGMI · Free Fire</span>
        </div>
        <h1 className={styles.heading}>
          Buy, sell &amp; trade game accounts — <span className={styles.headingAccent}>safely</span>.
        </h1>
        <p className={styles.subheading}>
          Verified sellers, real accounts, and a middleman that holds your payment until everything checks out.
        </p>
      </section>

      {/* Game Selection */}
      <section className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>EXPLORE</span>
          <h2 className={styles.sectionTitle}>Select a Game</h2>
        </div>

        <div className={styles.gamesGrid}>
          {GAME_CARDS.map((g) => {
            const isSelected = selectedGameId === g.id;
            return (
              <Link
                key={g.id}
                href={`/buy?game=${g.id}`}
                prefetch={true}
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
                  <img
                    src={g.banner}
                    alt={g.label}
                    className={styles.gameCardImage}
                    loading={g.id === "valorant" ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className={styles.gameCardOverlay} />
                </div>

                <div className={styles.gameCardTop}>
                  <span className={styles.gameIconWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.logoUrl}
                      alt={`${g.label} Logo`}
                      className={styles.gameCardLogoImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.gameTag}>{g.tag}</span>
                </div>

                <div className={styles.gameCardContent}>
                  <span className={styles.gameCardName}>{g.label}</span>
                  <div className={styles.gameCardFooter}>
                    <span className={styles.selectBtnText}>
                      <span className={styles.selectBtnFull}>
                        Explore {g.label} Accounts →
                      </span>
                      <span className={styles.selectBtnShort}>
                        Explore →
                      </span>
                    </span>
                  </div>
                </div>

                <div className={`${styles.gameCardGlow} ${isSelected ? styles.glowActive : ""}`} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Row */}
      <div className={styles.ctaBetweenSection}>
        <Link href="/buy" className="btn-primary" prefetch={true}>
          Browse All Accounts
        </Link>
        <Link href="/sell" className="btn-ghost" prefetch={true}>
          List Your Account
        </Link>
      </div>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <div className={styles.heroEyebrow}>WHY CHOOSE PHYNIX STORE</div>
          <h2 className={styles.featuresHeading}>
            What Every <span className={styles.headingAccent}>Phynix Store</span> Account Delivers
          </h2>
          <p className={styles.featuresSubtext}>
            We verify skins, security, and credentials before listing so you get premium accounts without the risk.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((item, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <span className={styles.featureIcon}>{item.icon}</span>
              </div>
              <span className={styles.featureSubtitle}>{item.subtitle}</span>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
