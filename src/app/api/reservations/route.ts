import { NextResponse } from "next/server";
import { db } from "@/db";
import { reservations } from "@/db/schema";
import { makeConfirmationCode, reservationSchema, todayISO } from "@/lib/validation";

/**
 * Creates a restaurant reservation REQUEST (status: "pending").
 * INTEGRATION POINT: connect SevenRooms / OpenTable / your table-management
 * system here to confirm tables in real time.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (data.date < todayISO()) {
      return NextResponse.json(
        { ok: false, error: "Reservation date cannot be in the past." },
        { status: 400 },
      );
    }

    const confirmationCode = makeConfirmationCode("RT");
    const [created] = await db
      .insert(reservations)
      .values({
        confirmationCode,
        reservationDate: data.date,
        reservationTime: data.time,
        guests: data.guests,
        guestName: data.guestName,
        email: data.email,
        phone: data.phone,
        occasion: data.occasion || null,
        notes: data.notes || null,
        status: "pending",
      })
      .returning({ id: reservations.id });

    return NextResponse.json({
      ok: true,
      confirmationCode,
      reservationId: created.id,
      status: "pending",
      message:
        "Your table request has been received. Our maître d' will confirm by email or phone shortly.",
    });
  } catch (err) {
    console.error("reservation error", err);
    return NextResponse.json(
      { ok: false, error: "We could not process your reservation. Please try again." },
      { status: 500 },
    );
  }
}
