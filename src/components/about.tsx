"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content reveal
      gsap.from(leftContentRef.current?.children || [], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Right content (Profile Card) reveal
      gsap.from(rightContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2, // slightly delayed after left content starts
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-20 relative z-10 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-container px-6 mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-center w-full">
          
          {/* Left Content */}
          <div ref={leftContentRef} className="w-full lg:w-[62%] flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-[clamp(1.75rem,4.5vw,4rem)] leading-[1.05] font-bold text-white uppercase tracking-tighter text-left">
              I AM KEVAL SINDHU, I CRAFT{" "}
              <span className="font-mazius italic font-normal normal-case text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-indigo-400 min-w-fit pr-1">
                Effortless
              </span>{" "}
              YET COMPLEX DIGITAL EXPERIENCES THROUGH THE LENS OF HIGH-END ENGINEERING AND DESIGN.
            </h2>
          </div>

          {/* Right Content */}
          <div ref={rightContentRef} className="w-full lg:w-2/5 flex justify-center lg:justify-end order-1 lg:order-2">
           <div className="w-full max-w-lg lg:max-w-md xl:max-w-lg aspect-square relative group perspective-1000 mt-12 lg:mt-0">
            {/* Main Ambient Glow */}
            <div className="absolute inset-4 bg-gradient-to-tr from-accent/40 via-purple-500/20 to-violet-500/30 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
            
            {/* Floating Container */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {/* Core Image/Avatar Frame */}
              <div className="relative w-64 h-80 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-2 shadow-2xl backdrop-blur-xl overflow-hidden pointer-events-auto transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                {/* Inner Image Container (Placeholder for actual image) */}
                <div className="w-full h-full rounded-[1.5rem] bg-[#0f1219] overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay z-10" />
                   {/* Optional: Add an actual image here instead of the gradient */}
                   <div className="w-full h-full bg-gradient-to-br from-accent/30 via-purple-900/50 to-indigo-900/30 flex flex-col items-center justify-center text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent to-purple-500 mb-4 shadow-[0_0_30px_rgba(79,70,229,0.5)] animate-pulse" />
                      <h3 className="text-xl font-medium text-white mb-2">Build. Scale. <br/> Innovate.</h3>
                      <p className="text-xs text-zinc-400">Crafting high-performance digital solutions.</p>
                   </div>
                </div>
              </div>
              
              {/* Floating Tech Badges */}
              {/* Top Right Badge */}
              <motion.div 
                className="absolute top-[15%] right-[10%] px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-auto group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-mono text-zinc-300">React / Next.js</span>
              </motion.div>

              {/* Bottom Left Badge */}
              <motion.div 
                className="absolute bottom-[25%] left-[5%] px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-auto group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-700"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 0.5, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-xs font-mono text-zinc-300">WebGL / 3D</span>
              </motion.div>

              {/* Bottom Right Badge */}
              <motion.div 
                className="absolute bottom-[10%] right-[20%] px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-auto group-hover:translate-x-6 group-hover:translate-y-2 transition-transform duration-700"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 1.5, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-xs font-mono text-zinc-300">UI / UX</span>
              </motion.div>
            </motion.div>
           </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
