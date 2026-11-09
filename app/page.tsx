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
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#182035]/30 via-[#0e1220]/15 to-transparent blur-3xl" />
        <div className="absolute top-[850px] right-0 w-[550px] h-[550px] bg-[#e6202e]/[0.025] blur-[150px]" />
        <div className="absolute top-[1700px] left-0 w-[550px] h-[550px] bg-[#162035]/[0.04] blur-[140px]" />
      </div>

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
