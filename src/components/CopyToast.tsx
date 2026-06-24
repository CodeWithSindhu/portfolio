"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export interface CopyToastProps {
  message: string;
  onClose: () => void;
}

export function CopyToast({ message, onClose }: CopyToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: 30, x: "-50%", opacity: 0, scale: 0.95 }}
      animate={{ y: 0, x: "-50%", opacity: 1, scale: 1 }}
      exit={{ y: 15, x: "-50%", opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-12 left-1/2 z-50 px-6 py-3 rounded-full border border-white/10 bg-[#0E0E10]/95 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-auto select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
      <span className="text-xs font-mono tracking-wide text-zinc-300">
        {message}
      </span>
    </motion.div>
  );
}
