import prisma from "../../lib/prisma";
import BuyClient from "./BuyClient";

export const dynamic = "force-dynamic";

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
