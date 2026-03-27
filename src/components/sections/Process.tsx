import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const stepKeys = ["ideation", "prototype", "production", "launch"] as const;

export async function Process() {
  const t = await getTranslations("process");

  return (
    <section id="process" className="bg-surface-alt py-32 max-md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-accent">
            {t("label")}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <h2 className="mb-16 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground max-md:mb-12">
            {t("title")}
          </h2>
        </AnimateOnScroll>

        <div className="flex items-start justify-center max-md:flex-col max-md:items-center max-md:gap-2">
          {stepKeys.map((key, i) => (
            <AnimateOnScroll
              key={key}
              delay={0.1 * (i + 1)}
              className="contents"
            >
              <>
                <div className="max-w-[260px] flex-1 px-6 text-center max-md:max-w-full max-md:py-6">
                  <div className="mb-4 text-[2.5rem] font-bold leading-none text-foreground/[0.08]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
                {i < stepKeys.length - 1 && (
                  <div className="mt-7 h-px w-[60px] shrink-0 bg-gradient-to-r from-card-border via-foreground/10 to-card-border max-md:mt-0 max-md:h-10 max-md:w-px max-md:bg-gradient-to-b" />
                )}
              </>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
