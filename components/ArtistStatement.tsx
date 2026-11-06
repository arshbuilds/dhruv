import Image from "next/image";

export default function ArtistStatement() {
  return (
    <section id="statement" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#e6202e] uppercase mb-3.5">
              {"// 01 // ARTIST STATEMENT"}
            </div>
            <h2 className="font-serif tracking-tight leading-[0.98]">
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#f1f5f9]">
                BEYOND THE
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal italic text-[#e6202e]">
                FREQUENCY.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-5 space-y-4">
            <p className="font-sans text-slate-300 text-sm md:text-[14.5px] leading-relaxed">
              Dhruv Kanda is an independent singer and composer crafting deeply evocative acoustic-electronic soundscapes. Merging raw emotional vocals with cinematic cyberpunk aesthetics, his art occupies the space between nocturnal solitude and high-fashion editorial storytelling.
            </p>
            <p className="font-sans text-slate-500 text-xs md:text-[12.5px] leading-relaxed">
              Drawing inspiration from midnight urban architecture, classical strings, and modern darkwave production, Dhruv creates immersive original music designed to linger long after the track ends.
            </p>
          </div>
        </div>

        {/* 3 Gallery / Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
          {/* Card 1: Vintage Microphone */}
          <div className="border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] group hover:border-slate-500 transition-colors">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
              <Image
                src="/images/rectifier.png"
                alt="Vintage Microphone bokeh"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Card 2: Center Featured - Composer on stage (Elevated with red border) */}
          <div className="border border-[#7e1c27] bg-[#0c0e1a] p-3 rounded-[2px] md:-translate-y-5 shadow-[0_0_25px_rgba(126,28,39,0.22)] group hover:border-[#a82433] transition-all">
            <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-black/40">
              <Image
                src="/images/95retro.png"
                alt="Dhruv Kanda — The Composer live stage"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="font-mono text-[9.5px] tracking-[0.2em] text-[#e6202e] uppercase mt-3 px-1">
              PLATE 02 — THE COMPOSER
            </div>
          </div>

          {/* Card 3: Concert Crowd Stadium */}
          <div className="border border-[#1f2438] bg-[#0b0d18] p-3 rounded-[2px] group hover:border-slate-500 transition-colors">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
              <Image
                src="/images/tarkash.png"
                alt="Live Concert Crowd & Confetti"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
