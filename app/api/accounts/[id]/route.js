import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import prisma from "../../../../lib/prisma";
import { isAdminEmail } from "../../../../lib/admin";

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

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const account = await prisma.gameAccount.findUnique({ where: { id } });
  if (!account) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const isOwner = account.sellerId === session.user.id;
  const isAdmin = isAdminEmail(session.user.email);

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { error: "Forbidden: Admin access required to delete listings." },
      { status: 403 }
    );
  }

  await prisma.gameAccount.delete({ where: { id } });

  return NextResponse.json({ success: true, id });
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const account = await prisma.gameAccount.findUnique({ where: { id } });
  if (!account) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const isOwner = account.sellerId === session.user.id;
  const isAdmin = isAdminEmail(session.user.email);

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { error: "Forbidden: Admin access required." },
      { status: 403 }
    );
  }

  const updated = await prisma.gameAccount.update({
    where: { id },
    data: {
      ...(body.status ? { status: body.status } : {}),
    },
  });

  return NextResponse.json(updated);
}

