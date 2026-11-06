import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhruv Kanda — The Midnight Journal",
  description: "Official artist portal of Dhruv Kanda. Independent original sound, evocative acoustic-electronic soundscapes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080a12] text-slate-200 antialiased selection:bg-[#e6202e] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
