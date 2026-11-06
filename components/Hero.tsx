export default function Hero() {
  return (
    <section id="journal" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-10 pb-14 lg:pt-14 lg:pb-16 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-between">
        {/* Top metadata row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em]">
            <span className="text-[#e6202e]">✦</span>
            <span className="text-[#e6202e] font-semibold">ISSUE 001</span>
            <span className="text-[#646d82] font-normal">{"// INDEPENDENT ORIGINAL SOUND"}</span>
          </div>
          <div className="text-left sm:text-right font-mono text-[9.5px] leading-[1.65] tracking-[0.18em] text-[#6d7589]">
            <div>LATITUDE: 28.6139° N</div>
            <div>LONGITUDE: 77.2090° E</div>
            <div>FREQUENCY: 432 HZ</div>
            <div>ATMOSPHERE: NIGHTTIME NEO-SOUL</div>
          </div>
        </div>

        {/* Center Area: Headline + Background waves + Callout */}
        <div className="relative my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-2 pb-6">
          {/* Left Column: Headline & Subtext & CTA */}
          <div className="lg:col-span-7 xl:col-span-7 z-10">
            <h1 className="font-serif tracking-tight leading-[0.93] select-none">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] italic font-normal text-[#e6202e]">
                THE MIDNIGHT
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-normal text-[#f3f4f6]">
                JOURNAL.
              </span>
            </h1>

            <p className="font-serif italic text-slate-300 text-[15px] sm:text-base md:text-[16.5px] max-w-md mt-6 mb-8 leading-relaxed font-normal">
              &ldquo;A voice that echoes in the quiet hours. A sound born beyond the visible horizon.&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#archive"
                className="bg-[#e6202e] hover:bg-[#ff2535] text-white font-mono font-bold text-[11px] tracking-[0.22em] px-6 py-3.5 rounded-[2px] shadow-[0_0_28px_rgba(230,32,46,0.55)] hover:shadow-[0_0_35px_rgba(230,32,46,0.75)] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>LISTEN NOW</span>
                <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
              </a>
              <a
                href="#statement"
                className="border border-[#282f45] hover:border-slate-400 text-slate-200 hover:text-white font-mono text-[11px] tracking-[0.22em] px-6 py-3.5 rounded-[2px] transition-all flex items-center gap-2 bg-[#080a12]/50 cursor-pointer"
              >
                <span>ENTER WORLD</span>
                <span className="text-xs">↓</span>
              </a>
            </div>
          </div>

          {/* Background Harmonic Ribbon / Waves */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[680px] h-[360px] pointer-events-none z-0 opacity-80 overflow-visible">
            <svg
              viewBox="0 0 680 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="waveGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a2236" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#222c44" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0e1322" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="waveGradRed" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#751620" stopOpacity="0.1" />
                  <stop offset="30%" stopColor="#b81e2b" stopOpacity="0.75" />
                  <stop offset="75%" stopColor="#e6202e" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6e121c" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Flowing dark ribbons */}
              <path
                d="M 40 190 C 130 110, 210 250, 330 180 C 450 110, 530 160, 640 200 C 580 280, 440 290, 320 220 C 210 150, 100 270, 40 190 Z"
                fill="url(#waveGradDark)"
              />
              <path
                d="M 110 200 C 190 130, 280 240, 400 170 C 520 100, 580 150, 650 180"
                stroke="#2a344d"
                strokeWidth="1.2"
                fill="none"
                opacity="0.65"
              />

              {/* Crimson soundwave contours */}
              <path
                d="M 70 210 C 170 140, 250 280, 370 190 C 490 100, 560 180, 650 200"
                stroke="url(#waveGradRed)"
                strokeWidth="1.6"
                fill="none"
              />
              <path
                d="M 100 225 C 200 155, 280 295, 400 205 C 500 130, 570 200, 645 230"
                stroke="#c5202e"
                strokeWidth="1"
                strokeOpacity="0.55"
                fill="none"
              />
              <path
                d="M 50 195 C 150 125, 230 265, 350 175 C 460 95, 530 170, 630 195"
                stroke="#ff2e3e"
                strokeWidth="0.8"
                strokeOpacity="0.75"
                fill="none"
              />
              <path
                d="M 170 240 C 250 170, 330 270, 440 180 C 520 120, 580 180, 640 210"
                stroke="#e6202e"
                strokeWidth="0.75"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                fill="none"
              />
              <path
                d="M 270 210 C 340 150, 410 230, 510 170 C 570 130, 600 160, 655 185"
                stroke="#ff4a58"
                strokeWidth="1.2"
                fill="none"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* Right Column: Quote Callout Box */}
          <div className="lg:col-span-5 xl:col-span-5 z-10 lg:pl-4">
            <div className="border border-[#751b25] bg-[#0b0d18]/90 backdrop-blur-md p-6 sm:p-7 rounded-[2px] relative shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#e6202e] uppercase mb-3.5">
                {"// ARTIST REF: @DHRUV.KANDA819"}
              </div>

              <p className="font-serif italic text-[#f1f5f9] text-[14.5px] sm:text-[15.5px] leading-relaxed my-3 font-normal">
                &ldquo;Music is not merely heard; it is an atmospheric shift. Every track carries the weight of silent thoughts.&rdquo;
              </p>

              <div className="w-full h-[1px] bg-[#1d2338] my-4" />

              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
                <span className="text-slate-300 uppercase">DHRUV KANDA</span>
                <span className="text-[#e6202e] uppercase font-medium">2026 ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="hidden lg:block h-4" />
      </div>
    </section>
  );
}
