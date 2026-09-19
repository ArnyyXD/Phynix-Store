// The middleman's WhatsApp number, in international format with no
// "+", spaces, or dashes -- that's the format wa.me links require.
export const MIDDLEMAN_WHATSAPP = "919948633426";

export function buildWhatsAppLink(message) {
  return `https://wa.me/${MIDDLEMAN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function sellerVerificationMessage({ id, title, game, rank }) {
  return (
    `Hi, I just listed a ${game} account on Phynix Store and need to complete verification.\n\n` +
    `Listing: ${title}\n` +
    `Rank/Tier: ${rank}\n` +
    `Listing ID: ${id}\n\n` +
    `Please let me know what you need from me to verify ownership.`
  );
}

export function buyerPurchaseMessage({ id, title, game, price }) {
  return (
    `Hi, I want to buy this ${game} account listed on Phynix Store.\n\n` +
    `Listing: ${title}\n` +
    `Price: \u20b9${price.toLocaleString("en-IN")}\n` +
    `Listing ID: ${id}\n\n` +
    `Please guide me through payment and next steps.`
  );
}
