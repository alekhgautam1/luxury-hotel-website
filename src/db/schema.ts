import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Room booking requests.
 * NOTE: This stores booking *requests* with status "pending".
 * Integration point: connect a PMS / payment gateway (e.g. Stripe, Opera PMS)
 * in src/app/api/bookings/route.ts to confirm bookings and take payment.
 */
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  confirmationCode: varchar("confirmation_code", { length: 16 }).notNull(),
  roomSlug: varchar("room_slug", { length: 64 }).notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  guests: integer("guests").notNull(),
  rooms: integer("rooms").notNull().default(1),
  guestName: varchar("guest_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  specialRequests: text("special_requests"),
  status: varchar("status", { length: 24 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Restaurant table reservation requests (status "pending" until the
 * reservations team confirms — integration point for SevenRooms / OpenTable).
 */
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  confirmationCode: varchar("confirmation_code", { length: 16 }).notNull(),
  reservationDate: date("reservation_date").notNull(),
  reservationTime: varchar("reservation_time", { length: 8 }).notNull(),
  guests: integer("guests").notNull(),
  guestName: varchar("guest_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  occasion: varchar("occasion", { length: 64 }),
  notes: text("notes"),
  status: varchar("status", { length: 24 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
