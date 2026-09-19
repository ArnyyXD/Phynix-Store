import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// Triggered on a schedule (see vercel.json) to clear out OTP codes that
// have expired -- they're useless after 5 minutes and there's no reason
// to keep piling them up in the database.
//
// Protected by CRON_SECRET so randoms on the internet can't spam-trigger
// deletes. Vercel Cron automatically sends this as a Bearer token; if
// you're using an external scheduler (e.g. cron-job.org) instead, add
// "Authorization: Bearer <CRON_SECRET>" as a custom header there.
export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const deletedOtps = await prisma.otpCode.deleteMany({
    where: { expiresAt: { lt: now } },
  });

  return NextResponse.json({
    ok: true,
    deletedOtps: deletedOtps.count,
    ranAt: now.toISOString(),
  });
}
