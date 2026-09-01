import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Caption } from "@/components/ui/Caption";
import { TornEdge } from "@/components/art/TornEdge";
import { Grasses } from "@/components/art/Grasses";

const stepKeys = ["ideation", "prototype", "production", "launch"] as const;

export async function Process() {
  const t = await getTranslations("process");

  return (
    <section
      id="process"
      className="paper-grain relative bg-sage pb-32 pt-32 max-md:pb-20 max-md:pt-20"
    >
      <TornEdge fill="var(--sage)" variant={2} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <Caption className="mb-6">{t("label")}</Caption>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <h2 className="mb-20 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-foreground max-md:mb-14">
            {t("title")}
          </h2>
        </AnimateOnScroll>

        {/* Four stations pegged along one horizontal rule — the thread's
            counterpart, running across instead of down. */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[7px] h-px bg-foreground/15 max-md:bottom-0 max-md:left-[7px] max-md:right-auto max-md:top-0 max-md:h-auto max-md:w-px"
          />
          <div className="grid grid-cols-4 gap-10 max-md:grid-cols-1 max-md:gap-12 max-md:pl-10">
            {stepKeys.map((key, i) => (
              <AnimateOnScroll key={key} delay={0.1 * (i + 1)}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[10px] top-0 block h-[15px] w-[15px] rounded-full border border-accent bg-sage max-md:-left-[41px]"
                  />
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-[5px] block h-[5px] w-[5px] rounded-full bg-accent max-md:-left-[36px]"
                  />
                  <div className="pt-10 max-md:pt-0">
                    <div className="mb-3 font-mono text-xs font-light text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="max-w-[34ch] text-sm font-light leading-[1.8] text-muted">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Grass horizon closing the band out */}
      <Grasses className="absolute inset-x-0 bottom-0 z-10" opacity={0.42} />
    </section>
  );
}
