import "server-only";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relatle - The Daily Synonym Game",
  description:
    "Can you guess today's word by looking at it's synonyms? Inspired by wordle, but for thesaurus heads.",
  metadataBase: new URL("https://relatle.lol"),
  keywords: [
    "synonyms",
    "synonym",
    "guessing game",
    "daily challenge",
    "daily game",
    "wordle",
    "puzzle",
    "word game",
    "word puzzle",
  ],
  authors: [
    { name: "Ekim Karabey", url: "https://ekimerton.github.io/" },
    { name: "Hannah Larsen", url: "https://hannah-larsen.github.io/" },
  ],
  generator: "Next.js",
  applicationName: "Relatle",
  openGraph: {
    title: "Relatle - Guess the Word by Its Synonyms",
    description:
      "Can you guess today's word by looking at it's synonyms? See if you can beat your friends and get today's relatle!",
    url: "https://relatle.lol",
    siteName: "Relatle",
    images: [
      {
        url: "https://www.relatle.lol/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-full ${inter.className} flex flex-col`}>
        <Navbar />
        <div className="flex-grow">
          {children}
          <Analytics />
          <GoogleAnalytics gaId="G-J2WXFZ1W6W" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
