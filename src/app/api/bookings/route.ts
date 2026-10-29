import { NextResponse } from "next/server";
import { and, lt, gt, ne, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { rooms } from "@/lib/data";
import { bookingSchema, makeConfirmationCode, todayISO } from "@/lib/validation";

/**
 * Creates a room booking REQUEST (status: "pending").
 * INTEGRATION POINT: to confirm bookings in real time, connect your PMS /
 * channel manager and a payment provider (e.g. Stripe) here, then set
 * status to "confirmed" after successful payment.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const room = rooms.find((r) => r.slug === data.roomSlug);
    if (!room) {
      return NextResponse.json({ ok: false, error: "Unknown room type." }, { status: 400 });
    }
    if (data.checkIn < todayISO()) {
      return NextResponse.json(
        { ok: false, error: "Check-in date cannot be in the past." },
        { status: 400 },
      );
    }
    if (data.guests > room.maxGuests * data.rooms) {
      return NextResponse.json(
        {
          ok: false,
          error: `${room.name} accommodates up to ${room.maxGuests} guests per room. Please add rooms or choose a larger suite.`,
        },
        { status: 400 },
      );
    }

    // Re-verify live availability before accepting the request.
    const [row] = await db
      .select({ booked: sql<number>`coalesce(sum(${bookings.rooms}), 0)`.mapWith(Number) })
      .from(bookings)
      .where(
        and(
          eq(bookings.roomSlug, room.slug),
          ne(bookings.status, "cancelled"),
          lt(bookings.checkIn, data.checkOut),
          gt(bookings.checkOut, data.checkIn),
        ),
      );
    const remaining = Math.max(0, room.inventory - (row?.booked ?? 0));
    if (remaining < data.rooms) {
      return NextResponse.json(
        {
          ok: false,
          error: `We are sorry — only ${remaining} ${room.name}${remaining === 1 ? "" : "s"} remain${remaining === 1 ? "s" : ""} for those dates.`,
        },
        { status: 409 },
      );
    }

    const confirmationCode = makeConfirmationCode("MR");
    const nights = Math.round(
      (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / 86400000,
    );

    const [created] = await db
      .insert(bookings)
      .values({
        confirmationCode,
        roomSlug: data.roomSlug,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        rooms: data.rooms,
        guestName: data.guestName,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || null,
        status: "pending",
      })
      .returning({ id: bookings.id });

    return NextResponse.json({
      ok: true,
      confirmationCode,
      bookingId: created.id,
      status: "pending",
      nights,
      estimatedTotal: nights * room.pricePerNight * data.rooms,
      message:
        "Your booking request has been received. Our reservations team will confirm by email within 2 hours. No payment has been taken.",
    });
  } catch (err) {
    console.error("booking error", err);
    return NextResponse.json(
      { ok: false, error: "We could not process your request. Please try again." },
      { status: 500 },
    );
  }
}
