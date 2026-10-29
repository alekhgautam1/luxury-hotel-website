import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { newsletterSchema } from "@/lib/validation";

/**
 * Stores newsletter subscribers in the local database.
 * INTEGRATION POINT: forward the email to your ESP (Mailchimp, Klaviyo,
 * Resend Audiences, …) here for real campaign delivery.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 },
      );
    }

    await db
      .insert(newsletterSubscribers)
      .values({ email: parsed.data.email.toLowerCase() })
      .onConflictDoNothing();

    return NextResponse.json({
      ok: true,
      message: "Welcome to the Maison. You are on the list.",
    });
  } catch (err) {
    console.error("newsletter error", err);
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 500 },
    );
  }
}
