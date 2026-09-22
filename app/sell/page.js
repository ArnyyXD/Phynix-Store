"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { LISTING_TYPES } from "../../lib/mockAccounts";
import { GAMES, getGameConfig } from "../../lib/games";
import { buildWhatsAppLink, sellerVerificationMessage } from "../../lib/whatsapp";
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
  rentPeriodDays: "",
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
  const gameConfig = getGameConfig(form.game);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleGameChange(gameId) {
    const config = getGameConfig(gameId);
    setForm((prev) => ({ ...prev, game: gameId, rank: config.ranks[0] }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files).slice(0, 5); // max 5 images
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve({ name: file.name, dataUrl: ev.target.result });
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then(setImages);
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
          // Note: UPI ID / WhatsApp are collected here so a listing has
          // payout details ready, but should be reviewed/verified by an
          // admin step before being shown to buyers — see the payment
          // security policy page.
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
    } catch (err) {
      setError("Something went wrong submitting the listing.");
    } finally {
      setSubmitting(false);
    }
  }

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
        <h1 className={styles.heading}>List your account for sale</h1>
        <p className={styles.subheading}>
          Fill in accurate details — choose to sell outright or offer EMI for your Valorant, Clash of Clans, BGMI, or Free Fire account.
        </p>
      </section>

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
                      ? { borderColor: g.accent, background: `${g.accent}22`, color: g.accent }
                      : undefined
                  }
                  onClick={() => handleGameChange(g.id)}
                >
                  <span className={styles.gameBtnIcon}>{g.icon}</span> {g.label}
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

          <label className={styles.field}>
            <span className={styles.label}>Screenshots (rank, inventory, level) — max 5</span>
            <input
              className={styles.input}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {images.length > 0 && (
            <div className={styles.imagePreviewGrid}>
              {images.map((img, i) => (
                <div key={i} className={styles.imagePreviewItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.dataUrl} alt={img.name} className={styles.imagePreviewThumb} />
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

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Listing type & estimated price</h2>

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
            ask you to verify ownership with your account's original email
            or a government ID (see the{" "}
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
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit listing for review"}
        </button>
      </form>
    </div>
  );
}
