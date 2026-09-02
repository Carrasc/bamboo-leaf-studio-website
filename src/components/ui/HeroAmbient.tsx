"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Split out of the entry bundle: the shader library is the largest dependency
// on the page and nothing above the fold needs it to lay out. `ssr: false`
// because it is a canvas — there is no server markup to hydrate, and the
// `.hero-wash` gradient underneath already stands in for it.
const HeroShader = dynamic(
  () => import("@/components/ui/HeroShader").then((m) => m.HeroShader),
  { ssr: false },
);

const SPEED = 0.14;

/**
 * Owns the "is the hero worth animating" question for everything that moves in
 * the hero — the WebGL wash and the swaying bamboo leaves alike.
 *
 * Both are continuous, unbounded work: the shader redraws a full-viewport
 * canvas every frame and the leaves invalidate a 46vw×82vh raster region every
 * frame. Neither stops on its own when you scroll past, so on a long page they
 * burn GPU and raster time for a hero nobody is looking at. One
 * IntersectionObserver here switches both off.
 *
 * The children (the server-rendered `Bamboo`) are passed through rather than
 * imported, so the art stays a server component and its frozen path data never
 * reaches the client bundle. They read the pause through the `data-ambient`
 * attribute in `globals.css`, which keeps this component free of any knowledge
 * of the art it is gating.
 */
export function HeroAmbient({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // Once the shader has mounted it stays mounted — tearing down a WebGL context
  // on every scroll-past would cost far more than the paused loop it saves.
  const [shaderMounted, setShaderMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let onScreen = false;

    function sync() {
      const next = onScreen && !document.hidden;
      setActive(next);
      if (next) setShaderMounted(true);
    }

    // A little margin either side so the wash is already running by the time
    // it scrolls back into frame, rather than starting up in view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);

    // The shader library pauses itself on tab-hide, but the CSS sway does not,
    // and a hidden tab still reports its hero as intersecting.
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-ambient={active ? "active" : "idle"}
      className="hero-wash pointer-events-none absolute inset-0"
    >
      {shaderMounted && <HeroShader speed={active ? SPEED : 0} />}
      {children}
    </div>
  );
}
