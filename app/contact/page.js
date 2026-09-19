import styles from "../policies/policy.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact &amp; Disputes</h1>
      <p className={styles.updated}>For in-progress trade issues, general questions, and grievances.</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Emergency / active trade dispute</h2>
        <p className={styles.body}>
          If a trade is in progress and something looks wrong — payment sent
          with no account access, account details not matching the listing —
          contact us immediately with your listing ID and payment
          confirmation ready to share.
        </p>
        <div className={styles.contactBox}>
          <strong>WhatsApp (priority):</strong> +91 99486 33426
          <br />
          <strong>Email:</strong> [support@phynixstore.com]
          <br />
          <strong>Hours:</strong> Available 24/7
          <br />
          <strong>Typical response time:</strong> Within 1 hour
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General support</h2>
        <p className={styles.body}>
          For anything that isn't an active dispute — listing questions,
          account help, feedback — reach out any time and we'll get back
          within 1 hour.
        </p>
        <div className={styles.contactBox}>
          <strong>Phone / WhatsApp:</strong> +91 99486 33426
          <br />
          <strong>Email:</strong> [help@phynixstore.com]
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data &amp; privacy grievances</h2>
        <p className={styles.body}>
          For requests related to your personal data (access, correction,
          erasure) or a formal privacy complaint, contact our Grievance
          Officer directly — details are in the{" "}
          <a href="/policies/privacy-refund">Privacy &amp; Refund Policy</a>.
        </p>
      </section>
    </div>
  );
}
