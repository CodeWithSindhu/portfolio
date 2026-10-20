"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SKILLS = [
  {
    category: "Languages & Core",
    items: ["JavaScript (ES6+)", "HTML5", "CSS3/Sass"],
  },
  {
    category: "CMS & Page Builders",
    items: ["WordPress", "Elementor", "WPBakery", "Bricks Builder", "Woocommerce"],
  },
  {
    category: "Frameworks & Ecosystem",
    items: ["React", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Interactive & WebGL",
    items: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion"],
  },
  {
    category: "Tools & Testing",
    items: ["Git", "Webpack/Vite", "Figma"],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray('.skill-category');
      
      categories.forEach((category: any, i) => {
        gsap.from(category, {
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-[#0E0E10] relative z-10">
      <div className="max-w-container px-6 mx-auto">
        <div className="mb-20">
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-3">
            [ SKILLS & ARSENAL ]
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight text-white dark:text-[#EAEAEA] leading-none">
            Tech A<span className="font-mazius italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400 mx-[-0.05em]">r</span>senal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {SKILLS.map((set, index) => (
            <div key={index} className="skill-category">
              <h3 className="text-md font-semibold text-foreground mb-6 border-b border-zinc-800 pb-2">
                {set.category}
              </h3>
              <ul className="space-y-3">
                {set.items.map((skill) => (
                  <li 
                    key={skill} 
                    className="flex items-center text-muted before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full before:mr-3 before:opacity-70 transition-colors hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
