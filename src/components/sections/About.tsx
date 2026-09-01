import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Caption } from "@/components/ui/Caption";
import { TornEdge } from "@/components/art/TornEdge";
import { Spiral } from "@/components/art/Marks";

const valueKeys = [
  "design_first",
  "user_experience",
  "innovation",
  "minimalism",
] as const;

export async function About() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      className="paper-grain relative bg-surface-alt py-32 max-md:py-20"
    >
      {/* Tears upward into the hero rather than butting against it. */}
      <TornEdge fill="var(--surface-alt)" variant={0} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 items-start gap-24 max-lg:grid-cols-1 max-lg:gap-16">
          {/* Text column */}
          <div>
            <AnimateOnScroll>
              <Caption className="mb-6">{t("label")}</Caption>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="mb-10 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-foreground">
                {t("title_line1")}
                <br />
                <span className="text-accent">{t("title_line2")}</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="mb-5 max-w-[46ch] text-base leading-[1.85] text-muted">
                {t("description_1")}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.25}>
              <p className="max-w-[46ch] text-base leading-[1.85] text-muted">
                {t("description_2")}
              </p>
            </AnimateOnScroll>
          </div>

          {/* Values — read as pinned index cards down the margin */}
          <AnimateOnScroll delay={0.3}>
            <div className="relative flex flex-col">
              <Spiral
                className="absolute -top-10 right-2 opacity-60 max-lg:hidden"
                size={30}
              />
              {valueKeys.map((key, i) => (
                <div
                  key={key}
                  className="flex gap-6 border-t border-foreground/10 py-7 first:border-t-0"
                >
                  <span className="mt-1 shrink-0 font-mono text-xs font-light text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-base font-semibold text-foreground">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-muted">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
