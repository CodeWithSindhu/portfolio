"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard({ title, description, className = "", children }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Motion templates update coordinates natively on pointer movements
  const bgSpotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.07), transparent 80%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.25), transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] ${className}`}
    >
      {/* Dynamic Border Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: borderSpotlight,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
        }}
      />

      {/* Dynamic Background Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: bgSpotlight,
        }}
      />

      {/* Inner Content Grid */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            {description}
          </p>
        </div>
        {children && (
          <div className="relative w-full overflow-hidden shrink-0 mt-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
