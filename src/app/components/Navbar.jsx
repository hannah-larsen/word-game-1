"use client";

import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="bg-orange-200 text-black w-full">
      <div className="flex justify-center items-center w-full py-5">
        <a href="/" className="text-center">
          <span className="font-semibold text-xl tracking-tight">
            Unnamed Word Game
          </span>
        </a>
      </div>
    </nav>
  );
}
