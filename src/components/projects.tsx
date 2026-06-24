"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Cappello Loans",
    category: "Financial Website",
    image: "/images/projects/cappello-loan-front.png",
    link: "https://cappelloloans.com/",
  },
  {
    title: "Olive Concepts",
    category: "Agency Website",
    image: "/images/projects/oliveconcetps-front.png",
    link: "https://oliveconcepstg.wpenginepowered.com/",
  },
  {
    title: "Smokies Escape",
    category: "Rental Website",
    image: "/images/projects/smokie-front.png",
    link: "https://www.smokiesescape.com/",
  },
  {
    title: "Bravo Protection",
    category: "Service Website",
    image: "/images/projects/bravo-front.png",
    link: "https://bravoprotectionmn.com/",
  }
];

// Helper to chunk array into pairs
const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = chunkArray(PROJECTS, 2);

  useGSAP(() => {
    // Set initial states
    gsap.set(".work-item", {
      y: 1000,
      opacity: 1
    });

    const rowElements = gsap.utils.toArray<HTMLElement>(".projects-row");
    
    rowElements.forEach((row) => {
      const workItems = row.querySelectorAll(".work-item");
      
      workItems.forEach((item, index) => {
        const isLeft = index === 0;
        gsap.set(item, {
          rotation: isLeft ? -60 : 60,
          transformOrigin: "center center"
        });
      });

      ScrollTrigger.create({
        trigger: row,
        start: "top 60%",
        onEnter: () => {
          gsap.to(workItems, {
            y: 0,
            rotation: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.25
          });
        },
        onLeaveBack: () => {
          gsap.to(workItems, {
            y: 1000,
            rotation: (i) => (i === 0 ? -60 : 60),
            duration: 0.8,
            ease: "power3.in"
          });
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="projects" className="w-full px-4 md:px-8 py-24 bg-background text-foreground" ref={containerRef}>
      <div className="text-center mb-20">
        <div className="flex items-baseline justify-center gap-2">
          <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-tight text-[#333333] dark:text-[#EAEAEA]">
            Feat Wo<span className="font-mazius italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400 mx-[-0.05em]">r</span>ks
          </h2>
        </div>
      </div>

      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="projects-row grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 overflow-hidden"
          style={{ perspective: '1400px' }}
        >
          {row.map((project, index) => {
            const isLeft = index === 0;
            return (
              <div key={index}>
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-item relative block w-full aspect-video overflow-hidden bg-zinc-900 text-foreground rounded-none will-change-transform group"
                  style={{ zIndex: 10 }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover scale-none group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)]"
                    />
                  </div>
                </a>
                <div className="pt-4 pb-8 relative z-0">
                  <div className="text-xl lg:text-3xl font-semibold mt-3 flex items-center gap-2">
                    {!isLeft && <span className="text-muted font-light">&rarr;</span>}
                    <span>
                      {project.title.split(' ')[0]} <span className="font-mazius italic font-normal text-2xl lg:text-4xl">{project.title.split(' ').slice(1).join(' ')}</span>
                    </span>
                    {isLeft && <span className="text-muted font-light">&rarr;</span>}
                  </div>
                  <div className="text-sm lg:text-base mt-2 tracking-widest uppercase text-muted">
                    {project.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
    </section>
  );
}
