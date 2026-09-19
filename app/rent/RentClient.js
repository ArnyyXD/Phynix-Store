"use client";

import { useMemo, useState } from "react";
import AccountCard from "../../components/AccountCard";
import { ACCOUNTS, BUDGET_TIERS } from "../../lib/mockAccounts";
import { GAMES } from "../../lib/games";
import styles from "./rent.module.css";

export default function RentClient({ initialAccounts }) {
  const hasRealAccounts = initialAccounts && initialAccounts.length > 0;
  // If real database accounts exist for rent, use them; otherwise fallback to mock rent accounts
  const mockRentAccounts = ACCOUNTS.filter((acc) => acc.listingType === "rent");
  const [accounts] = useState(hasRealAccounts ? initialAccounts : mockRentAccounts);
  const [usingFallback] = useState(!hasRealAccounts);

  const [query, setQuery] = useState("");
  const [activeGame, setActiveGame] = useState(null);
  const [activeBudget, setActiveBudget] = useState(null);
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

      return matchesQuery && matchesGame && matchesBudget;
    });

    const sorted = [...result];
    if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return sorted;
  }, [accounts, query, activeGame, activeBudget, sortBy]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Rent premium gaming accounts</h1>
        <p className={styles.subheading}>
          Try out high-tier ranks, maxed heroes, and rare skins on a flexible daily or monthly rental basis.
        </p>
        {usingFallback && (
          <p className={styles.fallbackNote}>
            Showing sample rental listings — post a rental listing on /sell to see your account listed here!
          </p>
        )}
      </section>

      <section className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search rental accounts by rank or title, e.g. 'Glacier' or 'Grandmaster'"
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
                <span style={{ marginRight: 6 }}>{g.icon}</span>
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
      </section>

      {filtered.length > 0 && (
        <div className={styles.resultsBar}>
          <span className={styles.resultsCount}>
            {filtered.length} {filtered.length === 1 ? "rental listing" : "rental listings"}
          </span>
          <label className={styles.sortLabel}>
            Sort by
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Rental price: low to high</option>
              <option value="price_desc">Rental price: high to low</option>
            </select>
          </label>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No rental accounts match those filters right now.</p>
          <p className={styles.emptySub}>
            Try widening your budget range, or list your account for rent on /sell!
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
