"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "./profile-card.css";

export default function ProfileCard({
  theme = "dark",
}: {
  theme?: "dark" | "light";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const multiplier = 20; // Adjust for more/less tilt
    const xRotation = -(y / rect.height) * multiplier;
    const yRotation = (x / rect.width) * multiplier;

    setRotation({ x: xRotation, y: yRotation });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Card
      ref={cardRef}
      className={`profile-card w-full transition-all duration-300 ease-out overflow-hidden relative ${
        theme === "dark"
          ? "bg-neutral-900 border-neutral-800 text-white shadow-2xl"
          : "bg-white border-neutral-200 text-neutral-900 shadow-xl"
      }`}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{
             opacity: isHovering ? 0.4 : 0,
             background: `radial-gradient(circle at center, rgba(132, 0, 255, 0.4) 0%, transparent 60%)`,
             transform: `translate(${rotation.y * 2}px, ${-rotation.x * 2}px)`,
          }}
        />

        <CardContent className="relative z-10 flex flex-col items-center pt-8 pb-8">
            {/* Avatar skeleton placeholder - ideally use an actual image here */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 mb-6 border-4 border-neutral-800 shadow-lg" />
            
            <h3 className="text-2xl font-bold tracking-tight mb-1">Keval Sindhu</h3>
            <p className="text-sm text-neutral-400 mb-6 font-medium tracking-wide">SOFTWARE ENGINEER</p>
            
            <div className="flex gap-4">
                <Button 
                   variant="default" 
                   className="rounded-full shadow-lg bg-white text-black hover:bg-neutral-200"
                >
                   Connect
                </Button>
                <Button 
                   variant="outline" 
                   className="rounded-full shadow-lg border-neutral-700 bg-neutral-800/50 text-white hover:bg-neutral-800 hover:text-white backdrop-blur-sm"
                >
                   Message
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
