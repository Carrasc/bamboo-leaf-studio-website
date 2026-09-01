# Bamboo Leaf Studio — house style

Studio portfolio site. Next.js 15 App Router, React 19, TypeScript strict,
Tailwind v4, framer-motion, next-intl (en/es/ja). Deployed on Vercel.

The design is a **naturalist field journal**: cream paper torn into color bands,
hand-drawn ink botanicals, and one continuous ochre thread running the full
height of the document. Everything below serves that idea.

## Non-negotiables

- **Tailwind v4, no config file.** The theme lives in `@theme inline` in
  `src/app/globals.css`. New design tokens go there — never create a
  `tailwind.config.js`.
- **Semantic tokens only.** Use `bg-surface`, `text-muted`, `border-foreground/12`.
  Never `text-gray-500`, never a raw hex in a class. If a color doesn't exist as
  a token, add it to `globals.css` first.
- **No hardcoded user-facing copy.** Every string comes from
  `src/messages/{en,es,ja}.json` via next-intl. Adding a string means adding it
  to all three locales. Japanese needs the Noto Sans JP fallback already wired
  into `--font-sans` and `--font-mono`.
- **Server components by default.** Sections in `src/components/sections/` are
  `async` and call `getTranslations()`. Only `src/components/ui/` and
  `MobileNav` are `"use client"`, and they receive copy as props. Art in
  `src/components/art/` is pure server-rendered SVG.

## Palette

Defined in `globals.css`. Light-mode only — there is no dark theme; the Contact
section is a deliberate night band, not a theme.

| Token | Value | Use |
|---|---|---|
| `surface` | `#f4efe2` | cream paper, the default ground |
| `surface-alt` | `#ead9d0` | dusty blush band (About) |
| `sage` | `#d7dec9` | pressed-leaf band (Process) |
| `surface-dark` | `#26231f` | ink night band (Contact only) |
| `card` / `card-border` | `#fbf7ec` / `#d8cfbc` | specimen cards |
| `foreground` | `#2b2822` | headings, primary button fill |
| `muted` | `#6e675c` | body copy |
| `accent` | `#4e6742` | bamboo green, deepened to an ink wash |
| `thread` | `#b08a4f` | the continuous line. **Decorative only** — 2.8:1 |
| `vermilion` | `#c4553b` | hanko seal, asterisks, sampler crosshairs |

Bands run `surface → surface-alt → surface → sage → surface → surface-dark →
surface`, each transition a torn edge.

**Contrast is checked, keep it that way.** `accent` clears WCAG AA on all three
light bands (5.47 / 4.59 / 4.54) — it replaced a mint green that sat at 1.6:1.
Before changing `accent`, re-run the ratio against `surface`, `surface-alt` and
`sage`. `thread` and `vermilion` are decorative: never the only carrier of text.

**Don't boost saturation over these grounds.** The bands are warm, so a
`backdrop-saturate` above ~1.1 pushes them visibly gold. Anything that adds a
backdrop-filter must also list `backdrop-filter` in its `transition-[…]` and
declare a value in *both* states, or the filter snaps on a frame ahead of the
background and flashes. The navbar in `MobileNav.tsx` is the worked example.

## Type

Poppins for prose, IBM Plex Mono (300/400) for annotations, Noto Sans JP for
Japanese. Every heading carries `tracking-[-0.03em]` and `font-light` — the
weight contrast is what makes it feel drawn rather than corporate.

- Hero h1 — `text-[clamp(2.15rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em]`
- Section h2 — `text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em]`
- Section label — always `<Caption>`, never a bare `<p>`
- Body — `text-sm`/`text-base leading-[1.8]`, capped at `max-w-[46ch]`

Headings use fluid `clamp()`, not breakpoint jumps. Keep it that way.

`<Caption>` is the field-journal voice: mono, lowercase, a short rule, accent
colored. `lowercase` is a deliberate no-op for Japanese.

## Layout

- Container: `mx-auto max-w-[1200px] px-6`
- Section rhythm: `py-32 max-md:py-20`; Hero is `min-h-screen`
- Every section is `relative` with content in `relative z-10` — this is what
  keeps the thread above backgrounds but behind text (see below)

**Breakpoints are desktop-first.** This codebase uses `max-md:`, `max-sm:`,
`max-lg:` — write the desktop layout in the base classes and override downward.
Don't mix in `md:`/`lg:` min-width variants.

## The thread

`ScrollThread` is a sibling of the sections in `page.tsx`, not a child of any
one of them, so it can run the whole document uninterrupted. It sits at `z-[5]`:
above every section's flat background, below every text block. That layering is
load-bearing — a section that forgets `relative z-10` on its content will have
the thread drawn across its words.

The SVG stretches over the full document with `preserveAspectRatio="none"`, so
the curve adapts to any page height. It draws itself via framer-motion's
`pathLength` bound to `useScroll`, and renders complete before hydration.

**It is desktop-only (`max-lg:hidden`).** The meander sweeps between 33% and
64% of the width, which falls through the margins of the `lg` two-column
layouts but cuts straight across the copy once those collapse to one column.
It is hidden in CSS rather than unmounted, so there is no viewport check to
get wrong at hydration.

## Drawn art

`src/components/art/` holds `Bamboo`, `Grasses`, `TornEdge`, `Constellation`,
`Marks`. Path data is **generated once by a seeded script and frozen into the
file** — never randomized at runtime, so server and client always agree.

Two stroke classes, and picking the wrong one is a real bug:

- `.ink-stroke` — includes `vector-effect: non-scaling-stroke`. Only for
  unfilled, lightly-scaled art (the thread, grasses, torn edges).
- `.ink-cap` — round caps/joins only. **Use this for anything filled or heavily
  scaled.** `non-scaling-stroke` on large filled paths (e.g. bamboo leaves
  scaled from a 400×300 viewBox to 46vw×82vh) stalls Blink's rasterizer hard
  enough to paint a blank page. That cost an afternoon; don't rediscover it.

## Portfolio cards

Two kinds of project, one card shape. `PortfolioProject` carries both `image`
(app icon) and `banner` (screenshot of the site's own hero):

- **Web projects** set `banner` and leave `image`/`gradient`/`icon` null. The
  card shows the real site header, full-bleed, `object-cover object-top`.
- **App projects** set `image` (or `gradient` + `icon` as a fallback). The card
  shows a 120px icon centred on the blush ground.

Both media boxes are a fixed `h-[200px]`, which is what keeps the two kinds
reading as one set. Banners live in `public/images/<slug>-site.jpg`, captured at
1440×900 and cropped to 1.75:1 at 1000px wide.

**Replacing a banner in place needs a cache clear.** Next's image optimizer keys
on the source path, so overwriting `public/images/foo.jpg` keeps serving the old
crop until you `rm -rf .next/cache/images`.

## Motion

- Scroll reveal: always `<AnimateOnScroll>` — opacity 0→1, y 20→0, 0.6s
  `easeOut`, `viewport={{ once: true, margin: "-80px" }}`. Stagger in 0.05–0.1 steps.
- Signature easing: `[0.22, 1, 0.36, 1]`
- Hover: `hover:-translate-y-0.5` buttons, `hover:-translate-y-1.5` cards
- **Hydration rule:** never call `motion.create()` inside a render function.
  Use the static `motionTag` map in `AnimateOnScroll.tsx`.
- Client components depending on viewport or time must render an SSR-stable
  first paint, then correct in `useEffect` (see `Carousel`, `RotatingWords`).
- `AnimateOnScroll` ships `opacity:0` in the SSR HTML, so every reveal carries
  `data-reveal` and a `<noscript>` rule in the locale layout forces them
  visible. Any new reveal mechanism needs the same escape hatch.

## Hero shader

`HeroShader.tsx` wraps `@paper-design/shaders-react` `MeshGradient`, tuned to
near-identical paper tones — it should read as a sheet catching light, not a
gradient. `minPixelRatio={1}` and `maxPixelCount={1920*1080}` are deliberate
perf caps; don't raise them without a performance trace.

## Verifying visual work

The `chrome-devtools` MCP server is configured — use it when a change is visual.

Two traps when screenshotting this site headlessly:
1. A tall `--window-size` makes `min-h-screen` equal that height, so the hero
   balloons and the rest of the page is pushed off. Emulate a real viewport and
   use CDP `captureBeyondViewport` instead.
2. `whileInView` reveals never fire outside the real viewport, so a full-page
   capture comes back empty below the fold. Scroll-sweep the page first
   (they are `once: true`), then capture.
