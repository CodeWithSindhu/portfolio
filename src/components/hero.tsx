"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy load WebGL scene for performance
const WebGLScene = dynamic(() => import("./webgl-scene"), { ssr: false });

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[120vh] w-full flex items-start justify-center overflow-hidden bg-background"
    >
      {/* Premium Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_50%)] z-0 pointer-events-none" />

      {/* WebGL Canvas Background - Full Coverage */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <Suspense fallback={null}>
          <WebGLScene />
        </Suspense>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen pointer-events-none bg-background/5">
        
        <motion.div
          style={{ y, opacity, scale }}
          className="flex flex-col w-full px-[5vw] text-foreground select-none pointer-events-auto"
        >
          <h1 className="flex flex-col w-full leading-[1.0] tracking-tight">
            {/* Line 1: Frontend (Masked Reveal) */}
            <div className="overflow-hidden w-fit px-[5vw] -mx-[5vw]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 2.4, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="block text-[9.5vw] md:text-[8vw] lg:text-[min(11vw,260px)] self-start font-gilroy font-semibold overflow-visible cursor-default"
              >
                Frontend
              </motion.span>
            </div>
            
            {/* Line 2 & 3: Web Developer (Masked Reveal) */}
            <div className="flex flex-row items-baseline ml-[10vw] md:ml-[12vw] lg:ml-[15vw] gap-x-4 md:gap-x-8 lg:gap-x-12 text-foreground">
              {/* Web (Masked) */}
              <div className="overflow-hidden w-fit px-[5vw] -mx-[5vw]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 2.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="block px-[3vw] -mx-[3vw] text-[11.5vw] md:text-[10vw] lg:text-[min(13vw,260px)] font-mazius italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-indigo-400 overflow-visible cursor-default"
                >
                  Web
                </motion.span>
              </div>
              
              {/* Developer (Masked) */}
              <div className="overflow-hidden w-fit px-[5vw] -mx-[5vw]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 2.7, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="block text-[9.5vw] md:text-[8vw] lg:text-[min(11vw,260px)] font-gilroy font-semibold overflow-visible cursor-default"
                >
                  Developer
                </motion.span>
              </div>
            </div>
          </h1>
        </motion.div>

        {/* Right Side Empty */}
        <div className="hidden lg:block w-full h-full pointer-events-none" />

      </div>

      {/* Fade overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
