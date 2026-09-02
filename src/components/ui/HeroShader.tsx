"use client";

import { MeshGradient } from "@paper-design/shaders-react";

// Paper tones only — barely-there variation in the cream, so the ground looks
// like a sheet catching light rather than a gradient. The old mint/cyan mix
// fought the ink palette.
//
// These are `surface` plus `--wash-1/2/3` from globals.css, where `.hero-wash`
// paints the static stand-in shown until this chunk loads and whenever motion
// is reduced. A uniform cannot read a custom property, so the two lists are
// paired by hand: change these and change those.
const COLORS = ["#f4efe2", "#ece4d3", "#e9dfd4", "#eee7d8"];

// The shader is a full-quad fragment program: there is no geometry to alias, no
// depth and no stencil, so every one of those buffers is pure cost. `low-power`
// keeps laptops on the integrated GPU instead of waking the discrete one for a
// background wash.
const GL_ATTRIBUTES: WebGLContextAttributes = {
  antialias: false,
  depth: false,
  stencil: false,
  powerPreference: "low-power",
};

// Fragment cost scales linearly with this, and it is the single biggest lever
// on the page. At 2 Mpx a 120Hz display asks the GPU for ~250 Mpx/s of noise
// and swirl, which is enough to visibly starve a video decode in another tab.
// The wash is soft and near-monochrome, so it survives being rendered under
// device resolution and upscaled — 0.9 Mpx is indistinguishable at 1x and 2x.
const MAX_PIXEL_COUNT = 1280 * 720;

/**
 * `speed` of 0 stops the render loop outright — the library cancels its rAF and
 * leaves the last frame on screen. It must never be 0 on the *first* render,
 * though: the mount only kicks off a frame when speed is non-zero, so a shader
 * born paused paints nothing at all. `HeroAmbient` owns that rule by not
 * mounting this component until the hero is actually on screen.
 */
export function HeroShader({ speed }: { speed: number }) {
  return (
    <MeshGradient
      colors={COLORS}
      speed={speed}
      distortion={0.85}
      swirl={0.9}
      grainMixer={0.06}
      minPixelRatio={1}
      maxPixelCount={MAX_PIXEL_COUNT}
      webGlContextAttributes={GL_ATTRIBUTES}
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
