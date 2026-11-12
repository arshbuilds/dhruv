export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] py-8 relative z-10 bg-[#070910]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-sans font-bold tracking-[0.25em] text-[11px] text-white uppercase">
          DHRUV KANDA
        </div>

        <div className="flex items-center gap-8 font-mono text-[10.5px] tracking-[0.2em] text-[#6d7589]">
          <a
            href="https://instagram.com/dhruv.kanda619"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            INSTAGRAM
          </a>
          <a href="#archive" className="hover:text-white transition-colors">
            ARCHIVE
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#inquiries" className="hover:text-white transition-colors">
            BOOKING
          </a>
        </div>

        <div className="font-mono text-[10px] tracking-[0.18em] text-[#6d7589]">
          © 2026 DHRUV KANDA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
