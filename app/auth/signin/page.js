"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";

// Flip this back to true once MSG91 (or another SMS provider) is actually
// live -- the phone OTP backend (app/api/otp/send, the "phone-otp"
// CredentialsProvider in lib/authOptions.js) is untouched and ready to go,
// this just hides it from the sign-in page in the meantime.
const PHONE_SIGNIN_ENABLED = false;

export default function SignInPage() {
  const router = useRouter();
  const [phase, setPhase] = useState("phone"); // "phone" | "otp"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function toE164(input) {
    const digits = input.replace(/\D/g, "");
    if (digits.length === 10) return `+91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
    return input;
  }

  async function handleSendOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formatted = toE164(phone);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formatted }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't send OTP. Try again.");
        return;
      }
      setPhone(formatted);
      setPhase("otp");
    } catch (err) {
      setError("Something went wrong sending the OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("phone-otp", {
        phone,
        otp,
        redirect: false,
      });
      if (result?.error) {
        setError("That code didn't match. Check it and try again.");
        return;
      }
      router.push("/");
    } catch (err) {
      setError("Something went wrong verifying the OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign in</h1>
        <p className={styles.subheading}>
          {PHONE_SIGNIN_ENABLED ? "Use Google, or your Indian phone number." : "Continue with your Google account."}
        </p>

        <button
          className={styles.googleBtn}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Continue with Google
        </button>

        {PHONE_SIGNIN_ENABLED && (
          <>
            <div className={styles.divider}>
              <span>or</span>
            </div>

            {phase === "phone" && (
              <form className={styles.form} onSubmit={handleSendOtp}>
                <label className={styles.field}>
                  <span className={styles.label}>Phone number</span>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {phase === "otp" && (
              <form className={styles.form} onSubmit={handleVerifyOtp}>
                <p className={styles.sentNote}>Code sent to {phone}</p>
                <label className={styles.field}>
                  <span className={styles.label}>Enter 6-digit code</span>
                  <input
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </label>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Verifying..." : "Verify & sign in"}
                </button>
                <button
                  type="button"
                  className={styles.backLink}
                  onClick={() => {
                    setPhase("phone");
                    setOtp("");
                    setError("");
                  }}
                >
                  Use a different number
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}