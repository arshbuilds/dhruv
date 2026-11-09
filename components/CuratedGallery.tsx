"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface GalleryItem {
  id: string;
  frameNumber: string;
  title: string;
  category: "EDITORIAL" | "STUDIO";
  src: string;
  alt: string;
  aspect: "portrait" | "landscape";
  tag: string;
  hasRedBorder?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "noir-sanctuary",
    frameNumber: "01",
    title: "NOCTURNAL SANCTUARY",
    category: "EDITORIAL",
    src: "/images/gallery_noir.jpg",
    alt: "Dhruv Kanda — Nocturnal architectural sanctuary with glowing orbs",
    aspect: "portrait",
    tag: "0.721 // AMBIENT SPACE",
  },
  {
    id: "autotune-lab",
    frameNumber: "02",
    title: "VOCAL PROCESSING // AUTOTUNE PRO",
    category: "STUDIO",
    src: "/images/gallery_autotune.jpg",
    alt: "Studio workstation running Auto-Tune Pro vocal session with keyboard illumination",
    aspect: "landscape",
    tag: "432 HZ // VOCAL LAB",
    hasRedBorder: true,
  },
  {
    id: "studio-console",
    frameNumber: "03",
    title: "MIX ARCHITECTURE & CONSOLE",
    category: "STUDIO",
    src: "/images/gallery_studio_wide.jpg",
    alt: "FL Studio multi-track mixing console across dual-monitor workspace",
    aspect: "landscape",
    tag: "NEO-SOUL // DAW SESSION",
  },
  {
    id: "retrovibes-archive",
    frameNumber: "04",
    title: "TYPE 0.721 // RETRO VIBES",
    category: "EDITORIAL",
    src: "/images/retroVibes.jpeg",
    alt: "Dhruv Kanda — '95 Retro cyberpunk neon illuminated cityscape and tracklist",
    aspect: "landscape",
    tag: "0.721 // CITY ARCHIVE",
  },
];

export default function CuratedGallery() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "EDITORIAL" | "STUDIO">("ALL");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "ALL"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const nextImage = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
  }, [selectedItemIndex]);

  const prevImage = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [selectedItemIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, nextImage, prevImage]);

  return (
    <section id="visuals" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#e6202e] uppercase mb-3.5">
              {"// 03 // VISUALS"}
            </div>
            <h2 className="font-serif tracking-tight leading-none">
              <span className="text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#f1f5f9] mr-3">
                CURATED
              </span>
              <span className="text-4xl sm:text-5xl lg:text-[3.5rem] font-normal italic text-[#e6202e]">
                GALLERY.
              </span>
            </h2>
          </div>

          <p className="font-sans text-slate-400 text-xs md:text-[13px] leading-relaxed max-w-xs md:text-right">
            High-fashion photography, sound architecture, and behind-the-scenes studio sessions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {(["ALL", "STUDIO", "EDITORIAL"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[10px] tracking-[0.18em] px-3.5 py-1.5 rounded-[2px] transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border border-[#e6202e] bg-[#e6202e]/10 text-white font-medium"
                  : "border border-[#1f2438] bg-[#0c0e18]/60 text-slate-400 hover:text-white hover:border-[#2f3752]"
              }`}
            >
              {cat === "ALL" ? `ALL (${GALLERY_ITEMS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Bento Gallery Grid */}
        {activeCategory === "ALL" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Frame 01: Tall Architectural Sanctuary (Span 4 cols, 2 rows) */}
            <div
              onClick={() => openLightbox(0)}
              className="lg:col-span-4 border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] relative group hover:border-slate-400 transition-all cursor-pointer flex flex-col min-h-[460px] lg:min-h-[580px]"
            >
              <div className="relative h-full w-full overflow-hidden bg-black/50 rounded-[1px] min-h-[440px]">
                <Image
                  src={GALLERY_ITEMS[0].src}
                  alt={GALLERY_ITEMS[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-[2px]">
                  <span className="font-mono text-[8.5px] tracking-[0.2em] text-[#e6202e] uppercase font-semibold">
                    {GALLERY_ITEMS[0].tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-[2px]">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-slate-200 uppercase">
                    {`FRAME ${GALLERY_ITEMS[0].frameNumber} // ${GALLERY_ITEMS[0].title}`}
                  </span>
                  <span className="text-slate-400 text-xs group-hover:text-white group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side Stack: Frame 02 Top (Span 8 cols) + Frames 03 & 04 Bottom (4 cols each) */}
            <div className="lg:col-span-8 flex flex-col gap-6 justify-between">
              {/* Frame 02: Auto-Tune Pro Vocal Lab (with signature crimson border) */}
              <div
                onClick={() => openLightbox(1)}
                className="border border-[#751b25] bg-[#0c0e18] p-3 rounded-[2px] relative group hover:border-[#a82433] transition-all shadow-[0_0_20px_rgba(117,27,37,0.18)] cursor-pointer flex flex-col h-[275px]"
              >
                <div className="relative h-full w-full overflow-hidden bg-black/50 rounded-[1px]">
                  <Image
                    src={GALLERY_ITEMS[1].src}
                    alt={GALLERY_ITEMS[1].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-sm border border-[#751b25] px-2 py-0.5 rounded-[2px]">
                    <span className="font-mono text-[8.5px] tracking-[0.2em] text-[#e6202e] uppercase font-semibold">
                      {GALLERY_ITEMS[1].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border border-[#751b25] px-3 py-1.5 rounded-[2px]">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#e6202e] uppercase font-medium">
                      {`FRAME ${GALLERY_ITEMS[1].frameNumber} // ${GALLERY_ITEMS[1].title}`}
                    </span>
                    <span className="text-[#e6202e] text-xs group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Frame 03 and Frame 04 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[275px]">
                {/* Frame 03: Studio Console Wide */}
                <div
                  onClick={() => openLightbox(2)}
                  className="border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] relative group hover:border-slate-400 transition-all cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-full w-full overflow-hidden bg-black/50 rounded-[1px]">
                    <Image
                      src={GALLERY_ITEMS[2].src}
                      alt={GALLERY_ITEMS[2].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-[2px]">
                      <span className="font-mono text-[8.5px] tracking-[0.18em] text-slate-300 uppercase truncate">
                        {`FRAME ${GALLERY_ITEMS[2].frameNumber} // ${GALLERY_ITEMS[2].title}`}
                      </span>
                      <span className="text-slate-400 text-xs ml-1 shrink-0 group-hover:text-white transition-all">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>

                {/* Frame 04: Condenser Microphone Signal Capture */}
                <div
                  onClick={() => openLightbox(3)}
                  className="border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] relative group hover:border-slate-400 transition-all cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-full w-full overflow-hidden bg-black/50 rounded-[1px]">
                    <Image
                      src={GALLERY_ITEMS[3].src}
                      alt={GALLERY_ITEMS[3].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-[2px]">
                      <span className="font-mono text-[8.5px] tracking-[0.18em] text-slate-300 uppercase truncate">
                        {`FRAME ${GALLERY_ITEMS[3].frameNumber} // ${GALLERY_ITEMS[3].title}`}
                      </span>
                      <span className="text-slate-400 text-xs ml-1 shrink-0 group-hover:text-white transition-all">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Category Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const globalIdx = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(globalIdx)}
                  className={`border ${
                    item.hasRedBorder ? "border-[#751b25] bg-[#0c0e18]" : "border-[#1f2438] bg-[#0b0d18]"
                  } p-3 rounded-[2px] relative group hover:border-slate-400 transition-all cursor-pointer flex flex-col h-[320px]`}
                >
                  <div className="relative h-full w-full overflow-hidden bg-black/50 rounded-[1px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-[2px]">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-slate-200 uppercase truncate">
                        {`FRAME ${item.frameNumber} // ${item.title}`}
                      </span>
                      <span className="text-slate-400 text-xs group-hover:text-white transition-all">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Full-screen Modal */}
      {selectedItemIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10">
            <div className="flex items-center gap-3">
              <span className="text-[#e6202e] text-xs">✦</span>
              <span className="font-mono text-[10.5px] tracking-[0.25em] text-white uppercase">
                {`FRAME ${GALLERY_ITEMS[selectedItemIndex].frameNumber} // ${GALLERY_ITEMS[selectedItemIndex].title}`}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white border border-[#23293e] hover:border-white px-3.5 py-1.5 rounded-[2px] transition-all cursor-pointer"
            >
              CLOSE [ ✕ ]
            </button>
          </div>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 max-w-5xl w-full mx-auto my-4 flex items-center justify-center overflow-hidden"
          >
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={GALLERY_ITEMS[selectedItemIndex].src}
                alt={GALLERY_ITEMS[selectedItemIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 pt-2 border-t border-[#1a2034]/60"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#646d82]">
              {`INDEX ${selectedItemIndex + 1} OF ${GALLERY_ITEMS.length} — ${GALLERY_ITEMS[selectedItemIndex].tag}`}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevImage}
                className="font-mono text-[10px] tracking-[0.2em] text-slate-300 hover:text-white border border-[#23293e] hover:border-slate-400 px-3 py-1.5 rounded-[2px] transition-all cursor-pointer"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="font-mono text-[10px] tracking-[0.2em] text-slate-300 hover:text-white border border-[#23293e] hover:border-slate-400 px-3 py-1.5 rounded-[2px] transition-all cursor-pointer"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
