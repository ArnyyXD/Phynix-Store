import styles from "../policy.module.css";

export default function PaymentSecurityPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Payment Security &amp; Rules</h1>
      <p className={styles.updated}>Last updated: October 2026 · Applies to all users of Phynix Store</p>

      {/* ── Middleman Banner ── */}
      <div className={styles.mmBanner}>
        ⚠️ MIDDLEMAN IS A MUST IN EVERY SINGLE DEAL —
        MIDDLEMAN FEES: <strong>₹75–₹100 per person</strong>
      </div>



      {/* ══════════════════════════════════════════════
          SECTION B — T.O.S
          ══════════════════════════════════════════════ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Terms of Service (T.O.S)</h2>
        <ol className={styles.list}>
          <li>
            We are <strong>not responsible for scams</strong> that happen with
            random sellers/buyers outside our platform. Always use a middleman.
          </li>
          <li>
            <strong>No returns once the deal is done.</strong> All sales are final
            after the handover is confirmed.
          </li>
          <li>
            Phynix Store is <strong>not affiliated</strong> with Riot Games,
            Supercell, Krafton, Garena, or any other game company.
          </li>
          <li>
            Public trading without our middleman is done at your own risk. We are
            not responsible for any losses if an MM is not used.
          </li>
          <li>
            Accounts listed on Phynix Store are <strong>legally purchased from
            their original owners</strong> and resold on this platform.
          </li>
          <li>
            Any entities, procedures, or information displayed here are for{" "}
            <strong>educational purposes or special request only</strong>.
          </li>
          <li>
            Accounts that are subject to <strong>revoke or lock</strong> by the
            game publisher will receive a <strong>refund or replacement</strong>{" "}
            — until it is confirmed to be the buyer&apos;s fault.
          </li>
          <li>
            By dealing on this platform, you agree to comply with all ToS listed
            here. Ignorance of the rules is not an excuse.
          </li>
          <li>
            <strong>Dropshipping is banned.</strong> You may not relist accounts
            purchased here on any other platform.
          </li>
          <li>
            All deals involving account locks or revokes are eligible for a{" "}
            <strong>refund or satisfactory replacement</strong>, unless a special
            agreement has been made beforehand or the issue is the buyer&apos;s fault.
          </li>
          <li>
            <strong>VP (Valorant Points) are sold by admins only.</strong> No VP
            promotion is allowed by anyone other than a Phynix Store admin.
          </li>
          <li>
            <strong>No fresh PHP-region accounts</strong> are sold here — only
            Eternal Valorant accounts or accounts with established history.
          </li>
        </ol>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION C — How a trade works (original content)
          ══════════════════════════════════════════════ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How a Trade Works</h2>
        <div className={styles.notice}>
          Phynix Store doesn&apos;t process payments itself. When you buy or list an
          account, you&apos;re connected to our middleman on WhatsApp, and payment
          and verification happen there — not on this site.
        </div>
        <ul className={styles.list}>
          <li>
            <strong>Listings are reviewed before going live.</strong> Rank, level,
            and skins are checked against screenshots before buyers can see a listing.
          </li>
          <li>
            <strong>Sellers verify with our middleman on WhatsApp.</strong> After
            submitting a listing, a &quot;Contact now for verification&quot; button opens a
            WhatsApp chat with our middleman for KYC before the listing goes live.
          </li>
          <li>
            <strong>Buyers contact the same middleman to purchase.</strong> &quot;Contact
            now to purchase&quot; opens WhatsApp with the listing ID pre-filled. Payment,
            UPI details, and timing are handled there.
          </li>
          <li>
            <strong>The middleman coordinates the handover.</strong> Once payment is
            confirmed, the middleman coordinates so the account changes hands and the
            seller gets paid.
          </li>
          <li>
            <strong>Disputes.</strong> If a trade goes wrong, contact us through{" "}
            <a href="/contact">Contact &amp; disputes</a> with your WhatsApp chat and
            payment proof.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Can&apos;t Protect Against</h2>
        <ul className={styles.list}>
          <li>
            Game publishers banning or suspending a traded account — this is a
            risk of account trading itself, not a platform failure.
          </li>
          <li>
            A buyer changing credentials and later claiming the account was not
            delivered — once credentials change, we cannot independently verify the handover.
          </li>
          <li>
            Fraud that happens entirely outside this platform (e.g. trades arranged
            on WhatsApp without going through our listing/review flow).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Questions or an Active Dispute?</h2>
        <p className={styles.body}>
          Go to <a href="/contact">Contact &amp; disputes</a> for our emergency contact
          details and expected response time. Middleman fees: <strong>₹75–₹100 per person</strong>.
        </p>
      </section>
    </div>
  );
}
