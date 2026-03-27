"use client";

import { MeshGradient } from "@paper-design/shaders-react";

const COLORS_BASE = ["#fafafa", "#d5ffe7", "#c2eff2", "#fff2e3"];
const COLORS_OVERLAY = ["#ffffff", "#b8e8c8", "#e8f5ee", "#fde8d0"];

export function HeroShader() {
  return (
    <>
      <MeshGradient
        colors={COLORS_BASE}
        speed={0.3}
        distortion={0.8}
        swirl={1.2}
        grainMixer={0.04}
        className="pointer-events-none absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
      <MeshGradient
        colors={COLORS_OVERLAY}
        speed={0.15}
        distortion={1.2}
        swirl={0.6}
        grainMixer={0.03}
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
