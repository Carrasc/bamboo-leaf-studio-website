"use client";

import { MeshGradient } from "@paper-design/shaders-react";

const COLORS = ["#fafafa", "#d5ffe7", "#c2eff2", "#fff2e3"];

export function HeroShader() {
  return (
    <MeshGradient
      colors={COLORS}
      speed={0.2}
      distortion={0.9}
      swirl={1.0}
      grainMixer={0.04}
      minPixelRatio={1}
      maxPixelCount={1920 * 1080}
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
