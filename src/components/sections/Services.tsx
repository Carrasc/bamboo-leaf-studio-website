import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Caption } from "@/components/ui/Caption";
import { TornEdge } from "@/components/art/TornEdge";
import { Gamepad2, Smartphone, Code2, Users } from "lucide-react";

const serviceKeys = ["game_dev", "app_dev", "web_dev", "consulting"] as const;

// Inner dividers only — the outer border is handled by the container.
// Grid is 2 cols × 2 rows.
const cellBorder = ["border-b sm:border-r", "border-b", "sm:border-r max-sm:border-b", ""];

const serviceIcons: Record<(typeof serviceKeys)[number], React.ReactNode> = {
  game_dev: <Gamepad2 size={56} strokeWidth={0.6} />,
  app_dev: <Smartphone size={56} strokeWidth={0.6} />,
  web_dev: <Code2 size={56} strokeWidth={0.6} />,
  consulting: <Users size={56} strokeWidth={0.6} />,
};

export async function Services() {
  const t = await getTranslations("services");

  return (
    <section
      id="services"
      className="paper-grain relative bg-surface py-32 max-md:py-20"
    >
      <TornEdge fill="var(--surface)" variant={1} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <Caption className="mb-6">{t("label")}</Caption>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <h2 className="mb-16 max-w-[600px] text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-foreground">
            {t("title")}
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          {/* A stitched sampler: one square per discipline, tacked at every
              intersection. Outer border on all four sides; inner dividers are
              set per cell by index. */}
          <div className="relative border border-foreground/15">
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
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <line
                      x1="7.5"
                      y1="0"
                      x2="7.5"
                      y2="15"
                      stroke="var(--vermilion)"
                      strokeOpacity="0.55"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="7.5"
                      x2="15"
                      y2="7.5"
                      stroke="var(--vermilion)"
                      strokeOpacity="0.55"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
              ))
            )}

            <div className="grid grid-cols-2 max-sm:grid-cols-1">
              {serviceKeys.map((key, i) => (
                <div
                  key={key}
                  className={`group flex flex-col p-10 border-foreground/15 max-md:p-7 ${cellBorder[i]}`}
                >
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-light text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="text-foreground/[0.10] transition-colors duration-500 group-hover:text-accent/25">
                      {serviceIcons[key]}
                    </div>
                  </div>

                  <h3 className="mb-2.5 text-xl font-semibold text-foreground">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mb-6 max-w-[42ch] text-sm leading-[1.8] text-muted">
                    {t(`${key}.description`)}
                  </p>
                  <span className="mt-auto inline-block w-fit rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-xs font-light lowercase text-muted">
                    {t(`${key}.tag`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
