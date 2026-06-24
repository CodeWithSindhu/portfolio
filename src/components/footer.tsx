"use client";

import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-8 px-6 md:px-12 lg:px-20 relative z-20 font-sans">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-gilroy tracking-wider uppercase select-none">
        <div className="text-neutral-300 font-medium">
          © {currentYear} KEVAL SINDHU. ALL RIGHTS RESERVED.
        </div>
        <div className="text-[12px] text-neutral-400 normal-case tracking-normal font-sans font-normal">
          Designed & Engineered by Keval.
        </div>
      </div>
    </footer>
  );
}
