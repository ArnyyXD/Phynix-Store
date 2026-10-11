"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AccountCard from "../../components/AccountCard";
import { BUDGET_TIERS, LISTING_TYPES } from "../../lib/mockAccounts";
import { GAMES } from "../../lib/games";
import styles from "./buy.module.css";

function BuyClientContent({ initialAccounts }) {
  const searchParams = useSearchParams();
  const urlGame = searchParams.get("game");
  const urlBudget = searchParams.get("budget");
  const urlMinPrice = searchParams.get("minPrice");
  const urlMaxPrice = searchParams.get("maxPrice");

  const [accounts] = useState(initialAccounts ?? []);

  const [query, setQuery] = useState("");
  const [activeGame, setActiveGame] = useState(urlGame || null);
  const [activeBudget, setActiveBudget] = useState(urlBudget || null);
  const [activeType, setActiveType] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (urlGame) setActiveGame(urlGame);
    if (urlBudget) setActiveBudget(urlBudget);
  }, [urlGame, urlBudget]);

  const filtered = useMemo(() => {
    const result = accounts.filter((acc) => {
      const matchesQuery =
        query.trim() === "" ||
        acc.title.toLowerCase().includes(query.toLowerCase()) ||
        acc.rank.toLowerCase().includes(query.toLowerCase());

      const matchesGame = !activeGame || acc.game === activeGame;

      let matchesBudget = true;
      if (activeBudget) {
        const budget = BUDGET_TIERS.find((b) => b.id === activeBudget);
        if (budget) {
          matchesBudget = acc.price >= budget.min && acc.price <= budget.max;
        }
      } else if (urlMinPrice || urlMaxPrice) {
        const min = urlMinPrice ? Number(urlMinPrice) : 0;
        const max = urlMaxPrice ? Number(urlMaxPrice) : Infinity;
        matchesBudget = acc.price >= min && acc.price <= max;
      }

      const matchesType = !activeType || acc.listingType === activeType;

      return matchesQuery && matchesGame && matchesBudget && matchesType;
    });

    const sorted = [...result];
    if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return sorted;
  }, [accounts, query, activeGame, activeBudget, urlMinPrice, urlMaxPrice, activeType, sortBy]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Find an account that fits your budget</h1>
        <p className={styles.subheading}>
          {accounts.length > 0
            ? `${accounts.length} accounts currently listed across Valorant, Clash of Clans & BGMI`
            : "New listings added daily — check back soon."}
        </p>
      </section>

      {/* Budget Range Section */}
      <section className={styles.budgetTierSection}>
        <div className={styles.budgetHeader}>
          <span className={styles.budgetBadge}>BUDGET RANGE</span>
          <h2 className={styles.budgetHeading}>Filter By Price Tier</h2>
          <p className={styles.budgetSub}>Select a tier below or use the filter chips to discover listings within your target budget.</p>
        </div>

        <div className={styles.budgetGrid}>
          {BUDGET_TIERS.map((tier) => {
            const isSelected = activeBudget === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveBudget(isSelected ? null : tier.id)}
                className={`${styles.budgetCard} ${isSelected ? styles.budgetCardActive : ""}`}
              >
                <div className={styles.budgetCardTop}>
                  <span className={styles.budgetCardPrice}>{tier.label}</span>
                  {isSelected && <span className={styles.activeCheck}>✓ Active</span>}
                </div>
                <h4 className={styles.budgetCardTitle}>
                  {tier.id === "3-4k" && "Starter & Clean Ranks"}
                  {tier.id === "5-7k" && "Mid Tier & Stacked Vaults"}
                  {tier.id === "8-10k" && "High Profile & Premium Bundles"}
                </h4>
                <p className={styles.budgetCardDesc}>
                  {tier.id === "3-4k" && "Entry-level ranks, clean histories & budget smurfs."}
                  {tier.id === "5-7k" && "Competitive ranks, stacked inventories & popular skins."}
                  {tier.id === "8-10k" && "Radiant/Conqueror accounts, legacy badges & maxed stats."}
                </p>
                <div className={styles.budgetCardFooter}>
                  <span className={styles.budgetActionText}>
                    {isSelected ? "Filter Applied (Click to Clear)" : "Browse Tier Listings →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search by rank or listing title, e.g. 'Immortal' or 'Town Hall 14'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Game</span>
          <div className={styles.chips}>
            {GAMES.map((g) => (
              <button
                key={g.id}
                className={
                  activeGame === g.id
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                onClick={() => setActiveGame(activeGame === g.id ? null : g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Budget</span>
          <div className={styles.chips}>
            {BUDGET_TIERS.map((tier) => (
              <button
                key={tier.id}
                className={
                  activeBudget === tier.id
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                onClick={() =>
                  setActiveBudget(activeBudget === tier.id ? null : tier.id)
                }
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Type</span>
          <div className={styles.chips}>
            {LISTING_TYPES.map((type) => (
              <button
                key={type.id}
                className={
                  activeType === type.id
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                onClick={() =>
                  setActiveType(activeType === type.id ? null : type.id)
                }
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filtered.length > 0 && (
        <div className={styles.resultsBar}>
          <span className={styles.resultsCount}>
            {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          </span>
          <label className={styles.sortLabel}>
            Sort by
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
          </label>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {accounts.length === 0 ? (
            <>
              <p>No accounts listed yet.</p>
              <p className={styles.emptySub}>
                Be the first to list — head to <strong>/sell</strong> to submit your account.
              </p>
            </>
          ) : (
            <>
              <p>No accounts match those filters right now.</p>
              <p className={styles.emptySub}>
                Try widening your budget range, or check back later — new listings
                are added daily.
              </p>
            </>
          )}
        </div>
      ) : (
        <section className={styles.grid}>
          {filtered.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </section>
      )}
    </div>
  );
}

export default function BuyClient(props) {
  return (
    <Suspense fallback={<div className={styles.page}>Loading marketplace...</div>}>
      <BuyClientContent {...props} />
    </Suspense>
  );
}
