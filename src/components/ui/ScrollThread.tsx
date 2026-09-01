"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * The single ochre line that runs unbroken from the top of the page to the
 * bottom, drawing itself as you scroll. It is the spine the whole layout hangs
 * off — every section places its content to one side of it.
 *
 * The SVG is stretched over the full document height with
 * preserveAspectRatio="none", so the curve adapts to however tall the page
 * turns out to be; `vector-effect: non-scaling-stroke` keeps the line hairline
 * thin despite the non-uniform scale.
 */

// One continuous meander down a 0–1000 viewBox. Crosses the centre line five
// times so no section repeats the previous section's composition.
const THREAD =
  "M50 0 C 50 40, 62 70, 61 104 C 60 150, 34 176, 33 220 C 32 268, 63 292, 64 338 C 65 388, 36 410, 35 452 C 34 500, 60 522, 60 566 C 60 612, 38 634, 38 680 C 38 726, 62 748, 62 794 C 62 838, 44 858, 46 898 C 47 936, 50 966, 50 1000";

export function ScrollThread() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Trails the scroll slightly so the line feels drawn by hand, not scrubbed.
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  // Server and pre-hydration render the thread complete. Only once we know we
  // are on the client (and motion is welcome) do we hand length over to scroll.
  const animate = mounted && !prefersReduced;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] select-none"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Ghost of the full path, so the line reads as something being
            uncovered rather than something being extruded into empty space. */}
        <path
          d={THREAD}
          className="ink-stroke"
          stroke="var(--thread)"
          strokeOpacity={0.42}
          strokeWidth={1.1}
        />
        <motion.path
          d={THREAD}
          className="ink-stroke"
          stroke="var(--thread)"
          strokeWidth={1.9}
          style={animate ? { pathLength: drawn } : undefined}
        />
      </svg>
    </div>
  );
}
