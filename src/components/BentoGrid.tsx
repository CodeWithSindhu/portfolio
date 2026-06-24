"use client";

import React from "react";

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full ${className}`}>
      {children}
    </div>
  );
}
