"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // A subtle fade & sweep up animation for page entry
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
