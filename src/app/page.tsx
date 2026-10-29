import Hero from "@/components/Hero";
import BookingBar from "@/components/BookingBar";
import RoomsSection from "@/components/RoomsSection";
import BookingSection from "@/components/BookingSection";
import RestaurantSection from "@/components/RestaurantSection";
import ReservationSection from "@/components/ReservationSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OffersSection from "@/components/OffersSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-forest-950 pb-20">
        <BookingBar />
      </div>
      <RoomsSection />
      <BookingSection />
      <RestaurantSection />
      <ReservationSection />
      <ExperiencesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <OffersSection />
      <ContactSection />
    </>
  );
}
