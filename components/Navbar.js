"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/policies/payment-security", label: "Payment Security" },
  { href: "/policies/privacy-refund", label: "Privacy & Refunds" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Phynix Store"
            width={34}
            height={34}
            className={styles.logoMark}
            priority
          />
          PHYNIX<span className={styles.logoAccent}>STORE</span>
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={
                pathname === link.href ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.rightGroup}>
          <div className={styles.actions}>
            {status === "authenticated" ? (
              <div className={styles.userBox}>
                <div className={styles.avatarWrap}>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user?.name || "Account"}
                      width={32}
                      height={32}
                      className={styles.avatar}
                    />
                  ) : (
                    <span className={styles.avatarFallback}>
                      {(session.user?.name || session.user?.email || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userLabel}>Signed in</span>
                  <span className={styles.userName}>
                    {session.user?.name || session.user?.email || "Account"}
                  </span>
                </div>
                <button
                  className={styles.signOut}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className={styles.signIn}>
                Sign in
              </Link>
            )}
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
