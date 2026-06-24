"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accentBgRef = useRef<HTMLDivElement>(null);
  const mainBgRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial state for words
    gsap.set(wordRefs.current, { x: 50, opacity: 0 });

    // 2. Stagger words from right
    tl.to(wordRefs.current, {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power4.out",
    });

    // 3. Pause
    tl.to({}, { duration: 0.4 });

    // 4. Text goes up
    tl.to(contentRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.7,
      ease: "power4.inOut",
    });

    // 5. Main background goes up
    tl.to(mainBgRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power2.inOut",
    }, "-=0.3");

    // 6. Accent background goes up
    tl.to(accentBgRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    }, "-=0.5"); // Start shortly after main bg starts

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });

  const text = "Keval Sindhu is a";
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col pointer-events-none overflow-hidden"
    >
      {/* Layer 2: Accent Background */}
      <div 
        ref={accentBgRef}
        className="absolute inset-0 z-0 bg-accent"
      />

      {/* Layer 1: Main Background */}
      <div 
        ref={mainBgRef}
        className="absolute inset-0 z-1 bg-background"
      />

      {/* Centered Content */}
      <div 
        ref={contentRef}
        className="relative z-10 flex flex-1 items-center justify-center p-6"
      >
        <h2 className="flex flex-wrap items-center justify-center gap-[0.3em] text-4xl md:text-7xl font-normal tracking-tight text-center">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className={word === "Sindhu" ? "font-mazius italic text-accent" : "text-foreground"}
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}

