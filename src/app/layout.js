import "server-only";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relatle",
  description: "The synonym daily word game!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className={`h-full ${inter.className} flex flex-col`}>
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
