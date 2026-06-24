"use client";

import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { WorkDNA } from "@/components/WorkDNA";
import { Contact } from "@/components/contact";
import LayoutWrapper from "@/components/layout-wrapper";

export default function Home() {
  return (
    <LayoutWrapper>
      <Hero />
      <About />
      <Skills />
      <WorkDNA />
      <Projects />
      <Contact />
    </LayoutWrapper>
  );
}
