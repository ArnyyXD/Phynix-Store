import prisma from "../../lib/prisma";
import RentClient from "./RentClient";

export const dynamic = "force-dynamic";

export default async function RentPage() {
  let accounts = [];
  try {
    const rawAccounts = await prisma.gameAccount.findMany({
      where: {
        status: "live",
        listingType: "rent",
      },
      orderBy: { createdAt: "desc" },
      include: { seller: { select: { name: true, email: true } } },
    });
    accounts = JSON.parse(JSON.stringify(rawAccounts));
  } catch (e) {
    console.error("Failed to fetch rental accounts from DB:", e);
  }

  return <RentClient initialAccounts={accounts} />;
}
