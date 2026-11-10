import type { Metadata } from "next";
import { Playfair_Display, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  variable: "--font-space-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dhruv Kanda — The Midnight Journal",
  description:
    "Official artist portal of Dhruv Kanda. Independent original sound, evocative acoustic-electronic soundscapes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="bg-[#080a12] text-slate-200 antialiased selection:bg-[#e6202e] selection:text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
