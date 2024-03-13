import "server-only";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relatle - The Daily Synonym Game",
  description:
    "Can you guess today's word by looking at it's synonyms? Inspired by wordle, but for thesaurus heads.",
  keywords:
    "synonyms, synonym, guessing game, daily challenge, daily game, wordle, puzzle, word game, word puzzle",
  og_title: "Relatle - The Daily Synonym Game",
  og_description:
    "Can you guess today's word by looking at it's synonyms? See if you can beat your friends and get today's relatle!",
  og_image: "https://www.hexcodle.com/og_image.png",
  themeColor: "#fff6eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-full ${inter.className} flex flex-col`}>
        <Navbar />
        <div className="flex-grow">
          {children}
          <Analytics />
        </div>
        <Footer />
      </body>
    </html>
  );
}
