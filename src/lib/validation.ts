import { z } from "zod";

const dateStr = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please provide a valid date");

export const availabilitySchema = z
  .object({
    checkIn: dateStr,
    checkOut: dateStr,
    guests: z.coerce.number().int().min(1, "At least one guest").max(12),
    rooms: z.coerce.number().int().min(1).max(5),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export const bookingSchema = z
  .object({
    roomSlug: z.string().min(1, "Please choose a room"),
    checkIn: dateStr,
    checkOut: dateStr,
    guests: z.coerce.number().int().min(1, "At least one guest").max(12),
    rooms: z.coerce.number().int().min(1).max(5),
    guestName: z.string().trim().min(2, "Please enter your full name").max(160),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().min(7, "Please enter a valid phone number").max(40),
    specialRequests: z.string().trim().max(2000).optional().or(z.literal("")),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export const reservationSchema = z.object({
  date: dateStr,
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a time"),
  guests: z.coerce.number().int().min(1, "At least one guest").max(20),
  guestName: z.string().trim().min(2, "Please enter your full name").max(160),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(40),
  occasion: z.string().trim().max(64).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(160),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(2, "Please add a subject").max(200),
  message: z.string().trim().min(10, "Please write a few words").max(4000),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function makeConfirmationCode(prefix: string): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${code}`;
}
