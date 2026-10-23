import Link from "next/link";
import styles from "./faq.module.css";

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.badge}>SUPPORT &amp; LEGAL</div>
        <h1 className={styles.heading}>Frequently Asked Questions &amp; Policies</h1>
        <p className={styles.subheading}>
          Everything you need to know about trading safely on Phynix Store — Payment Security, Escrow, ToS, and Privacy &amp; Refunds.
        </p>
      </section>

      {/* Middleman Priority Alert */}
      <div className={styles.mmBanner}>
        <span className={styles.mmAlertIcon}>⚠️</span>
        <div className={styles.mmAlertText}>
          <strong>MIDDLEMAN (MM) IS MANDATORY FOR EVERY DEAL</strong>
          <p>Middleman fees are only ₹75–₹100 per person. Never deal directly with anyone outside our verified admin team.</p>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <nav className={styles.quickNav}>
        <a href="#how-it-works" className={styles.navChip}>How Trades Work</a>
        <a href="#payment-security" className={styles.navChip}>Payment Security</a>
        <a href="#tos" className={styles.navChip}>Terms of Service</a>
        <a href="#refund-policy" className={styles.navChip}>Refund Policy</a>
        <a href="#privacy" className={styles.navChip}>Privacy &amp; Data</a>
      </nav>

      {/* ── SECTION 1: HOW TRADES WORK ── */}
      <section id="how-it-works" className={styles.section}>
        <h2 className={styles.sectionTitle}>1. How Does a Deal Work on Phynix Store?</h2>
        <div className={styles.stepGrid}>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>01</span>
            <h3 className={styles.stepCardTitle}>Browse &amp; Select</h3>
            <p className={styles.stepCardDesc}>Find an account with your desired rank, skins, or level. Click &ldquo;Buy via WhatsApp&rdquo; to connect with our official admin team.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>02</span>
            <h3 className={styles.stepCardTitle}>Escrow Payment</h3>
            <p className={styles.stepCardDesc}>You pay the Middleman (admin) directly. The seller NEVER receives your money until you have verified full account ownership.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>03</span>
            <h3 className={styles.stepCardTitle}>Credential Transfer</h3>
            <p className={styles.stepCardDesc}>The seller hands over login credentials, email access, and security recovery data directly in our secure group chat.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>04</span>
            <h3 className={styles.stepCardTitle}>Verification &amp; Payout</h3>
            <p className={styles.stepCardDesc}>You secure the account by changing passwords &amp; 2FA. Once confirmed, payment is released to the seller.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PAYMENT SECURITY & RULES ── */}
      <section id="payment-security" className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Payment Security &amp; Escrow Rules</h2>
        <ul className={styles.list}>
          <li>
            <strong>100% Escrow Protection:</strong> Funds are locked securely in our escrow account during credential exchange.
          </li>
          <li>
            <strong>Verified Sellers Only:</strong> High-value accounts require KYC ownership proofs (original emails, transaction receipts, creation details).
          </li>
          <li>
            <strong>Middleman Fee:</strong> Standard fee is strictly ₹75–₹100 per person to cover fraud monitoring and transaction oversight.
          </li>
          <li>
            <strong>Zero Direct Transfers:</strong> Paying a seller directly without our Middleman voids all buyer protection and is done entirely at your own risk.
          </li>
        </ul>
      </section>

      {/* ── SECTION 3: TERMS OF SERVICE ── */}
      <section id="tos" className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Terms of Service (T.O.S)</h2>
        <ol className={styles.numberedList}>
          <li>
            <strong>Scam Protection:</strong> We are not responsible for transactions conducted outside our official verified WhatsApp channels.
          </li>
          <li>
            <strong>Sales Final:</strong> All sales are final after successful credential handover and confirmation by the buyer.
          </li>
          <li>
            <strong>No Dropshipping:</strong> Reselling accounts purchased on Phynix Store across third-party marketplaces is strictly prohibited.
          </li>
          <li>
            <strong>Publisher Independence:</strong> Phynix Store is an independent peer-to-peer marketplace and is not affiliated with Riot Games, Supercell, Krafton, or Garena.
          </li>
          <li>
            <strong>Legally Acquired Accounts:</strong> Accounts listed on Phynix Store are provided by their registered owners and vetted before listing.
          </li>
          <li>
            <strong>VP &amp; Game Currency:</strong> Valorant Points (VP) and in-game packs are handled and sold by verified Phynix Store admins only.
          </li>
        </ol>
      </section>

      {/* ── SECTION 4: REFUND & REPLACEMENT POLICY ── */}
      <section id="refund-policy" className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Refund &amp; Replacement Policy</h2>
        <div className={styles.policyBox}>
          <p className={styles.body}>
            We provide full buyer satisfaction guarantees under the following strict conditions:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Lock / Revoke Guarantee:</strong> Accounts that experience publisher revokes or retrieval within the warranty window receive an immediate full refund or equal replacement (unless due to buyer misconduct/third-party software).
            </li>
            <li>
              <strong>Misleading Listings:</strong> If account details (rank, skins, town hall, items) do not match the listing, you may reject the deal immediately for a 100% refund before credential acceptance.
            </li>
            <li>
              <strong>Resolution Timeline:</strong> Dispute investigations are initiated within 1 hour of receipt. Refund payouts are processed via UPI within 24 hours of approval.
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 5: PRIVACY & DATA PROTECTION ── */}
      <section id="privacy" className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Privacy &amp; Data Protection (DPDP Act)</h2>
        <p className={styles.body}>
          Phynix Store operates in accordance with India&apos;s Digital Personal Data Protection Act, 2023.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Data We Collect:</strong> Name, email address, phone number, and listing details when you create listings or sign in.
          </li>
          <li>
            <strong>No Data Selling:</strong> We never sell, rent, or trade your personal information with external advertisers or marketers.
          </li>
          <li>
            <strong>KYC Document Deletion:</strong> Any identity or credential records gathered during fraud disputes are permanently erased after resolution.
          </li>
          <li>
            <strong>Your Rights:</strong> You can request data access, correction, or deletion anytime by contacting our support team.
          </li>
        </ul>
      </section>

      {/* Need More Help Box */}
      <div className={styles.contactCard}>
        <h3 className={styles.contactTitle}>Have a question not listed here?</h3>
        <p className={styles.contactDesc}>Our support team and middlemen are available 24/7 to assist you with active trades or inquiries.</p>
        <div className={styles.contactButtons}>
          <a
            href="https://wa.me/919948633426?text=Hi%2C%20I%20have%20a%20question%20about%20Phynix%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Chat on WhatsApp
          </a>
          <Link href="/contact" className="btn-ghost">
            View All Contact Details
          </Link>
        </div>
      </div>
    </div>
  );
}
