import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Royale — Luxury Hotel & Fine-Dining Restaurant",
    template: "%s · Maison Royale",
  },
  description:
    "An extraordinary stay. An unforgettable taste. Discover exceptional hospitality, exquisite dining and timeless luxury at Maison Royale Hotel & Restaurant.",
  keywords: [
    "luxury hotel",
    "fine dining restaurant",
    "five star hotel",
    "suites",
    "Maison Royale",
  ],
  openGraph: {
    title: "Maison Royale — Luxury Hotel & Fine-Dining Restaurant",
    description:
      "Exceptional hospitality, exquisite dining and timeless luxury in the heart of the city.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Maison Royale Hotel & Restaurant",
  description:
    "Luxury hotel and fine-dining restaurant offering suites, signature experiences and a celebrated kitchen.",
  telephone: "+1-212-555-0188",
  email: "reservations@maisonroyale.example",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Crown Avenue, Mayfair District",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10021",
    addressCountry: "US",
  },
  starRating: { "@type": "Rating", ratingValue: "5" },
  containsPlace: {
    "@type": "Restaurant",
    name: "Le Jardin Doré",
    servesCuisine: ["Indian", "Continental", "Asian", "Fusion"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-forest-950 font-sans text-ivory-50 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
