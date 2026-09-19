import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

const INDIA_PHONE_REGEX = /^\+91[6-9]\d{9}$/;

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6 digits
}

// Swap this out for a real SMS provider once you have an account with one
// (MSG91 and 2Factor are common India-focused choices; Twilio also works
// but is pricier for Indian numbers). Keep the OTP row logic as-is —
// only this function needs to change.
async function sendSms(phone, code) {
  if (process.env.SMS_PROVIDER_API_KEY) {
    // TODO: replace with an actual fetch() call to your SMS provider's API
    // e.g. MSG91: https://docs.msg91.com/otp/send-otp
    console.log(`[sendSms] Would send "${code}" to ${phone} via real provider`);
  } else {
    // Dev fallback: no SMS provider configured, so just log it.
    console.log(`[sendSms] DEV MODE — OTP for ${phone} is ${code}`);
  }
}

export async function POST(request) {
  const body = await request.json();
  const phone = (body?.phone || "").trim();

  if (!INDIA_PHONE_REGEX.test(phone)) {
    return NextResponse.json(
      { error: "Enter a valid Indian phone number in the form +91XXXXXXXXXX" },
      { status: 400 }
    );
  }

  // Basic throttle: don't allow more than one active code per phone.
  const recentCode = await prisma.otpCode.findFirst({
    where: { phone, consumed: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (recentCode) {
    const secondsLeft = Math.ceil((recentCode.expiresAt - new Date()) / 1000);
    if (secondsLeft > 240) {
      // still within first minute of a 5-min window — block resend spam
      return NextResponse.json(
        { error: "An OTP was already sent. Please wait a moment before retrying." },
        { status: 429 }
      );
    }
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await prisma.otpCode.create({
    data: { phone, code, expiresAt },
  });

  await sendSms(phone, code);

  return NextResponse.json({ ok: true });
}
