import prisma from "../../lib/prisma";
import styles from "./contact.module.css";

export const revalidate = 0;

// Platform icon + colour config
const PLATFORM_CONFIG = {
  whatsapp: {
    label: "WhatsApp",
    gradient: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    border: "rgba(37,211,102,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  discord: {
    label: "Discord",
    gradient: "linear-gradient(135deg, #5865F2 0%, #3b44c4 100%)",
    border: "rgba(88,101,242,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  },
  telegram: {
    label: "Telegram",
    gradient: "linear-gradient(135deg, #229ED9 0%, #1a7fad 100%)",
    border: "rgba(34,158,217,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    gradient: "linear-gradient(135deg, #1877F2 0%, #0d5dbf 100%)",
    border: "rgba(24,119,242,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    gradient: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    border: "rgba(253,29,29,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  youtube: {
    gradient: "linear-gradient(135deg, #FF0000 0%, #c40000 100%)",
    border: "rgba(255,0,0,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.platformIcon}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
};

// Social dock icons — always visible (for the dock at the bottom of the page)
const DOCK_ICONS = {
  whatsapp: {
    gradient: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    border: "rgba(37,211,102,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  instagram: {
    gradient: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    border: "rgba(253,29,29,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  facebook: {
    gradient: "linear-gradient(135deg, #1877F2 0%, #0d5dbf 100%)",
    border: "rgba(24,119,242,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  telegram: {
    gradient: "linear-gradient(135deg, #229ED9 0%, #1a7fad 100%)",
    border: "rgba(34,158,217,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  discord: {
    gradient: "linear-gradient(135deg, #5865F2 0%, #3b44c4 100%)",
    border: "rgba(88,101,242,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  },
  youtube: {
    gradient: "linear-gradient(135deg, #FF0000 0%, #c40000 100%)",
    border: "rgba(255,0,0,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: "#fff" }}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
};

// Social dock links with official URLs
const SOCIAL_DOCK = [
  { platform: "whatsapp", label: "WhatsApp", href: "https://chat.whatsapp.com/DUyQQtffqHbLGJ6RhZqz4z?s=cl&p=a&mlu=4&ilr=4" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/phynix.store" },
  { platform: "youtube", label: "YouTube", href: "https://youtube.com/@teamphynix" },
  { platform: "telegram", label: "Telegram", href: "https://t.me/phynixmarketplace" },
  { platform: "discord", label: "Discord", href: "https://discord.gg/vZVqpjZbjY" },
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/share/g/1DTqQe453U/" },
];

export default async function ContactPage() {
  let communityLinks = [];
  try {
    communityLinks = await prisma.communityLink.findMany({
      where: { enabled: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Failed to load community links:", err);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact &amp; Support</h1>
      <p className={styles.updated}>
        For trade queries, order assistance, community links, and support.
      </p>

      {/* ── General Support ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General Support</h2>
        <p className={styles.body}>
          For anything — active trade assistance, payment questions, listing
          help, account inquiries, or feedback. Reach us any time and we&apos;ll
          respond within 1 hour.
        </p>
        <div className={styles.supportGrid}>
          {/* WhatsApp Priority 1 */}
          <a
            href="https://wa.me/919337974799?text=Hi%2C%20I%20need%20help%20with%20Phynix%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportCard}
          >
            <div
              className={styles.supportCardIcon}
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.supportIcon}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className={styles.supportCardBody}>
              <span className={styles.supportCardTitle}>WhatsApp Priority</span>
              <span className={styles.supportCardSub}>+91 93379 74799</span>
            </div>
            <span className={styles.supportCardArrow}>↗</span>
          </a>

          {/* WhatsApp Priority 2 */}
          <a
            href="https://wa.me/917673929141?text=Hi%2C%20I%20need%20help%20with%20Phynix%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportCard}
          >
            <div
              className={styles.supportCardIcon}
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.supportIcon}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className={styles.supportCardBody}>
              <span className={styles.supportCardTitle}>WhatsApp Priority</span>
              <span className={styles.supportCardSub}>+91 76739 29141</span>
            </div>
            <span className={styles.supportCardArrow}>↗</span>
          </a>

          {/* Email Support 1 */}
          <a
            href="mailto:phynixstore1@gmail.com?subject=Support%20Inquiry%20-%20Phynix%20Store"
            className={styles.supportCard}
          >
            <div
              className={styles.supportCardIcon}
              style={{ background: "linear-gradient(135deg, #E63960 0%, #7A1030 100%)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.supportIcon}>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className={styles.supportCardBody}>
              <span className={styles.supportCardTitle}>Email Support</span>
              <span className={styles.supportCardSub}>phynixstore1@gmail.com</span>
            </div>
            <span className={styles.supportCardArrow}>↗</span>
          </a>

          {/* Response time info */}
          <div className={styles.infoCard}>
            <div
              className={styles.supportCardIcon}
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.35)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.supportIcon}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className={styles.supportCardBody}>
              <span className={styles.supportCardTitle}>Response Time</span>
              <span className={styles.supportCardSub}>Within 1 hour · 24/7 Fast Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Links ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Community Links</h2>
        <p className={styles.body}>
          Join our communities for updates, trade alerts, and direct interaction.
        </p>

        {communityLinks.length === 0 ? (
          <div className={styles.communityLoading}>No communities available yet.</div>
        ) : (
          <div className={styles.communityGrid}>
            {communityLinks.map((link) => {
              const config = PLATFORM_CONFIG[link.platform] || PLATFORM_CONFIG.discord;
              return (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityCard}
                  style={{ "--card-border": config.border }}
                >
                  <div
                    className={styles.communityCardIcon}
                    style={{ background: config.gradient, boxShadow: `0 4px 16px ${config.border}` }}
                  >
                    {config.icon}
                  </div>
                  <div className={styles.communityCardBody}>
                    <span className={styles.communityCardTitle}>{link.displayName}</span>
                    <span className={styles.communityCardPlatform}>
                      {config.label}
                    </span>
                  </div>
                  <span className={styles.communityCardArrow}>↗</span>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Data & Privacy ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data &amp; privacy grievances</h2>
        <p className={styles.body}>
          For requests related to your personal data (access, correction,
          erasure) or a formal privacy complaint, contact our Grievance Officer
          directly.
        </p>
        <div className={styles.grievanceAction}>
          <a
            href="mailto:phynixstore1@gmail.com?subject=Data%20%26%20Privacy%20Grievance%20-%20Phynix%20Store"
            className={styles.grievanceBtn}
          >
            <div className={styles.grievanceIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className={styles.grievanceText}>
              <span className={styles.grievanceTitle}>Email Grievance Officer</span>
              <span className={styles.grievanceSub}>phynixstore1@gmail.com</span>
            </div>
            <span className={styles.grievanceArrow}>↗</span>
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=phynixstore1@gmail.com&su=Data%20%26%20Privacy%20Grievance%20-%20Phynix%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.gmailWebLink}
            title="Open compose window in Gmail Web"
          >
            Open in Gmail Web ↗
          </a>
        </div>
      </section>

      {/* ── Social Links ── */}
      <section className={`${styles.section} ${styles.socialSection}`}>
        <h2 className={styles.sectionTitleCenter}>Find Us On</h2>
        <p className={styles.bodyCenter}>Connect with Phynix Store across all our social platforms.</p>

        <div className={styles.socialLinksWrap}>
          {SOCIAL_DOCK.map(({ platform, label, href }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialPill}
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
