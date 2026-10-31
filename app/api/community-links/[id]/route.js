import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { isAdminEmail } from "../../../../lib/admin";
import prisma from "../../../../lib/prisma";

// PATCH /api/community-links/[id] — admin only, update a link
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { platform, displayName, url, enabled, order } = body;

    const updated = await prisma.communityLink.update({
      where: { id },
      data: {
        ...(platform !== undefined && { platform }),
        ...(displayName !== undefined && { displayName }),
        ...(url !== undefined && { url }),
        ...(enabled !== undefined && { enabled }),
        ...(order !== undefined && { order }),
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/community-links/[id] error:", err);
    return NextResponse.json({ error: "Failed to update community link" }, { status: 500 });
  }
}

// DELETE /api/community-links/[id] — admin only, remove a link
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = params;
    await prisma.communityLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/community-links/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete community link" }, { status: 500 });
  }
}
