"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { isAdminEmail } from "../lib/admin";
import styles from "./AccountCard.module.css";
import { getGameConfig } from "../lib/games";

const TYPE_LABEL = {
  buy: "Buy",
  rent: "Rent",
  emi: "EMI",
};

export default function AccountCard({ account, onDelete }) {
  const { data: session } = useSession();
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const {
    id,
    title,
    game,
    rank,
    region,
    level,
    skinNames,
    price,
    listingType,
    rentPeriodDays,
    emiMonths,
    seller,
    sellerId,
    verified,
    images,
    status,
  } = account;

  const gameConfig = getGameConfig(game);
  const skinList = skinNames || [];
  const visibleSkins = skinList.slice(0, 3);
  const extraSkinCount = skinList.length - visibleSkins.length;
  const sellerName =
    typeof seller === "string" ? seller : seller?.name || seller?.email || "seller";
  const thumbSrc = images && images.length > 0 ? images[0] : null;

  const isOwner =
    session?.user &&
    ((sellerId && session.user.id === sellerId) ||
      (typeof seller === "object" &&
        seller?.email &&
        session.user.email?.toLowerCase() === seller.email.toLowerCase()));
  const isAdmin = session?.user && isAdminEmail(session.user.email);
  const canDelete = isOwner || isAdmin;

  async function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to permanently delete listing:\n"${title}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      if (onDelete) {
        await onDelete(id);
      } else {
        const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to delete listing");
        }
      }
      setDeleted(true);
    } catch (err) {
      alert(err.message || "Could not delete listing.");
      setDeleting(false);
    }
  }

  if (deleted) {
    return (
      <div className={styles.deletedCard}>
        <span>🗑️ Listing deleted</span>
      </div>
    );
  }

  return (
    <article
      className={`${styles.card} ${status === "sold" ? styles.cardSold : ""}`}
      style={{ "--accent-rgb": hexToRgb(gameConfig.accent) }}
    >
      <div className={styles.accentBar} style={{ background: gameConfig.accent }} />

      {thumbSrc && (
        <div className={styles.thumbWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbSrc} alt={title || "Screenshot"} className={styles.cardThumb} />
          {images && images.length > 1 && (
            <span className={styles.thumbCountBadge}>
              📷 {images.length}
            </span>
          )}
          {status === "sold" && (
            <span className={styles.soldOverlay}>SOLD OUT</span>
          )}
        </div>
      )}

      <div className={styles.cardTop}>
        <div className={styles.gameBadge} style={{ color: gameConfig.accent }}>
          <span className={styles.gameIcon}>{gameConfig.icon}</span>
          {gameConfig.label}
        </div>
        <div className={styles.badgesRight}>
          {status === "sold" && !thumbSrc && (
            <span className={styles.soldBadgeInline}>Sold</span>
          )}
          {verified && (
            <span className={styles.verified}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10.5L8 14.5L16 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{gameConfig.rankLabel}</span>
          <span className={styles.statValue}>{rank}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>{gameConfig.levelLabel}</span>
          <span className={styles.statValue}>{level ?? "--"}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statLabel}>Items</span>
          <span className={styles.statValue}>{skinList.length}</span>
        </div>
      </div>

      {visibleSkins.length > 0 && (
        <div className={styles.skinTags}>
          {visibleSkins.map((skin) => (
            <span key={skin} className={styles.skinTag}>
              {skin}
            </span>
          ))}
          {extraSkinCount > 0 && (
            <span className={styles.skinTagMore}>+{extraSkinCount} more</span>
          )}
        </div>
      )}

      <div className={styles.cardBottom}>
        <div className={styles.priceBlock}>
          <span className={styles.currency}>₹</span>
          <span className={styles.price}>{price ? price.toLocaleString("en-IN") : "0"}</span>
          <span className={`${styles.typeTag} ${styles[listingType || "buy"]}`}>
            {TYPE_LABEL[listingType || "buy"]}
          </span>
        </div>
        {listingType === "rent" && (
          <div className={styles.subline}>for {rentPeriodDays} days</div>
        )}
        {listingType === "emi" && (
          <div className={styles.subline}>over {emiMonths} months</div>
        )}
        {listingType === "buy" && <div className={styles.subline}>{region}</div>}
      </div>

      <div className={styles.footer}>
        <span className={styles.sellerRow}>{sellerName}</span>
        <div className={styles.footerActions}>
          {canDelete && id !== "preview" && (
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDeleteClick}
              disabled={deleting}
              title="Delete this listing"
            >
              {deleting ? "..." : "🗑️ Delete"}
            </button>
          )}
          {id !== "preview" ? (
            <Link href={`/accounts/${id}`} className={styles.viewBtn}>
              View listing →
            </Link>
          ) : (
            <span className={styles.previewTag}>Card Preview</span>
          )}
        </div>
      </div>
    </article>
  );
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
