import { NextResponse } from "next/server";
import { and, lt, gt, ne, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { rooms } from "@/lib/data";
import { availabilitySchema } from "@/lib/validation";

/**
 * Real availability check against the bookings table.
 * Each room type has a fixed inventory (see src/lib/data.ts); availability =
 * inventory minus overlapping non-cancelled bookings.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = availabilitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const { checkIn, checkOut, guests, rooms: roomsWanted } = parsed.data;

    const results = await Promise.all(
      rooms.map(async (room) => {
        const [row] = await db
          .select({
            booked: sql<number>`coalesce(sum(${bookings.rooms}), 0)`.mapWith(Number),
          })
          .from(bookings)
          .where(
            and(
              eq(bookings.roomSlug, room.slug),
              ne(bookings.status, "cancelled"),
              lt(bookings.checkIn, checkOut),
              gt(bookings.checkOut, checkIn),
            ),
          );

        const remaining = Math.max(0, room.inventory - (row?.booked ?? 0));
        const fitsGuests = guests <= room.maxGuests * roomsWanted;

        return {
          slug: room.slug,
          name: room.name,
          pricePerNight: room.pricePerNight,
          remaining,
          available: remaining >= roomsWanted && fitsGuests,
          fitsGuests,
        };
      }),
    );

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("availability error", err);
    return NextResponse.json(
      { ok: false, error: "Unable to check availability right now. Please try again." },
      { status: 500 },
    );
  }
}
