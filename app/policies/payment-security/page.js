import styles from "../policy.module.css";

export default function PaymentSecurityPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Payment Security</h1>
      <p className={styles.updated}>Last updated: [DATE]</p>

      <div className={styles.notice}>
        Phynix Store doesn't process payments itself. When you buy or list an
        account, you're connected to our middleman on WhatsApp, and payment
        and verification happen there — not on this site. We are not a
        licensed payment aggregator or bank-backed escrow service; see the
        note on regulatory risk at the bottom of this page.
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Why this matters</h2>
        <p className={styles.body}>
          Trading Valorant accounts is against Riot Games' Terms of Service.
          That means Riot can suspend or ban a traded account at any time,
          with no recourse through Riot for either party. Separately, because
          payment happens by direct UPI transfer rather than through a
          payment gateway with built-in buyer protection, both sides carry
          real risk: a buyer could pay and not receive working account
          access, or a seller could hand over access and not get paid. The
          steps below exist to reduce — not eliminate — that risk.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. How a trade actually works</h2>
        <ul className={styles.list}>
          <li>
            <strong>Listings are reviewed before going live.</strong> A new
            listing's rank/tier, level, and skins or notable items are
            checked against screenshots before buyers can see it.
          </li>
          <li>
            <strong>Sellers verify with our middleman on WhatsApp.</strong>{" "}
            After submitting a listing, you'll get a "Contact now for
            verification" button that opens a WhatsApp chat with our
            middleman. They'll confirm you own the account (original email or
            a government ID) before the listing goes live.
          </li>
          <li>
            <strong>Buyers contact the same middleman to purchase.</strong>{" "}
            On a listing page, "Contact now to purchase" opens WhatsApp with
            our middleman, pre-filled with which listing you want. Payment,
            UPI details, and timing are all handled in that WhatsApp
            conversation — not on this site.
          </li>
          <li>
            <strong>The middleman coordinates the handover.</strong> Once
            payment is confirmed, our middleman coordinates between buyer and
            seller so the account changes hands and the seller gets paid.
          </li>
          <li>
            <strong>A human reviews disputes.</strong> If a trade goes wrong,
            contact us through <a href="/contact">Contact &amp; disputes</a>{" "}
            with your WhatsApp chat and payment proof.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. What we can't protect against</h2>
        <ul className={styles.list}>
          <li>
            Riot Games banning or suspending a traded account — this is a
            certainty risk of account trading itself, not a platform failure.
          </li>
          <li>
            A buyer changing an account's credentials and later claiming it
            wasn't delivered — once credentials change, we can no longer
            independently verify the handover.
          </li>
          <li>
            Fraud that happens entirely outside this platform (e.g. a trade
            arranged over WhatsApp without going through our listing/review
            flow).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Best practices for buyers &amp; sellers</h2>
        <ul className={styles.list}>
          <li>Only pay or hand over access through the flow on this site — not a side conversation.</li>
          <li>Keep screenshots of the listing, chat, and payment confirmation until the trade is final.</li>
          <li>Sellers: use a UPI ID linked to a bank account in your own name, so a refund can be traced back if needed.</li>
          <li>Buyers: change the account's password only after you've confirmed everything matches the listing.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. A note on how the middleman is set up</h2>
        <p className={styles.body}>
          Under RBI rules, a business that regularly collects payment from
          one party and forwards it to another — which is exactly what a
          middleman/escrow flow does — can fall under the Payment Aggregator
          framework, which normally requires RBI authorization once volumes
          grow past a small scale. Using a personal or informal business UPI
          ID as a pass-through for other people's transactions, at scale,
          is a real compliance question, not just a technical one. [BUSINESS
          NAME] is reviewing the right structure for this (e.g. partnering
          with a licensed payment aggregator or nodal account instead of
          holding funds directly) — check with a professional before this
          goes live at any real volume.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Questions or an active dispute</h2>
        <p className={styles.body}>
          Go to <a href="/contact">Contact &amp; disputes</a> for our
          emergency contact details and expected response time.
        </p>
      </section>
    </div>
  );
}
