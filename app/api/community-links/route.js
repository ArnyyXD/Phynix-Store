import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { isAdminEmail } from "../../../lib/admin";
import prisma from "../../../lib/prisma";

// Seed defaults if none exist yet
const DEFAULTS = [
  { platform: "whatsapp",  displayName: "WhatsApp Community", url: "https://chat.whatsapp.com/DUyQQtffqHbLGJ6RhZqz4z?s=cl&p=a&mlu=4&ilr=4", enabled: true, order: 0 },
  { platform: "instagram", displayName: "Instagram Group",     url: "https://ig.me/j/AbanuoCl7IJRJryS/",                                enabled: true, order: 1 },
  { platform: "discord",   displayName: "Discord Server",     url: "https://discord.gg/vZVqpjZbjY",                                     enabled: true, order: 2 },
  { platform: "telegram",  displayName: "Telegram Group",     url: "https://t.me/phynixmarketplace",                                    enabled: true, order: 3 },
  { platform: "youtube",   displayName: "YouTube Channel",    url: "https://youtube.com/@teamphynix",                                   enabled: true, order: 4 },
  { platform: "facebook",  displayName: "Facebook Community", url: "",                                                                 enabled: false, order: 5 },
];

async function ensureDefaults() {
  const count = await prisma.communityLink.count();
  if (count === 0) {
    await prisma.communityLink.createMany({ data: DEFAULTS });
  }
}

// GET /api/community-links — public returns enabled; ?all=true for admin returns all
export async function GET(request) {
  try {
    await ensureDefaults();
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    let where = { enabled: true };
    if (showAll) {
      const session = await getServerSession(authOptions);
      if (session && isAdminEmail(session?.user?.email)) {
        where = {};
      }
    }

    const links = await prisma.communityLink.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(links);
  } catch (err) {
    console.error("GET /api/community-links error:", err);
    return NextResponse.json({ error: "Failed to fetch community links" }, { status: 500 });
  }
}

// POST /api/community-links — admin only, create new link
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { platform, displayName, url, enabled = true, order = 0 } = body;

    if (!platform || !displayName) {
      return NextResponse.json({ error: "platform and displayName are required" }, { status: 400 });
    }

    const link = await prisma.communityLink.create({
      data: { platform, displayName, url: url || "", enabled, order },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (err) {
    console.error("POST /api/community-links error:", err);
    return NextResponse.json({ error: "Failed to create community link" }, { status: 500 });
  }
}
