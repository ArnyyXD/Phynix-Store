export const ADMIN_EMAILS = [
  "arnyy328@gmail.com",
  "cyvexpro@gmail.com",
  "phynixstore1@gmail.com",
  ...(process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : []),
];

export function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
