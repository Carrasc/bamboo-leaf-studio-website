import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Gamepad2, Smartphone, Code2, Users } from "lucide-react";

const serviceKeys = ["game_dev", "app_dev", "web_dev", "consulting"] as const;

// Inner dividers only — the outer border is handled by the container
// Grid is 2 cols × 2 rows
const cellBorder = ["border-b sm:border-r", "border-b", "sm:border-r max-sm:border-b", ""];

const serviceIcons: Record<(typeof serviceKeys)[number], React.ReactNode> = {
  game_dev: <Gamepad2 size={64} strokeWidth={0.75} />,
  app_dev:  <Smartphone size={64} strokeWidth={0.75} />,
  web_dev:  <Code2 size={64} strokeWidth={0.75} />,
  consulting: <Users size={64} strokeWidth={0.75} />,
};

export async function Services() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="bg-surface py-32 max-md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-accent">
            {t("label")}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <h2 className="mb-16 max-w-[600px] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            {t("title")}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          {/* Outer border on all 4 sides; inner dividers set per-cell by index */}
          <div className="relative border border-card-border">

            {/* Crosshair marks at every grid intersection (3×3 for a 2×2 grid) */}
            {([0, 1, 2] as const).map((col) =>
              ([0, 1, 2] as const).map((row) => (
                <span
                  key={`${col}-${row}`}
                  aria-hidden
                  className="pointer-events-none absolute z-10 select-none"
                  style={{
                    left: `${col * 50}%`,
                    top: `${row * 50}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="7" y1="0" x2="7" y2="14" stroke="#c5c5c5" strokeWidth="1.2" />
                    <line x1="0" y1="7" x2="14" y2="7" stroke="#c5c5c5" strokeWidth="1.2" />
                  </svg>
                </span>
              ))
            )}

            <div className="grid grid-cols-2 max-sm:grid-cols-1">
              {serviceKeys.map((key, i) => (
                <div
                  key={key}
                  className={`group flex flex-col p-8 transition-colors duration-300 border-card-border ${cellBorder[i]}`}
                >
                  {/* Icon watermark — top */}
                  <div className="mb-6 text-foreground/[0.08] transition-colors duration-300 group-hover:text-foreground/[0.12]">
                    {serviceIcons[key]}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted">
                      {t(`${key}.description`)}
                    </p>
                    <span className="inline-block rounded-full border border-card-border px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted">
                      {t(`${key}.tag`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
