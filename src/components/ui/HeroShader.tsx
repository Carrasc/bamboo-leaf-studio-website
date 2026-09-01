"use client";

import { MeshGradient } from "@paper-design/shaders-react";

// Paper tones only — barely-there variation in the cream, so the ground looks
// like a sheet catching light rather than a gradient. The old mint/cyan mix
// fought the ink palette.
const COLORS = ["#f4efe2", "#ece4d3", "#e9dfd4", "#eee7d8"];

export function HeroShader() {
  return (
    <MeshGradient
      colors={COLORS}
      speed={0.14}
      distortion={0.85}
      swirl={0.9}
      grainMixer={0.06}
      minPixelRatio={1}
      maxPixelCount={1920 * 1080}
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
