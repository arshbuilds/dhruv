"use client";

import { useState } from "react";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "ab2f85de-fbdf-49f4-908b-a9ae3e4236e7";

export default function Inquiries() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Dhruv Kanda Portfolio Inquiry from ${formData.name}`,
          from_name: "Dhruv Kanda Portfolio",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(result.message || "Failed to transmit message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network connection error. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiries" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#e6202e] uppercase mb-4">
          {"// 04 // INQUIRIES"}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtext, Contact Info */}
          <div className="lg:col-span-5">
            <h2 className="font-serif tracking-tight leading-[0.98]">
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#f1f5f9]">
                LET&apos;S CREATE
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal italic text-[#e6202e]">
                SOMETHING
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-normal italic text-[#e6202e]">
                LASTING.
              </span>
            </h2>

            <p className="font-sans text-slate-400 text-xs md:text-[13.5px] leading-relaxed max-w-sm mt-7">
              For show bookings, press coverage, production features, or creative collaborations, contact direct management.
            </p>

            <div className="w-full max-w-sm h-[1px] bg-[#1e2338] my-8" />

            <div className="space-y-3.5 font-mono text-[11px] tracking-wider">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full border border-[#e6202e] flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e6202e]" />
                </span>
                <div>
                  <span className="text-[#e6202e] font-semibold">INSTAGRAM: </span>
                  <a
                    href="https://instagram.com/dhruv.kanda619"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    @DHRUV.KANDA619
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#e6202e] shrink-0 rounded-[1px]" />
                <div>
                  <span className="text-[#e6202e] font-semibold">DIRECT: </span>
                  <a
                    href="mailto:booking@dhruvkanda.com"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    BOOKING@DHRUVKANDA.COM
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="border border-[#1f2438] bg-[#0c0e18]/95 p-6 sm:p-8 rounded-[2px] shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center animate-in fade-in duration-300">
                  <span className="text-[#e6202e] text-3xl mb-4 block">✦</span>
                  <h3 className="font-serif text-2xl text-white mb-2">TRANSMISSION RECEIVED</h3>
                  <p className="font-mono text-xs text-slate-400 tracking-wider max-w-sm mx-auto mb-6">
                    Management has logged your inquiry. We will review your proposal and respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-[10px] tracking-[0.2em] text-[#e6202e] border border-[#e6202e]/50 hover:border-[#e6202e] px-4 py-2 rounded-[2px] transition-all cursor-pointer uppercase hover:bg-[#e6202e]/10"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Web3Forms Honeypot Spam Prevention */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-[#080911] border border-[#202538] focus:border-[#e6202e] text-white text-xs px-3.5 py-3 rounded-[2px] placeholder-slate-600 focus:outline-none transition-colors font-sans disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-2"
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-[#080911] border border-[#202538] focus:border-[#e6202e] text-white text-xs px-3.5 py-3 rounded-[2px] placeholder-slate-600 focus:outline-none transition-colors font-sans disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-2"
                    >
                      PROPOSAL / MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Detail your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-[#080911] border border-[#202538] focus:border-[#e6202e] text-white text-xs px-3.5 py-3 rounded-[2px] placeholder-slate-600 focus:outline-none transition-colors font-sans resize-y disabled:opacity-50"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-[#e6202e]/10 border border-[#e6202e]/40 rounded-[2px] text-[#e6202e] font-mono text-[11px] tracking-wider">
                      {`ERROR // ${errorMessage}`}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-[#e6202e] hover:bg-[#ff2535] disabled:bg-[#85161f] disabled:cursor-not-allowed text-white font-mono font-bold text-[11px] tracking-[0.25em] uppercase rounded-[2px] shadow-[0_0_28px_rgba(230,32,46,0.6)] hover:shadow-[0_0_35px_rgba(230,32,46,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      "TRANSMIT INQUIRY"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
