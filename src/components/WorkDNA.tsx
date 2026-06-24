"use client";

import React from "react";
import { motion } from "framer-motion";
import { BentoGrid } from "./BentoGrid";
import { BentoCard } from "./BentoCard";

const TECH_TAGS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "GSAP",
  "Framer Motion"
];

// Triple-duplicate tags for clean, seamless marquee wrapping
const DUPLICATED_TAGS = [...TECH_TAGS, ...TECH_TAGS, ...TECH_TAGS];

export function WorkDNA() {
  return (
    <section id="work-dna" className="py-24 sm:py-32 bg-[#0E0E10] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[180px] bg-purple-500/5 pointer-events-none z-0" />

      <div className="max-w-container px-6 mx-auto relative z-10 w-full">
        {/* Header Block */}
        <div className="mb-16 sm:mb-20">
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-3">
            [ WORK DNA ]
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight text-white dark:text-[#EAEAEA] leading-none mb-6">
            Wo<span className="font-mazius italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400 mx-[-0.05em]">r</span>k DNA
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl leading-relaxed">
            How I transform ideas into performant, scalable and impactful digital experiences.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="relative z-10">
          
          {/* Card 1: Modular by Design (Large horizontal, spans 2 cols on desktop) */}
          <BentoCard
            title="Modular by Design"
            description="Engineering scalable digital ecosystems. By leveraging React and constructing highly customized architectures, I build fluid, component-driven layouts that allow for effortless content management and long-term product growth."
            className="md:col-span-2 min-h-[220px]"
          />

          {/* Card 4: Performance Pipelines (Tall vertical, spans 1 col and 2 rows on desktop) */}
          <BentoCard
            title="Performance Pipelines"
            description="A beautiful interface means nothing if it doesn't move seamlessly. I optimize rendering paths and orchestrate fluid motion choreography."
            className="md:col-span-1 md:row-span-2 flex flex-col justify-between"
          >
            {/* Tech Tags Vertical Marquee */}
            <div className="h-44 sm:h-56 overflow-hidden relative w-full mt-4 flex justify-center bg-[#09090B]/40 rounded-xl border border-white/[0.03]">
              {/* Fade overlays for smooth scrolling transition on edges */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
              
              <motion.div
                animate={{ y: ["0%", "-33.333%"] }}
                transition={{
                  ease: "linear",
                  duration: 10,
                  repeat: Infinity,
                }}
                className="flex flex-col gap-2.5 w-full max-w-[180px] py-3 z-10"
              >
                {DUPLICATED_TAGS.map((tag, i) => (
                  <div 
                    key={i} 
                    className="px-4 py-2 text-center text-xs font-mono tracking-wider rounded-lg bg-white/[0.02] border border-white/5 text-zinc-400 select-none hover:text-purple-400 hover:border-purple-500/20 transition-colors duration-300"
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            </div>
          </BentoCard>

          {/* Card 2: Pixel-to-Browser Fidelity (Square, spans 1 col) */}
          <BentoCard
            title="Pixel-to-Browser Fidelity"
            description="Translating modern, minimalist UI prototypes into crisp, responsive realities. Every dimension and gradient is mapped with absolute precision."
            className="md:col-span-1 min-h-[220px]"
          />

          {/* Card 3: SaaS-Grade Aesthetics (Square, spans 1 col) */}
          <BentoCard
            title="SaaS-Grade Aesthetics"
            description="Prioritizing clean typography, strategic whitespace, and immersive micro-interactions to craft digital services that feel inherently premium."
            className="md:col-span-1 min-h-[220px]"
          />

        </BentoGrid>
      </div>
    </section>
  );
}
