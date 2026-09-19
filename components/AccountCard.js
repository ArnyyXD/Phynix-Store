import Link from "next/link";
import styles from "./AccountCard.module.css";
import { getGameConfig } from "../lib/games";

const TYPE_LABEL = {
  buy: "Buy",
  rent: "Rent",
  emi: "EMI",
};

export default function AccountCard({ account }) {
  const {
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
    verified,
  } = account;

  const gameConfig = getGameConfig(game);
  const skinList = skinNames || [];
  const visibleSkins = skinList.slice(0, 3);
  const extraSkinCount = skinList.length - visibleSkins.length;
  const sellerName =
    typeof seller === "string" ? seller : seller?.name || seller?.email || "seller";

  return (
    <article
      className={styles.card}
      style={{ "--accent-rgb": hexToRgb(gameConfig.accent) }}
    >
      <div className={styles.accentBar} style={{ background: gameConfig.accent }} />

      <div className={styles.cardTop}>
        <div className={styles.gameBadge} style={{ color: gameConfig.accent }}>
          <span className={styles.gameIcon}>{gameConfig.icon}</span>
          {gameConfig.label}
        </div>
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
          <span className={styles.price}>{price.toLocaleString("en-IN")}</span>
          <span className={`${styles.typeTag} ${styles[listingType]}`}>
            {TYPE_LABEL[listingType]}
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
        <Link href={`/accounts/${account.id}`} className={styles.viewBtn}>
          View listing →
        </Link>
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
