"use client";

import Image, { getImageProps } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { AnimateOnScroll } from "./AnimateOnScroll";
import type { ProjectKind } from "@/lib/constants";

export type StageStat = {
  value: string;
  label: string;
  /** Trail the value with a star (ratings). */
  star?: boolean;
  /** Full reading for screen readers when the value alone is ambiguous. */
  spoken?: string;
};

export type StageProject = {
  slug: string;
  kind: ProjectKind;
  href: string;
  /** Bare host shown in the browser chrome, e.g. `konohanatei.vercel.app`. */
  host: string;
  image: string;
  tint: string;
  name: string;
  tagline: string;
  description: string;
  kindLabel: string;
  cta: string;
  tags: string[];
  /** App projects only; rendered either side of the phone. */
  stats: StageStat[];
};

type Props = {
  projects: StageProject[];
  pickerLabel: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Critically damped: the pill glides and settles without overshoot, the way a
// UIKit segmented control does.
const PILL_SPRING: Transition = { type: "spring", bounce: 0, duration: 0.55 };

// Both device frames render through `fill`, so these `sizes` are the single
// source of truth for which srcset candidate the browser picks — the preloader
// below must request exactly the same one.
const IMAGE_SIZES: Record<"site" | "icon", string> = {
  site: "(max-width: 768px) 82vw, 560px",
  icon: "96px",
};
const sizesFor = (kind: ProjectKind) =>
  kind === "ios" ? IMAGE_SIZES.icon : IMAGE_SIZES.site;

/* ---------- Motion ---------- */

// `custom` is the direction of travel through the list: +1 down, -1 up. The
// incoming layer rises from that side while the outgoing one recedes the other
// way, so the stage reads as one strip sliding under a window.
const deviceVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir * 26,
    scale: 1.015,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.72, delay: 0.07, ease: EASE },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -16,
    scale: 0.965,
    filter: "blur(6px)",
    transition: { duration: 0.38, ease: EASE },
  }),
};

const captionVariants: Variants = {
  enter: {},
  center: { transition: { delayChildren: 0.12, staggerChildren: 0.055 } },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -6,
    filter: "blur(4px)",
    transition: { duration: 0.24, ease: "easeIn" },
  }),
};

const captionLineVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 12, filter: "blur(6px)" }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.64, ease: EASE },
  },
};

// Reduced motion keeps the crossfade (it carries the change of state) and
// drops every translate, scale and blur.
const fade = (duration: number): Variants => ({
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration } },
  exit: { opacity: 0, transition: { duration } },
});

/* ---------- Component ---------- */

export function PortfolioStage({ projects, pickerLabel }: Props) {
  const [{ active, dir }, setSelection] = useState({ active: 0, dir: 1 });
  const reduce = useReducedMotion() ?? false;

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) =>
    setSelection((s) =>
      index === s.active
        ? s
        : { active: index, dir: Math.sign(index - s.active) },
    );

  // Warm every project's image once the section is near, so switching never
  // shows a frame gliding in empty. `getImageProps` + the same `sizes` resolve
  // to the exact srcset candidate the <Image> will pick, so the switch hits
  // the cache. A detached Image rather than <link rel=preload>: these are for
  // later, and Chrome warns about preloads left unused after load.
  const nearby = useInView(rootRef, { once: true, margin: "600px 0px" });
  useEffect(() => {
    if (!nearby) return;
    for (const p of projects) {
      const { props } = getImageProps({
        src: p.image,
        alt: "",
        fill: true,
        sizes: sizesFor(p.kind),
      });
      const img = new window.Image();
      img.fetchPriority = "low";
      // `sizes` must be set before `srcset`, or the first candidate is chosen
      // against the default 100vw.
      if (props.sizes) img.sizes = props.sizes;
      if (props.srcSet) img.srcset = props.srcSet;
      img.src = props.src;
    }
  }, [nearby, projects]);

  // Below `md` the picker is a horizontal strip above the plate; keep the
  // chosen chip centred. A no-op on desktop, where the list never overflows
  // sideways.
  useEffect(() => {
    const list = listRef.current;
    const item = tabRefs.current[active]?.parentElement;
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: item.offsetLeft - list.clientWidth / 2 + item.offsetWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  // WAI-ARIA tabs: arrows move and activate, Home/End jump, focus is roving.
  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = projects.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const project = projects[active];
  const device = reduce ? fade(0.2) : deviceVariants;
  const caption = reduce ? fade(0.15) : captionVariants;
  const captionLine = reduce ? {} : captionLineVariants;

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-start gap-[clamp(1.5rem,5vw,4.5rem)] max-md:grid-cols-1"
    >
      {/* ---------- Picker ---------- */}
      {/* `layoutScroll` lets framer account for the strip's own scroll offset
          when it measures the pill on mobile. */}
      <motion.ul
        ref={listRef}
        layoutScroll
        role="tablist"
        aria-label={pickerLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="relative flex flex-col gap-0.5 max-md:-mx-6 max-md:flex-row max-md:gap-1 max-md:overflow-x-auto max-md:-my-3 max-md:px-6 max-md:py-3 max-md:[scrollbar-width:none] max-md:[mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-48px),transparent)]"
      >
        {projects.map((p, i) => {
          const selected = i === active;
          return (
            <AnimateOnScroll
              as="li"
              role="presentation"
              key={p.slug}
              delay={0.05 * i}
              className="max-md:shrink-0"
            >
              <button
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`portfolio-tab-${p.slug}`}
                aria-selected={selected}
                aria-controls="portfolio-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className="group relative flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left outline-none [-webkit-tap-highlight-color:transparent] focus-visible:rounded-[18px] focus-visible:ring-2 focus-visible:ring-accent/60 max-md:px-4 max-md:py-2"
              >
                {selected && (
                  // One shared-layout element: framer measures the old and
                  // new row and springs between them, in either axis. The
                  // radius lives in `style` so framer can correct it while the
                  // pill scales between chips of different widths.
                  <motion.span
                    layoutId="portfolio-pill"
                    aria-hidden
                    transition={reduce ? { duration: 0 } : PILL_SPRING}
                    style={{ borderRadius: 18 }}
                    className="absolute inset-0 border border-card-border/70 bg-card shadow-[0_1px_2px_rgba(43,40,34,0.06),0_6px_18px_rgba(43,40,34,0.07)]"
                  />
                )}
                <span
                  aria-hidden
                  style={{ backgroundColor: p.tint }}
                  className={`relative h-2 w-2 shrink-0 rounded-full transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
                <span className="relative flex flex-1 items-baseline justify-between gap-4 transition-transform duration-200 group-active:scale-[0.985]">
                  <span
                    className={`whitespace-nowrap text-[clamp(1.05rem,1.9vw,1.3rem)] font-light tracking-[-0.03em] transition-colors duration-400 max-md:text-[0.95rem] ${
                      selected
                        ? "text-foreground"
                        : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`shrink-0 font-mono text-xs font-light lowercase text-muted transition-opacity duration-400 max-md:hidden ${
                      selected ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {p.kindLabel}
                  </span>
                </span>
              </button>
            </AnimateOnScroll>
          );
        })}
      </motion.ul>

      {/* ---------- Stage ---------- */}
      <AnimateOnScroll delay={0.15}>
        <div
          id="portfolio-panel"
          role="tabpanel"
          aria-labelledby={`portfolio-tab-${project.slug}`}
        >
          {/* The plate. Its wash is the project's color mixed into card
              paper; the transition rides the computed color, so changing
              `--tint` alone cross-fades it. */}
          <div
            style={{ "--tint": project.tint } as CSSProperties}
            className="relative aspect-[16/9] overflow-hidden max-md:aspect-[8/5] rounded-[22px] border border-foreground/[0.07] bg-[color-mix(in_srgb,var(--tint)_12%,var(--card))] transition-[background-color] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={project.slug}
                custom={dir}
                variants={device}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center py-[5.5%] will-change-[transform,opacity,filter]"
              >
                {project.kind === "ios" ? (
                  <AppShowcase project={project} />
                ) : (
                  <BrowserFrame project={project} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption. Every project's caption is laid out invisibly in the
              same grid cell, so the block is always as tall as the longest
              one in this locale and nothing below it jumps on a switch. */}
          <div className="grid pt-6">
            {projects.map((p) => (
              <div
                key={p.slug}
                aria-hidden
                className="invisible [grid-area:1/1]"
              >
                <CaptionBody project={p} />
              </div>
            ))}
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={project.slug}
                custom={dir}
                variants={caption}
                initial="enter"
                animate="center"
                exit="exit"
                className="[grid-area:1/1]"
              >
                <CaptionBody project={project} lineVariants={captionLine} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}

/* ---------- Pieces ---------- */

function CaptionBody({
  project,
  lineVariants,
}: {
  project: StageProject;
  lineVariants?: Variants;
}) {
  // Each direct child is one staggered line of the entrance.
  return (
    <>
      <motion.h3
        variants={lineVariants}
        className="text-[clamp(1.5rem,3vw,2.1rem)] font-light leading-[1.1] tracking-[-0.03em] text-foreground"
      >
        {project.name}
      </motion.h3>
      <motion.p
        variants={lineVariants}
        className="mt-2 font-mono text-xs font-light lowercase text-muted"
      >
        {project.tagline} · {project.kindLabel}
      </motion.p>
      <motion.p
        variants={lineVariants}
        className="mt-3 max-w-[64ch] text-sm leading-[1.8] text-muted"
      >
        {project.description}
      </motion.p>
      <motion.div
        variants={lineVariants}
        className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
      >
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-foreground/12 px-3 py-1.5 font-mono text-xs font-light lowercase text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs font-normal lowercase text-accent"
        >
          {project.kind === "ios" && <AppStoreIcon />}
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {project.cta}
          </span>
          <ArrowIcon />
        </a>
      </motion.div>
    </>
  );
}

function BrowserFrame({ project }: { project: StageProject }) {
  return (
    // Height-driven, like the phone: the frame fills the plate's height and
    // takes its width from its own ratio (chrome + a 1.75:1 viewport).
    <div className="flex aspect-[16/10] h-full max-w-full flex-col overflow-hidden rounded-[10px] border border-card-border bg-card shadow-[0_30px_60px_-20px_rgba(43,40,34,0.35)]">
      <div
        aria-hidden
        className="flex items-center gap-[5px] border-b border-card-border px-3 py-2"
      >
        <i className="h-2 w-2 rounded-full bg-foreground/15" />
        <i className="h-2 w-2 rounded-full bg-foreground/15" />
        <i className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="mx-[18%] ml-2 flex-1 truncate rounded-md bg-surface px-2 text-center font-mono text-[0.65rem] font-light text-muted">
          {project.host}
        </span>
      </div>
      <div className="relative flex-1">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes={IMAGE_SIZES.site}
          draggable={false}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

// The phone sits dead centre; the free plate either side carries the numbers.
function AppShowcase({ project }: { project: StageProject }) {
  // Fixed slots, so an app with only a rating doesn't shift it left.
  const left = project.stats.find((s) => !s.star);
  const right = project.stats.find((s) => s.star);
  return (
    // An explicit 100% row gives the phone's `h-full` a definite height to
    // resolve against; an auto row lets it size from content and overflow.
    <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] grid-rows-[100%] items-center gap-4">
      <div>{left && <Stat stat={left} />}</div>
      <PhoneFrame project={project} />
      <div>{right && <Stat stat={right} />}</div>
    </div>
  );
}

function Stat({ stat }: { stat: StageStat }) {
  return (
    <p className="flex flex-col items-center text-center">
      <span
        aria-hidden={stat.spoken ? true : undefined}
        className="flex items-center gap-1.5 text-[clamp(1.35rem,2.8vw,2.25rem)] font-light leading-none tracking-[-0.03em] text-foreground"
      >
        {stat.value}
        {stat.star && <StarIcon />}
      </span>
      {stat.spoken && <span className="sr-only">{stat.spoken}</span>}
      <span className="mt-2 font-mono text-xs font-light lowercase text-muted max-md:text-[0.625rem]">
        {stat.label}
      </span>
    </p>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-[0.6em] w-[0.6em] shrink-0 text-vermilion"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z" />
    </svg>
  );
}

function PhoneFrame({ project }: { project: StageProject }) {
  return (
    <div className="aspect-[9/19] h-full rounded-[32px] bg-foreground p-[7px] shadow-[0_30px_60px_-20px_rgba(43,40,34,0.4)]">
      <div
        style={{
          background: `linear-gradient(170deg, ${project.tint}, color-mix(in srgb, ${project.tint} 55%, var(--foreground)))`,
        }}
        className="flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[26px]"
      >
        <div className="relative aspect-square w-[42%] overflow-hidden rounded-[22.5%] shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes={IMAGE_SIZES.icon}
            draggable={false}
            className="object-cover"
          />
        </div>
        <span
          aria-hidden
          className="px-3 text-center text-[0.85rem] font-medium tracking-[-0.01em] text-card"
        >
          {project.name}
        </span>
      </div>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
      className="ink-stroke h-3 w-3 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  );
}
