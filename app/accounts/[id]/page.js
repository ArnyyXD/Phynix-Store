"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ACCOUNTS } from "../../../lib/mockAccounts";
import { getGameConfig } from "../../../lib/games";
import { buildWhatsAppLink, buyerPurchaseMessage } from "../../../lib/whatsapp";
import styles from "./account.module.css";

export default function AccountDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { status } = useSession();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/accounts/${id}`);
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        if (!cancelled) setAccount(data);
      } catch (err) {
        // Fall back to mock data for local dev without a DB connected.
        const mock = ACCOUNTS.find((a) => a.id === id);
        if (!cancelled) setAccount(mock || null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className={styles.page} />;

  if (!account) {
    return (
      <div className={styles.page}>
        <p className={styles.body}>Listing not found.</p>
      </div>
    );
  }

  const gameConfig = getGameConfig(account.game);
  const whatsappHref = buildWhatsAppLink(buyerPurchaseMessage(account));

  return (
    <div className={styles.page}>
      <span className={styles.gameTag}>{gameConfig.label}</span>
      <h1 className={styles.title}>{account.title}</h1>

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{gameConfig.rankLabel}</span>
          <span className={styles.statValue}>{account.rank}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{gameConfig.levelLabel}</span>
          <span className={styles.statValue}>{account.level ?? "--"}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Region</span>
          <span className={styles.statValue}>{account.region}</span>
        </div>
      </div>

      {account.images?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Screenshots</h2>
          <div className={styles.gallery}>
            {account.images.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={src}
                alt={`Listing screenshot ${i + 1}`}
                className={styles.galleryImg}
                onClick={() => window.open(src, "_blank")}
              />
            ))}
          </div>
        </div>
      )}

      {account.skinNames?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{gameConfig.itemsLabel}</h2>
          <div className={styles.skinTags}>
            {account.skinNames.map((s) => (
              <span key={s} className={styles.skinTag}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {account.description && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <p className={styles.body}>{account.description}</p>
        </div>
      )}

      <div className={styles.buyBox}>
        <div>
          <div className={styles.price}>₹{account.price.toLocaleString("en-IN")}</div>
          <div className={styles.priceNote}>
            Payment is handled on WhatsApp with our middleman, not on this site
          </div>
        </div>
        {status === "authenticated" ? (
          <a
            className="btn-primary"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact now to purchase
          </a>
        ) : (
          <button className="btn-primary" onClick={() => signIn()}>
            Sign in to contact seller
          </button>
        )}
      </div>
    </div>
  );
}
