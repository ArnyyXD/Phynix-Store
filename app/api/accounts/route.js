import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import prisma from "../../../lib/prisma";

const REQUIRED_FIELDS = ["game", "rank", "skinNames", "price", "listingType"];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const listingType = searchParams.get("listingType");
  const game = searchParams.get("game");
  const q = searchParams.get("q");

  const where = {
    status: "live",
    ...(listingType ? { listingType } : {}),
    ...(game ? { game } : {}),
    ...(minPrice || maxPrice
      ? {
          price: {
            ...(minPrice ? { gte: Number(minPrice) } : {}),
            ...(maxPrice ? { lte: Number(maxPrice) } : {}),
          },
        }
      : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { rank: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const accounts = await prisma.gameAccount.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      seller: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json(accounts);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You need to sign in before listing an account." },
      { status: 401 }
    );
  }

  const body = await request.json();

  for (const field of REQUIRED_FIELDS) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === "" ||
      (Array.isArray(body[field]) && body[field].length === 0)
    ) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const account = await prisma.gameAccount.create({
    data: {
      sellerId: session.user.id,
      title: body.title || `${body.rank} account — ${body.skinNames.length} items`,
      game: body.game,
      rank: body.rank,
      level: body.level ? Number(body.level) : null,
      skinNames: body.skinNames,
      agentsUnlocked: body.agentsUnlocked || null,
      region: body.region || "India",
      listingType: body.listingType,
      price: Number(body.price),
      rentPeriodDays: body.rentPeriodDays ? Number(body.rentPeriodDays) : null,
      emiMonths: body.emiMonths ? Number(body.emiMonths) : null,
      description: body.description || null,
      images: Array.isArray(body.images) ? body.images : [],
      status: "live", // auto-live; add manual review step later if needed
    },
  });

  return NextResponse.json(account, { status: 201 });
}
