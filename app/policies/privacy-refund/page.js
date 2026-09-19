import styles from "../policy.module.css";

export default function PrivacyRefundPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Privacy &amp; Refund Policy</h1>
      <p className={styles.updated}>Last updated: [DATE] · Applies to all users of Phynix Store</p>

      <div className={styles.notice}>
        This template is written to align with India's Digital Personal Data
        Protection Act, 2023 (DPDP Act) and general e-commerce/consumer
        protection practice, but it is not legal advice. Have an actual
        lawyer review it — particularly the Grievance Officer appointment and
        the refund terms — before you publish it live and start collecting
        payments from real users.
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Who this policy covers</h2>
        <p className={styles.body}>
          Phynix Store ("we", "us", "the platform") operates this
          website to connect buyers and sellers of Valorant game accounts. As
          the entity that decides why and how your personal data is
          processed, we act as the "Data Fiduciary" under the DPDP Act, 2023.
          By creating an account or using the platform, you ("Data
          Principal") agree to the practices described here.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. What data we collect</h2>
        <ul className={styles.list}>
          <li>
            <strong>Account information:</strong> name, email address, and/or
            phone number, collected when you sign in with Google or via
            phone OTP.
          </li>
          <li>
            <strong>Listing details:</strong> rank, level, skin names,
            region, and price, when you create a listing as a seller.
          </li>
          <li>
            <strong>Payout information:</strong> UPI ID and WhatsApp number,
            collected from sellers so buyers can complete a purchase.
          </li>
          <li>
            <strong>Identity verification data:</strong> where a listing or
            transaction is flagged for manual review, we may ask a seller for
            the original email used to create the Valorant account, or a
            government-issued ID, to confirm ownership and reduce fraud. This
            is collected only for that specific review and is not required
            to browse the platform.
          </li>
          <li>
            <strong>Usage data:</strong> IP address, browser type, and pages
            visited, collected automatically for security and analytics.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Why we collect it</h2>
        <p className={styles.body}>
          We only use personal data for purposes you'd reasonably expect from
          using a marketplace: creating and authenticating your account,
          displaying your listing to buyers, enabling payment between buyer
          and seller, verifying ownership when fraud risk is flagged, and
          resolving disputes. We do not sell personal data to third parties.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Government ID &amp; account-credential handling</h2>
        <p className={styles.body}>
          Because this platform involves a real fraud risk in both
          directions, some transactions require extra verification. If you
          submit a government ID or original account email for this purpose:
        </p>
        <ul className={styles.list}>
          <li>
            It is used only to confirm you're the legitimate account owner or
            payment recipient — never for marketing or shared with any party
            outside the specific dispute or verification it relates to.
          </li>
          <li>
            Wherever possible, verification is handled through a third-party
            KYC provider that confirms a match without us permanently storing
            the document image.
          </li>
          <li>
            Any ID or credential data we do retain is deleted once the
            transaction or dispute it relates to is closed, and no later than
            [RETENTION PERIOD, e.g. 90 days] afterward.
          </li>
          <li>
            You can ask us to confirm what identity data we hold about you
            and request its erasure at any time, subject to any ongoing
            dispute it's tied to (see Section 7).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Data retention</h2>
        <p className={styles.body}>
          Account and listing data is retained for as long as your account is
          active. If you delete your account, we remove personal data within
          [PERIOD, e.g. 30 days], except where we're required to keep records
          for legal, tax, or fraud-prevention purposes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Sharing with third parties</h2>
        <p className={styles.body}>
          We share data only with service providers who help us run the
          platform — for example, a hosting provider, an SMS/OTP provider for
          phone sign-in, Google (for Google Sign-In), and, where used, a
          third-party identity-verification service. Each is bound to use
          your data only to provide that service to us.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Your rights &amp; grievance redressal</h2>
        <p className={styles.body}>
          Under the DPDP Act, you have the right to access the personal data
          we hold about you, request correction of inaccurate data, request
          erasure, and withdraw consent at any time (withdrawal doesn't
          affect anything processed before that point). To exercise any of
          these rights or raise a complaint, contact our Grievance Officer:
        </p>
        <div className={styles.contactBox}>
          <strong>Grievance Officer:</strong> [NAME]
          <br />
          <strong>Email:</strong> grievance@phynixstore.com
          <br />
          <strong>Phone / WhatsApp:</strong> +91 99486 33426
          <br />
          <strong>Address:</strong> [REGISTERED BUSINESS ADDRESS]
          <br />
          <strong>Response time:</strong> Within 1 hour, available 24/7.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Age restriction</h2>
        <p className={styles.body}>
          This platform is intended for users 18 years or older. We do not
          knowingly collect data from minors. If you believe a minor has
          created an account, contact the Grievance Officer above so we can
          remove it.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Security</h2>
        <p className={styles.body}>
          We use reasonable technical safeguards — encrypted connections,
          access controls on our database, and hashed/tokenized
          authentication — to protect your data. No system is perfectly
          secure, and we'll notify affected users if we become aware of a
          breach involving their data, as required under applicable law.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Refund Policy</h2>
        <p className={styles.body}>
          Because a purchased Valorant account can be actioned by Riot Games
          at any time (this is a real risk of account trading — see the{" "}
          <a href="/policies/payment-security">Payment Security</a> page), refunds are
          handled as follows:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Ban within the protection window:</strong> if a purchased
            account is banned or suspended within [WINDOW, e.g. 7 days] of
            handover, and the buyer has not changed the account's original
            email/password, the buyer is eligible for a full or partial
            refund at our discretion, pending review.
          </li>
          <li>
            <strong>After the buyer changes credentials:</strong> once a
            buyer changes the account's email, password, or linked phone
            number, we can no longer verify what happened to the account, and
            it is no longer eligible for a refund.
          </li>
          <li>
            <strong>Misrepresented listings:</strong> if a listing's rank,
            skins, or level materially don't match what was delivered, the
            buyer can open a dispute within [WINDOW, e.g. 48 hours] of
            handover for a refund or partial refund.
          </li>
          <li>
            <strong>How refunds are processed:</strong> approved refunds are
            returned to the original UPI payment method within [PERIOD, e.g.
            5–7 business days].
          </li>
          <li>
            <strong>Disputes:</strong> contact us through the{" "}
            <a href="/contact">Contact &amp; disputes</a> page. Our middleman/
            support contact will review chat logs, payment proof, and account
            access to make a determination.
          </li>
        </ul>
        <p className={styles.body}>
          Refunds are not guaranteed in every case — this policy sets out
          when a refund is available, not an unconditional right to one for
          every trade outcome.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>11. Changes to this policy</h2>
        <p className={styles.body}>
          We'll post any material changes to this page with an updated date
          at the top. Continued use of the platform after a change means you
          accept the revised policy.
        </p>
      </section>
    </div>
  );
}
