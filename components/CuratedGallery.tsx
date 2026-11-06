import Image from "next/image";

export default function CuratedGallery() {
  return (
    <section id="visuals" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
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
            High-fashion photography, stage aesthetics, and behind-the-scenes imagery.
          </p>
        </div>

        {/* Visuals Frames */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Frame 01: Left Microphone */}
          <div className="md:col-span-4 border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] relative group hover:border-slate-500 transition-colors flex flex-col">
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[350px] w-full overflow-hidden bg-black/40">
              <Image
                src="/images/mic.png"
                alt="Frame 01 Microphone"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-[2px]">
                <span className="font-mono text-[9px] tracking-[0.2em] text-slate-300 uppercase">
                  FRAME 01
                </span>
              </div>
            </div>
          </div>

          {/* Frame 02: Right Stage Panoramic (with red border) */}
          <div className="md:col-span-8 border border-[#751b25] bg-[#0c0e18] p-3 rounded-[2px] relative group hover:border-[#a82433] transition-all shadow-[0_0_20px_rgba(117,27,37,0.18)] flex flex-col">
            <div className="relative aspect-[16/10] md:aspect-auto md:h-[350px] w-full overflow-hidden bg-black/40">
              <Image
                src="/images/crowd.png"
                alt="Frame 02 Stage Confetti"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-[#751b25] px-2.5 py-1 rounded-[2px]">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#e6202e] uppercase font-medium">
                  {"FRAME 02 // STAGE"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
