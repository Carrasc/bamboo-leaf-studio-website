"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  words: string[];
  interval?: number;
  className?: string;
};

export function RotatingWords({
  words,
  interval = 3500,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [mounted, words.length, interval]);

  // Render static first word on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <span
        className={`relative block overflow-hidden ${className ?? ""}`}
        style={{ height: "1.3em" }}
      >
        <span className="absolute inset-0">{words[0]}</span>
      </span>
    );
  }

  return (
    <span
      className={`relative block overflow-hidden ${className ?? ""}`}
      style={{ height: "1.3em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
