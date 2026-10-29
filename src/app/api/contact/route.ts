import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    await db.insert(contactMessages).values(parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Thank you — your message has been received. Our team replies within one business day.",
    });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json(
      { ok: false, error: "Your message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
