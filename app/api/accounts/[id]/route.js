import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request, { params }) {
  const { id } = await params;

  const account = await prisma.gameAccount.findUnique({
    where: { id },
    include: {
      seller: { select: { name: true, email: true, kycStatus: true } },
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json(account);
}
