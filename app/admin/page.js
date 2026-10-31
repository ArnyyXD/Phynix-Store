"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { isAdminEmail } from "../../lib/admin";
import { getGameConfig } from "../../lib/games";
import styles from "./admin.module.css";

// ── Community Links sub-component ──────────────────────────────────
function CommunityLinksPanel({ showToast }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newLink, setNewLink] = useState({ platform: "whatsapp", displayName: "", url: "", enabled: true, order: 0 });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch("/api/community-links?all=true");
      const data = await res.json();
      if (Array.isArray(data)) setLinks(data);
    } catch {}
    setLoading(false);
  }

  async function handleToggle(link) {
    setSaving(link.id);
    try {
      const res = await fetch(`/api/community-links/${link.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !link.enabled }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        showToast(`${link.displayName} ${updated.enabled ? "enabled" : "disabled"}`);
      }
    } catch {}
    setSaving(null);
  }

  async function handleUpdate(link, changes) {
    setSaving(link.id);
    try {
      const res = await fetch(`/api/community-links/${link.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (res.ok) {
        const updated = await res.json();
        setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        showToast(`Saved changes for ${updated.displayName}`);
      }
    } catch {}
    setSaving(null);
  }

  async function handleDelete(link) {
    if (!window.confirm(`Delete "${link.displayName}"?`)) return;
    setSaving(link.id);
    try {
      const res = await fetch(`/api/community-links/${link.id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks((prev) => prev.filter((l) => l.id !== link.id));
        showToast(`${link.displayName} deleted`);
      }
    } catch {}
    setSaving(null);
  }

  async function handleAdd() {
    if (!newLink.displayName.trim()) return;
    setSaving("new");
    try {
      const res = await fetch("/api/community-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLink),
      });
      if (res.ok) {
        const created = await res.json();
        setLinks((prev) => [...prev, created]);
        setNewLink({ platform: "whatsapp", displayName: "", url: "", enabled: true, order: 0 });
        setAdding(false);
        showToast(`${created.displayName} added`);
      }
    } catch {}
    setSaving(null);
  }

  if (loading) return <div className={styles.emptyBox}>Loading community links…</div>;

  return (
    <div className={styles.communityPanel}>
      <div className={styles.communityHeader}>
        <div>
          <h2 className={styles.communityTitle}>Community Links</h2>
          <p className={styles.subtext}>Manage links shown on the Contact page. Changes are live immediately.</p>
        </div>
        <button className={styles.refreshBtn} onClick={() => setAdding((v) => !v)}>
          {adding ? "✕ Cancel" : "+ Add Link"}
        </button>
      </div>

      {adding && (
        <div className={styles.addLinkForm}>
          <select
            className={styles.addLinkSelect}
            value={newLink.platform}
            onChange={(e) => setNewLink((f) => ({ ...f, platform: e.target.value }))}
          >
            {["whatsapp", "discord", "telegram", "facebook", "instagram", "youtube"].map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
          <input
            className={styles.addLinkInput}
            placeholder="Display name (e.g. WhatsApp Community)"
            value={newLink.displayName}
            onChange={(e) => setNewLink((f) => ({ ...f, displayName: e.target.value }))}
          />
          <input
            className={styles.addLinkInput}
            placeholder="URL (leave blank if pending)"
            value={newLink.url}
            onChange={(e) => setNewLink((f) => ({ ...f, url: e.target.value }))}
          />
          <button
            className={styles.saveLinkBtn}
            onClick={handleAdd}
            disabled={saving === "new" || !newLink.displayName.trim()}
          >
            {saving === "new" ? "Saving…" : "Save"}
          </button>
        </div>
      )}

      <div className={styles.communityTable}>
        {links.length === 0 ? (
          <div className={styles.emptyBox}>No community links yet.</div>
        ) : (
          links.map((link) => (
            <CommunityRow
              key={link.id}
              link={link}
              saving={saving}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CommunityRow({ link, saving, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    platform: link.platform,
    displayName: link.displayName,
    url: link.url,
  });
  const isProcessing = saving === link.id;

  function handleSave() {
    onUpdate(link, formData);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className={styles.communityRowEdit}>
        <div className={styles.editRowFields}>
          <select
            className={styles.addLinkSelect}
            value={formData.platform}
            onChange={(e) => setFormData((f) => ({ ...f, platform: e.target.value }))}
          >
            {["whatsapp", "discord", "telegram", "facebook", "instagram", "youtube"].map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
          <input
            className={styles.addLinkInput}
            value={formData.displayName}
            placeholder="Display Name"
            onChange={(e) => setFormData((f) => ({ ...f, displayName: e.target.value }))}
          />
          <input
            className={styles.communityUrlInput}
            value={formData.url}
            placeholder="URL (leave blank if pending)"
            onChange={(e) => setFormData((f) => ({ ...f, url: e.target.value }))}
          />
        </div>
        <div className={styles.communityRowActions}>
          <button className={styles.saveLinkBtn} onClick={handleSave} disabled={isProcessing}>
            {isProcessing ? "Saving…" : "Save"}
          </button>
          <button className={styles.filterBtn} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.communityRow} ${!link.enabled ? styles.communityRowDisabled : ""}`}>
      <div className={styles.communityRowLeft}>
        <span className={styles.communityPlatformBadge} data-platform={link.platform}>
          {link.platform.toUpperCase()}
        </span>
        <span className={styles.communityName}>{link.displayName}</span>
        {!link.enabled && <span className={styles.pendingBadge}>PENDING / DISABLED</span>}
      </div>
      <div className={styles.communityRowCenter}>
        <span className={styles.urlDisplay} title={link.url}>
          {link.url ? link.url : <em style={{ color: "var(--text-faint)" }}>Pending URL — owner to provide</em>}
        </span>
      </div>
      <div className={styles.communityRowActions}>
        <button
          className={styles.toggleBtn}
          onClick={() => {
            setFormData({ platform: link.platform, displayName: link.displayName, url: link.url });
            setIsEditing(true);
          }}
          disabled={isProcessing}
        >
          ✏️ Edit
        </button>
        <button
          className={`${styles.toggleBtn} ${link.enabled ? "" : styles.enableBtn}`}
          onClick={() => onToggle(link)}
          disabled={isProcessing}
        >
          {link.enabled ? "Disable" : "Enable"}
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(link)}
          disabled={isProcessing}
        >
          {isProcessing ? "…" : "🗑️"}
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "live" | "sold"
  const [search, setSearch] = useState("");
  const [actionId, setActionId] = useState(null); // tracking loading state for a specific account action
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && isAdminEmail(session?.user?.email)) {
      fetchAccounts();
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [status, session]);

  async function fetchAccounts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/accounts");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch accounts");
      }
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, title) {
    if (!window.confirm(`Are you sure you want to PERMANENTLY DELETE listing:\n"${title}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    setActionId(id);
    try {
      const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete listing");
      }
      setAccounts((prev) => prev.filter((a) => a.id !== id));
      showToast(`Listing "${title}" has been deleted.`);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionId(null);
    }
  }

  async function handleToggleStatus(id, currentStatus) {
    const newStatus = currentStatus === "live" ? "sold" : "live";
    setActionId(id);
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }
      const updated = await res.json();
      setAccounts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a))
      );
      showToast(`Listing marked as ${newStatus.toUpperCase()}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionId(null);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  if (status === "loading" || (loading && accounts.length === 0)) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingBox}>Loading Admin Dashboard...</div>
      </div>
    );
  }

  const isAdmin = status === "authenticated" && isAdminEmail(session?.user?.email);

  if (!isAdmin) {
    return (
      <div className={styles.page}>
        <div className={styles.accessDeniedCard}>
          <div className={styles.lockIcon}>🔒</div>
          <h1 className={styles.heading}>Admin Access Required</h1>
          <p className={styles.subtext}>
            {status === "authenticated"
              ? `Signed in as ${session.user.email}. This account does not have admin permissions.`
              : "You must sign in with an authorized admin account to access this page."}
          </p>
          {status === "authenticated" ? (
            <button className="btn-primary" onClick={() => signIn()}>
              Switch Account
            </button>
          ) : (
            <button className="btn-primary" onClick={() => signIn()}>
              Sign In as Admin
            </button>
          )}
        </div>
      </div>
    );
  }

  // Filter & Search logic
  const filteredAccounts = accounts.filter((acc) => {
    if (filter === "live" && acc.status !== "live") return false;
    if (filter === "sold" && acc.status !== "sold") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const titleMatch = acc.title?.toLowerCase().includes(q);
      const gameMatch = acc.game?.toLowerCase().includes(q);
      const rankMatch = acc.rank?.toLowerCase().includes(q);
      const sellerMatch =
        acc.seller?.email?.toLowerCase().includes(q) ||
        acc.seller?.name?.toLowerCase().includes(q);
      return titleMatch || gameMatch || rankMatch || sellerMatch;
    }
    return true;
  });

  const totalCount = accounts.length;
  const liveCount = accounts.filter((a) => a.status === "live").length;
  const soldCount = accounts.filter((a) => a.status === "sold").length;

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <p className={styles.subtext}>
            Manage account listings, mark sold items, or delete listings.
          </p>
        </div>
        <button type="button" className={styles.refreshBtn} onClick={fetchAccounts} disabled={loading}>
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{totalCount}</span>
          <span className={styles.statLabel}>Total Listings</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber} style={{ color: "var(--accent)" }}>
            {liveCount}
          </span>
          <span className={styles.statLabel}>Live Listings</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber} style={{ color: "#eab308" }}>
            {soldCount}
          </span>
          <span className={styles.statLabel}>Sold Listings</span>
        </div>
      </div>

      {/* Controls: Filter & Search */}
      <div className={styles.controlsRow}>
        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === "all" ? styles.filterActive : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === "live" ? styles.filterActive : ""}`}
            onClick={() => setFilter("live")}
          >
            Live ({liveCount})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === "sold" ? styles.filterActive : ""}`}
            onClick={() => setFilter("sold")}
          >
            Sold ({soldCount})
          </button>
        </div>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by title, game, rank, or seller..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Listings Table / Cards */}
      {filteredAccounts.length === 0 ? (
        <div className={styles.emptyBox}>No listings match the current filter.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Listing</th>
                <th>Game</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => {
                const gameConfig = getGameConfig(acc.game);
                const isProcessing = actionId === acc.id;
                const thumb = acc.images && acc.images.length > 0 ? acc.images[0] : null;

                return (
                  <tr key={acc.id} className={acc.status === "sold" ? styles.rowSold : ""}>
                    <td>
                      <div className={styles.listingCell}>
                        {thumb ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={thumb} alt="" className={styles.tableThumb} />
                        ) : (
                          <div className={styles.tableThumbPlaceholder}>📷</div>
                        )}
                        <div>
                          <Link href={`/accounts/${acc.id}`} className={styles.titleLink} target="_blank">
                            {acc.title}
                          </Link>
                          <div className={styles.metaSub}>
                            {acc.rank} • Level {acc.level ?? "--"} • {acc.skinNames?.length || 0} items
                            {acc.images?.length > 0 && ` • 🖼️ ${acc.images.length} images`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={styles.gameBadge} style={{ color: gameConfig.accent }}>
                        {gameConfig.icon} {gameConfig.label}
                      </span>
                    </td>

                    <td>
                      <span className={styles.priceText}>₹{acc.price?.toLocaleString("en-IN")}</span>
                    </td>

                    <td>
                      <div className={styles.sellerCell}>
                        <span className={styles.sellerName}>
                          {acc.seller?.name || acc.seller?.email || "Unknown"}
                        </span>
                        {acc.seller?.email && (
                          <span className={styles.sellerEmail}>{acc.seller.email}</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          acc.status === "sold"
                            ? styles.statusSold
                            : styles.statusLive
                        }`}
                      >
                        {acc.status?.toUpperCase() || "LIVE"}
                      </span>
                    </td>

                    <td>
                      <span className={styles.dateText}>
                        {new Date(acc.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionGroup}>
                        <button
                          type="button"
                          className={styles.toggleBtn}
                          onClick={() => handleToggleStatus(acc.id, acc.status)}
                          disabled={isProcessing}
                          title={acc.status === "live" ? "Mark as Sold" : "Re-list as Live"}
                        >
                          {acc.status === "live" ? "Mark Sold" : "Re-list"}
                        </button>

                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(acc.id, acc.title)}
                          disabled={isProcessing}
                          title="Permanently Delete Listing"
                        >
                          {isProcessing ? "Deleting..." : "🗑️ Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Community Links Management */}
      <div style={{ marginTop: 48 }}>
        <CommunityLinksPanel showToast={showToast} />
      </div>
    </div>
  );
}
