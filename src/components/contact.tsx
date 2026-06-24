"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { CopyToast } from "./CopyToast";

const EMAIL_ADDRESS = "kevalsindhu90@gmail.com";

export function Contact() {
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy email address: ", err);
    }
  };

  return (
    <section 
      id="contact" 
      className="bg-[#0a0a0a] text-white relative z-10 border-t border-white/10 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[180px] bg-purple-500/5 pointer-events-none z-0" />

      {/* Tier 1: The Information Grid (Layout adapted from reference snapshot) */}
      <div className="px-6 md:px-12 lg:px-20 w-full pt-24 lg:pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 w-full">
          
          {/* Left Column: Brand Logo, Subtitle & Circular Socials */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <h3 className="text-4xl font-mazius font-normal text-white select-none tracking-tight">
              SK.
            </h3>
            <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase leading-relaxed select-none">
              Software Engineer <br />
              Stay up to date
            </p>
            {/* Solid circular social buttons matching the snapshot circles */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/CodeWithSindhu", name: "GitHub" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/kevalkumar-sindhu01/", name: "LinkedIn" },
                { icon: <Twitter className="w-5 h-5" />, url: "https://x.com/thekevalsindhu", name: "Twitter" }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/80 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Navigation Links, Email & Info Grid */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            {/* Horizontal Navigation */}
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-gilroy font-semibold tracking-wider text-neutral-400">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Email Contact Block - styled with serif regular font to match snapshot */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-xs font-gilroy font-semibold tracking-wider text-accent select-none">
                Write to
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-2xl sm:text-4xl lg:text-5xl font-mazius font-normal text-white hover:text-purple-500 cursor-pointer transition-colors focus:outline-none text-left select-all leading-tight mt-1"
              >
                {EMAIL_ADDRESS}
              </button>
            </div>

            {/* Location & Availability Information (2-Column Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-gilroy font-semibold tracking-wider text-accent select-none">Location</span>
                <div className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed select-none">
                  <span>India</span>
                  <span>Remote / Worldwide</span>
                  <a 
                    href="mailto:kevalsindhu90@gmail.com" 
                    className="underline hover:text-white mt-1 transition-colors select-auto pointer-events-auto"
                  >
                    kevalsindhu90@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-gilroy font-semibold tracking-wider text-accent select-none">Availability</span>
                <div className="flex flex-col gap-1 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed select-none">
                  <span>Open for opportunities</span>
                  <span>Freelance & Full-time</span>
                  <a 
                    href="#contact" 
                    className="underline hover:text-white mt-1 transition-colors select-auto pointer-events-auto"
                  >
                    Available immediately
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tier 2: The Edge-to-Edge Megatext (let's build in lowercase sans-serif, 700 font weight) */}
      <div className="w-full overflow-hidden mt-20 md:mt-28 mb-12 md:mb-16 select-none pointer-events-none relative z-10">
        <h2 className="text-[21vw] leading-[0.8] font-gilroy font-bold tracking-tighter text-center lowercase whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-accent via-violet-400 to-indigo-400">
          let's build
        </h2>
      </div>



      {/* Copy Success Toast Popup */}
      <AnimatePresence>
        {showToast && (
          <CopyToast 
            message="Email copied to clipboard. Let's build something." 
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
