import prisma from "../../lib/prisma";
import BuyClient from "./BuyClient";

// Revalidate every 30 seconds so Vercel caches responses at edge (eliminates 2-4s Neon cold start lag)
export const revalidate = 30;

export default async function BuyPage() {
  let accounts = [];
  try {
    const rawAccounts = await prisma.gameAccount.findMany({
      where: { status: "live" },
      orderBy: { createdAt: "desc" },
      include: { seller: { select: { name: true, email: true } } },
    });
    accounts = JSON.parse(JSON.stringify(rawAccounts));
  } catch (e) {
    console.error("Failed to fetch accounts from DB:", e);
  }

  return <BuyClient initialAccounts={accounts} />;
}
