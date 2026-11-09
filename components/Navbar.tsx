"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#080a12]/90 border-b border-white/[0.04]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-[#e6202e] text-[13px] leading-none select-none group-hover:scale-110 transition-transform">
            ✦
          </span>
          <span className="font-sans font-bold tracking-[0.25em] text-[12px] text-white uppercase select-none">
            DHRUV KANDA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="#journal"
            className="font-mono text-[11px] tracking-[0.16em] text-[#828a9c] hover:text-white transition-colors"
          >
            {"01 // JOURNAL"}
          </a>
          <a
            href="#archive"
            className="font-mono text-[11px] tracking-[0.16em] text-[#828a9c] hover:text-white transition-colors"
          >
            {"02 // ARCHIVE"}
          </a>
          <a
            href="#visuals"
            className="font-mono text-[11px] tracking-[0.16em] text-[#828a9c] hover:text-white transition-colors"
          >
            {"03 // VISUALS"}
          </a>
          <a
            href="#faq"
            className="font-mono text-[11px] tracking-[0.16em] text-[#828a9c] hover:text-white transition-colors"
          >
            {"FAQ"}
          </a>
          <a
            href="#inquiries"
            className="font-mono text-[11px] tracking-[0.16em] text-[#828a9c] hover:text-white transition-colors"
          >
            {"04 // INQUIRIES"}
          </a>
        </nav>

        {/* Action Pills */}
        <div className="flex items-center gap-3">
          <a
            href="#archive"
            className="font-mono text-[10px] tracking-[0.18em] text-[#d43743] border border-[#6b1e27] rounded-full px-3.5 py-1.5 hover:border-[#e6202e] hover:text-[#ff2837] transition-all bg-[#0d0f1a]/60 cursor-pointer hidden sm:inline-block"
          >
            MIDNIGHT FREQUENCY
          </a>
          <a
            href="#inquiries"
            className="font-mono text-[10px] tracking-[0.2em] font-medium text-white border border-[#e6202e] rounded-[2px] px-3.5 py-1.5 hover:bg-[#e6202e] transition-all bg-[#080a12]"
          >
            BOOKING
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1 ml-1"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1f2438] bg-[#090b14]/98 px-6 py-4 space-y-3 font-mono text-xs">
          <a
            href="#journal"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#828a9c] hover:text-white tracking-[0.16em]"
          >
            {"01 // JOURNAL"}
          </a>
          <a
            href="#archive"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#828a9c] hover:text-white tracking-[0.16em]"
          >
            {"02 // ARCHIVE"}
          </a>
          <a
            href="#visuals"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#828a9c] hover:text-white tracking-[0.16em]"
          >
            {"03 // VISUALS"}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#828a9c] hover:text-white tracking-[0.16em]"
          >
            {"FAQ"}
          </a>
          <a
            href="#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#828a9c] hover:text-white tracking-[0.16em]"
          >
            {"04 // INQUIRIES"}
          </a>
        </div>
      )}
    </header>
  );
}
