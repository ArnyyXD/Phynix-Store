"use client";

import { useMemo, useState } from "react";
import AccountCard from "../../components/AccountCard";
import { ACCOUNTS, BUDGET_TIERS, LISTING_TYPES } from "../../lib/mockAccounts";
import { GAMES } from "../../lib/games";
import styles from "./buy.module.css";

export default function BuyClient({ initialAccounts }) {
  const hasRealAccounts = initialAccounts && initialAccounts.length > 0;
  const [accounts] = useState(hasRealAccounts ? initialAccounts : ACCOUNTS);
  const [usingFallback] = useState(!hasRealAccounts);

  const [query, setQuery] = useState("");
  const [activeGame, setActiveGame] = useState(null);
  const [activeBudget, setActiveBudget] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    const result = accounts.filter((acc) => {
      const matchesQuery =
        query.trim() === "" ||
        acc.title.toLowerCase().includes(query.toLowerCase()) ||
        acc.rank.toLowerCase().includes(query.toLowerCase());

      const matchesGame = !activeGame || acc.game === activeGame;

      const budget = BUDGET_TIERS.find((b) => b.id === activeBudget);
      const matchesBudget =
        !budget || (acc.price >= budget.min && acc.price <= budget.max);

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
  }, [accounts, query, activeGame, activeBudget, activeType, sortBy]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Find an account that fits your budget</h1>
        <p className={styles.subheading}>
          {accounts.length} accounts currently listed across Valorant, Clash
          of Clans &amp; BGMI
        </p>
        {usingFallback && (
          <p className={styles.fallbackNote}>
            Showing sample listings — post a seller listing on /sell to see real accounts here.
          </p>
        )}
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
          <p>No accounts match those filters right now.</p>
          <p className={styles.emptySub}>
            Try widening your budget range, or check back later — new listings
            are added daily.
          </p>
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
