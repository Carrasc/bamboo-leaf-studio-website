"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Static map — each value is a stable reference, never recreated on render.
// motion.create() inside a render function produces a new type each call,
// which breaks React hydration (server ComponentA ≠ client ComponentB).
const motionTag = {
  div: motion.div,
  p: motion.p,
  section: motion.section,
} as const;

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motionTag;
};

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
  as = "div",
}: Props) {
  const Component = motionTag[as];

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Component>
  );
}
