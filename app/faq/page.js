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
          <strong>MIDDLEMAN (MM) IS AVAILABLE FOR DEALS</strong>
          <p>We charge a specified fee for our middleman service. This fee applies only when the middleman service is used.</p>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <nav className={styles.quickNav}>
        <a href="#how-it-works" className={styles.navChip}>How Trades Work</a>
        <a href="#payment-security" className={styles.navChip}>Payment Security</a>
        <a href="#tos" className={styles.navChip}>Terms of Service</a>
        <a href="#refund-policy" className={styles.navChip}>Refund Policy</a>
        <a href="#privacy" className={styles.navChip}>Privacy &amp; Data</a>
        <a href="#faq-extra" className={styles.navChip}>More FAQs</a>
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
            <strong>Verified Sellers Only:</strong> High-value accounts require ID card proof (original emails, transaction receipts, creation details).
          </li>
          <li>
            <strong>Middleman Fee:</strong> A middleman fee applies only when a middleman service is used. Buyers purchasing directly from the community owner do not pay a middleman fee.
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
              <strong>Resolution Timeline:</strong> Refund requests may take 10–15 days to resolve. Where applicable, a replacement may be offered instead, subject to eligibility and the deal terms.
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 5: PRIVACY & DATA PROTECTION ── */}
      <section id="privacy" className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Privacy &amp; Data Protection</h2>
        <p className={styles.body}>
          Phynix Store is committed to protecting your personal data and privacy.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Data We Collect:</strong> Name, email address, phone number, and listing details when you create listings or sign in.
          </li>
          <li>
            <strong>No Data Selling:</strong> We never sell, rent, or trade your personal information with external advertisers or marketers.
          </li>
          <li>
            <strong>Information Deletion:</strong> Any identity or credential records gathered during fraud disputes are permanently erased after resolution.
          </li>
          <li>
            <strong>Your Rights:</strong> You can request data access, correction, or deletion anytime by contacting our support team.
          </li>
        </ul>
      </section>

      {/* ── SECTION 6: ADDITIONAL FAQs ── */}
      <section id="faq-extra" className={styles.section}>
        <h2 className={styles.sectionTitle}>6. More Frequently Asked Questions</h2>
        <div className={styles.faqList}>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>How does a deal work?</p>
            <p className={styles.faqAnswer}>
              Deals can be completed through a middleman or directly with the community owner. If a middleman is used, the applicable middleman service fee applies. Direct deals with the community owner do not require a middleman fee.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>What is Phynix Store?</p>
            <p className={styles.faqAnswer}>
              Phynix Store is a community where gamers trade smart, deal safely, and build their dream collection.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>Is buying an account safe?</p>
            <p className={styles.faqAnswer}>
              At Phynix Store, every deal prioritizes trust and security. Buy, sell, or trade accounts with proper precautions and enjoy more value without starting from zero.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>How does EMI work?</p>
            <p className={styles.faqAnswer}>
              Pay a fixed down payment upfront and clear the remaining balance within the agreed tenure. Account access and email-transfer terms will be explained before the deal. Full email access is provided only after all payments are completed.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>What is Revoke &amp; Lock?</p>
            <p className={styles.faqAnswer}>
              <span className={styles.faqAnswerLabel}>Revoke:</span> When the original creator recovers a sold account, the seller may offer a refund or replacement, depending on the deal terms.
              <br />
              <span className={styles.faqAnswerLabel}>Lock:</span> Riot may restrict access to an account for certain reasons. Refunds or replacements depend on the reason for the lock. Buyer-caused locks are generally not covered.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>Can I use PHP VP on an Indian account?</p>
            <p className={styles.faqAnswer}>
              No. PHP VP is region-locked to Filipino accounts and cannot be used on Indian-region accounts.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>Can I return an account I purchased?</p>
            <p className={styles.faqAnswer}>
              No. Purchased accounts are non-refundable. However, you may resell your account at a lower price.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>Can I become a seller?</p>
            <p className={styles.faqAnswer}>
              Yes. You need a valid ID and proof of account ownership to get started as a seller with Phynix Store.
            </p>
          </div>

          <div className={styles.faqItem}>
            <p className={styles.faqQuestion}>Does Phynix Store offer anything besides gaming accounts and coin/VP top-ups?</p>
            <p className={styles.faqAnswer}>
              Yes. Join our official community through the links in our Contact section to explore more services, deals, gaming-related offers, and giveaways.
            </p>
          </div>

        </div>
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
