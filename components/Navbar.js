"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { isAdminEmail } from "../lib/admin";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = status === "authenticated" && isAdminEmail(session?.user?.email);

  const navLinks = isAdmin
    ? [...LINKS, { href: "/admin", label: "Admin Panel" }]
    : LINKS;

  // Close mobile menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} prefetch={true}>
          <Image
            src="/logo.png"
            alt="Phynix Store"
            width={34}
            height={34}
            className={styles.logoMark}
            priority
          />
          PHYNIX <span className={styles.logoAccent}>STORE</span>
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
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
                      width={34}
                      height={34}
                      className={styles.avatar}
                    />
                  ) : (
                    <span className={styles.avatarFallback}>
                      {(session.user?.name || session.user?.email || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                  <span className={styles.onlineDot} title="Online" />
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {session.user?.name || "Player"}
                  </span>
                  <span className={styles.userEmail}>
                    {session.user?.email || "Google Account"}
                  </span>
                </div>
                <button
                  className={styles.signOut}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <svg
                    className={styles.signOutIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className={styles.signOutText}>Sign out</span>
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className={styles.signIn} prefetch={true}>
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
