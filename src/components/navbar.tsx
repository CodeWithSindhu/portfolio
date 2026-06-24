"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center",
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-zinc-800/30 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-container px-6 mx-auto flex items-center justify-between w-full">
        <Link href="/" className="text-xl font-bold tracking-tighter text-foreground">
          SK.
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
