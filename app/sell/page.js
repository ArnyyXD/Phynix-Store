"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import AccountCard from "../../components/AccountCard";
import { LISTING_TYPES } from "../../lib/mockAccounts";
import { GAMES, getGameConfig } from "../../lib/games";
import { buildWhatsAppLink, sellerVerificationMessage } from "../../lib/whatsapp";
import { compressImage } from "../../lib/imageCompressor";
import styles from "./sell.module.css";

const initialForm = {
  title: "",
  game: "valorant",
  rank: GAMES[0].ranks[0],
  level: "",
  skinNames: "",
  region: "India",
  listingType: "buy",
  price: "",
  emiMonths: "",
  upiId: "",
  whatsapp: "",
  description: "",
};

export default function SellPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]); // Array of { name, dataUrl }
  const [submitted, setSubmitted] = useState(false);
  const [newListing, setNewListing] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // "list" | "myListings"
  const [myListings, setMyListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);

  const gameConfig = getGameConfig(form.game);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMyListings();
    }
  }, [status]);

  async function fetchMyListings() {
    setLoadingListings(true);
    try {
      const res = await fetch("/api/accounts?mine=true");
      if (res.ok) {
        const data = await res.json();
        setMyListings(data);
      }
    } catch (e) {
      console.error("Failed to fetch seller listings:", e);
    } finally {
      setLoadingListings(false);
    }
  }

  async function handleDeleteMyListing(id) {
    const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete listing");
    }
    setMyListings((prev) => prev.filter((a) => a.id !== id));
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleGameChange(gameId) {
    const config = getGameConfig(gameId);
    setForm((prev) => ({ ...prev, game: gameId, rank: config.ranks[0] }));
  }

  async function handleImageChange(e) {
    const files = Array.from(e.target.files).slice(0, 5);
    if (!files.length) return;
    setCompressing(true);
    try {
      const processed = await Promise.all(files.map((file) => compressImage(file)));
      const valid = processed.filter(Boolean);
      setImages((prev) => [...prev, ...valid].slice(0, 5));
    } catch (err) {
      console.error("Image processing error:", err);
    } finally {
      setCompressing(false);
    }
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const skinNames = form.skinNames
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skinNames,
          images: images.map((img) => img.dataUrl),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Couldn't submit the listing.");
        return;
      }

      const created = await res.json();
      setNewListing(created);
      setSubmitted(true);
      fetchMyListings();
    } catch (err) {
      setError("Something went wrong submitting the listing.");
    } finally {
      setSubmitting(false);
    }
  }

  // Live preview account for the card in selling section
  const previewAccount = {
    id: "preview",
    title:
      form.title ||
      `${form.rank} account — ${
        form.skinNames
          ? form.skinNames.split(",").filter(Boolean).length
          : 0
      } items`,
    game: form.game,
    rank: form.rank,
    level: form.level ? Number(form.level) : null,
    skinNames: form.skinNames
      ? form.skinNames.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    region: form.region || "India",
    listingType: form.listingType,
    price: Number(form.price) || 0,
    emiMonths: form.emiMonths ? Number(form.emiMonths) : null,
    seller: session?.user?.name || session?.user?.email || "You",
    verified: false,
    images: images.map((img) => img.dataUrl),
    status: "live",
  };

  if (status === "loading") {
    return <div className={styles.page} />;
  }

  if (status !== "authenticated") {
    return (
      <div className={styles.page}>
        <div className={styles.confirmBox}>
          <h1 className={styles.confirmHeading}>Sign in to list an account</h1>
          <p className={styles.confirmBody}>
            We tie every listing to a signed-in seller so buyers know who
            they're dealing with and disputes can be traced.
          </p>
          <button className="btn-primary" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (submitted && newListing) {
    return (
      <div className={styles.page}>
        <div className={styles.confirmBox}>
          <h1 className={styles.confirmHeading}>Listing submitted</h1>
          <p className={styles.confirmBody}>
            Your listing is saved, but it won't show up for buyers until you
            complete a quick verification with our middleman over WhatsApp —
            they'll confirm you actually own the account before it goes live.
          </p>
          <a
            className="btn-primary"
            href={buildWhatsAppLink(sellerVerificationMessage(newListing))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact now for verification
          </a>
          <button
            className={styles.backLink}
            onClick={() => {
              setForm(initialForm);
              setImages([]);
              setSubmitted(false);
              setNewListing(null);
            }}
          >
            List another account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Seller Dashboard</h1>
        <p className={styles.subheading}>
          List new game accounts or manage your active &amp; sold listings.
        </p>

        {/* Seller Tab Navigation */}
        <div className={styles.tabBar}>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "list" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.tabIcon}>
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43739 22.1213 4.00001C22.1213 4.56263 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>List an Account</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "myListings" ? styles.tabBtnActive : ""
            }`}
            onClick={() => {
              setActiveTab("myListings");
              fetchMyListings();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.tabIcon}>
              <path d="M21 16V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>My Listings</span>
            {myListings.length > 0 && <span className={styles.tabBadge}>{myListings.length}</span>}
          </button>
        </div>
      </section>

      {/* ── My Listings Tab ────────────────────────── */}
      {activeTab === "myListings" && (
        <section className={styles.myListingsSection}>
          <div className={styles.myListingsHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Your Listed Accounts</h2>
              <p className={styles.sectionNote}>
                Manage your accounts. When an account gets sold out, you can delete it immediately using the Delete button.
              </p>
            </div>
            <button
              type="button"
              className={styles.refreshBtn}
              onClick={fetchMyListings}
              disabled={loadingListings}
            >
              {loadingListings ? "Refreshing..." : "🔄 Refresh"}
            </button>
          </div>

          {loadingListings ? (
            <div className={styles.emptyState}>Loading your listings...</div>
          ) : myListings.length === 0 ? (
            <div className={styles.emptyState}>
              <p>You haven't listed any accounts yet.</p>
              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: 14 }}
                onClick={() => setActiveTab("list")}
              >
                List Your First Account
              </button>
            </div>
          ) : (
            <div className={styles.myListingsGrid}>
              {myListings.map((acc) => (
                <AccountCard
                  key={acc.id}
                  account={acc}
                  onDelete={handleDeleteMyListing}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── List an Account Tab ────────────────────────── */}
      {activeTab === "list" && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Account details</h2>

            <label className={styles.field}>
              <span className={styles.label}>Game *</span>
              <div className={styles.typeToggle}>
                {GAMES.map((g) => (
                  <button
                    type="button"
                    key={g.id}
                    className={
                      form.game === g.id
                        ? `${styles.typeBtn} ${styles.typeBtnActive}`
                        : styles.typeBtn
                    }
                    style={
                      form.game === g.id
                        ? {
                            borderColor: g.accent,
                            background: `${g.accent}22`,
                            color: g.accent,
                          }
                        : undefined
                    }
                    onClick={() => handleGameChange(g.id)}
                  >
                    <span className={styles.gameBtnIcon}>{g.icon}</span>{" "}
                    {g.label}
                  </button>
                ))}
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Listing title (optional)</span>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. Immortal 2 — Full Ready-Up Skin Vault"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </label>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>{gameConfig.rankLabel} *</span>
                <select
                  className={styles.input}
                  value={form.rank}
                  onChange={(e) => update("rank", e.target.value)}
                >
                  {gameConfig.ranks.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>{gameConfig.levelLabel}</span>
                <input
                  className={styles.input}
                  type="number"
                  min="1"
                  placeholder="e.g. 187"
                  value={form.level}
                  onChange={(e) => update("level", e.target.value)}
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>{gameConfig.itemsLabel} *</span>
              <input
                className={styles.input}
                type="text"
                placeholder={gameConfig.itemsPlaceholder}
                value={form.skinNames}
                onChange={(e) => update("skinNames", e.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Region</span>
              <input
                className={styles.input}
                type="text"
                value={form.region}
                onChange={(e) => update("region", e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Description</span>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder="Competitive history, notable bundles, anything a buyer should know."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </label>

            {/* Screenshot Upload Card Area */}
            <div className={styles.uploadCard}>
              <div className={styles.uploadHeader}>
                <span className={styles.label}>
                  📸 Account Screenshots (Rank, Inventory, Level) — max 5
                </span>
                <span className={styles.uploadTip}>
                  Screenshots show directly within your listing card!
                </span>
              </div>

              <div className={styles.uploadBox}>
                <input
                  id="screenshot-input"
                  className={styles.fileInputHidden}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={compressing}
                />
                <label htmlFor="screenshot-input" className={styles.uploadDropzone}>
                  <span className={styles.uploadIcon}>📷</span>
                  <span className={styles.uploadMainText}>
                    {compressing
                      ? "Processing & optimizing screenshots..."
                      : "Click to upload screenshots"}
                  </span>
                  <span className={styles.uploadSubText}>
                    PNG, JPG, WebP supported • Up to 5 screenshots
                  </span>
                </label>
              </div>

              {images.length > 0 && (
                <div className={styles.imagePreviewGrid}>
                  {images.map((img, i) => (
                    <div key={i} className={styles.imagePreviewItem}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.dataUrl}
                        alt={img.name}
                        className={styles.imagePreviewThumb}
                      />
                      <button
                        type="button"
                        className={styles.imageRemoveBtn}
                        onClick={() => removeImage(i)}
                        aria-label={`Remove ${img.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Card Preview Section */}
            <div className={styles.livePreviewSection}>
              <div className={styles.previewHeader}>
                <span className={styles.previewBadge}>Live Card Preview</span>
                <span className={styles.previewHint}>
                  {images.length > 0
                    ? "Uploaded screenshot is displayed within the card below:"
                    : "Upload a screenshot above to see it appear inside this card:"}
                </span>
              </div>
              <div className={styles.previewCardWrap}>
                <AccountCard account={previewAccount} />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Listing type &amp; estimated price</h2>

            <div className={styles.typeToggle}>
              {LISTING_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  className={
                    form.listingType === type.id
                      ? `${styles.typeBtn} ${styles.typeBtnActive}`
                      : styles.typeBtn
                  }
                  onClick={() => update("listingType", type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>Estimated price (₹) *</span>
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  placeholder="e.g. 4500"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  required
                />
              </label>

              {form.listingType === "emi" && (
                <label className={styles.field}>
                  <span className={styles.label}>EMI duration (months)</span>
                  <input
                    className={styles.input}
                    type="number"
                    min="1"
                    placeholder="e.g. 3"
                    value={form.emiMonths}
                    onChange={(e) => update("emiMonths", e.target.value)}
                    required
                  />
                </label>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payout details</h2>
            <p className={styles.sectionNote}>
              Buyers pay our middleman directly — never you — so this UPI ID is
              only used when we pay you out after a sale. Before payout, we'll
              ask you to verify ownership with your account's original email or a
              government ID (see the{" "}
              <a href="/policies/payment-security">Payment Security</a> page).
              Nothing here goes live to buyers.
            </p>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>Your UPI ID (for payout)</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="yourname@upi"
                  value={form.upiId}
                  onChange={(e) => update("upiId", e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>WhatsApp number</span>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            className={`btn-primary ${styles.submitBtn}`}
            disabled={submitting || compressing}
          >
            {submitting ? "Submitting..." : "Submit listing for review"}
          </button>
        </form>
      )}
    </div>
  );
}
