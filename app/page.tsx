import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArtistStatement from "@/components/ArtistStatement";
import SoundArchive from "@/components/SoundArchive";
import CuratedGallery from "@/components/CuratedGallery";
import FAQ from "@/components/FAQ";
import Inquiries from "@/components/Inquiries";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080a12] text-slate-200 relative selection:bg-[#e6202e] selection:text-white">
      {/* Background ambient lighting — lightweight radial gradients instead of GPU-heavy full-viewport CSS blurs */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 650px 320px at 50% 60px, rgba(24, 32, 53, 0.28), rgba(14, 18, 32, 0.1) 55%, transparent 80%), radial-gradient(circle 340px at 100% 1050px, rgba(230, 32, 46, 0.03), transparent 75%), radial-gradient(circle 340px at 0% 1900px, rgba(22, 32, 53, 0.045), transparent 75%)",
        }}
      />

      {/* Modular Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <Hero />
        <ArtistStatement />
        <SoundArchive />
        <CuratedGallery />
        <FAQ />
        <Inquiries />
      </main>

      {/* Modular Footer */}
      <Footer />
    </div>
  );
}
