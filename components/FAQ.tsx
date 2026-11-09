"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "process",
    number: "01",
    category: "COLLABORATION WORKFLOW",
    question: "How does the process work?",
    answer:
      "We begin with a discussion about your vision, musical influences, and project goals. Before production starts, we confirm the scope of work, pricing, and timeline. Throughout the process, you’ll have opportunities to provide feedback to help ensure the final result aligns with your vision.",
  },
  {
    id: "timeline",
    number: "02",
    category: "TURNAROUND TIMELINE",
    question: "How long does it take?",
    answer:
      "Turnaround times depend on the current workload, with projects typically completed in approximately 5 days. Your project’s estimated completion date will be confirmed before work begins.",
  },
  {
    id: "revisions",
    number: "03",
    category: "REVISIONS & SCOPE",
    question: "Can I request changes?",
    answer:
      "Yes. Each project includes up to 3 revisions. Any additional revisions are charged at $25 per revision.",
  },
  {
    id: "payment",
    number: "04",
    category: "PAYMENT STRUCTURE",
    question: "When do I pay?",
    answer:
      "A 40% deposit is required before work begins. The remaining 60% is due upon completion of your project.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("process");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtext, Live Status Pill & Quick Action */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#e6202e] uppercase mb-3.5">
              {"// PROTOCOLS // SYSTEM FAQ"}
            </div>

            <h2 className="font-serif tracking-tight leading-[0.98]">
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#f1f5f9]">
                COMMON
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal italic text-[#e6202e]">
                FREQUENCIES.
              </span>
            </h2>

            <p className="font-sans text-slate-400 text-xs sm:text-[13.5px] leading-relaxed max-w-sm mt-6">
              Essential protocols regarding creative workflow, turnaround times, revisions, deposit terms, and live bookings.
            </p>

            {/* Live Operational Status Box */}
            <div className="mt-8 border border-[#1f2438] bg-[#0c0e18]/80 p-4 rounded-[2px] space-y-2.5 max-w-sm">
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#10b981] font-semibold uppercase">STATUS:</span>
                <span>OPEN FOR 2026 COMMISSIONS</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-[#6d7589]">
                <span className="w-2 h-2 rounded-full bg-[#e6202e]/60" />
                <span className="text-slate-400 font-semibold uppercase">TURNAROUND:</span>
                <span>TYPICALLY ~5 DAYS</span>
              </div>
            </div>

            {/* Quick Link Button to Inquiries */}
            <div className="mt-8">
              <a
                href="#inquiries"
                className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.2em] uppercase text-white bg-[#0c0e18] border border-[#282f45] hover:border-[#e6202e] hover:text-[#ff2837] px-5 py-3 rounded-[2px] transition-all group"
              >
                <span>HAVE A UNIQUE QUERY? TRANSMIT BELOW</span>
                <span className="group-hover:translate-y-0.5 transition-transform text-[#e6202e]">↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-300 rounded-[2px] overflow-hidden ${
                    isOpen
                      ? "border-[#751b25] bg-[#0c0e18] shadow-[0_0_20px_rgba(117,27,37,0.18)]"
                      : "border-[#1f2438] bg-[#0b0d18]/60 hover:border-[#2a324b] hover:bg-[#0c0e18]/80"
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] tracking-widest text-[#e6202e] font-semibold">
                          {`${item.number} //`}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#646d82] uppercase">
                          {item.category}
                        </span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-medium transition-colors ${
                          isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Expand / Collapse Icon indicator */}
                    <div
                      className={`w-7 h-7 shrink-0 rounded-[2px] border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "border-[#e6202e] bg-[#e6202e]/15 text-[#e6202e] rotate-45"
                          : "border-[#20263b] bg-[#070912] text-slate-400 group-hover:border-slate-400 group-hover:text-white"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Body / Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-[#1a2034]/60">
                        <p className="font-sans text-xs sm:text-[13.5px] text-slate-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
