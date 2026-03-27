import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const valueKeys = [
  "design_first",
  "user_experience",
  "innovation",
  "minimalism",
] as const;

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="bg-surface-alt py-32 max-md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 items-start gap-24 max-lg:grid-cols-1 max-lg:gap-16">

          {/* Text column */}
          <div>
            <AnimateOnScroll>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-accent">
                {t("label")}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="mb-10 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
                {t("title_line1")}
                <br />
                {t("title_line2")}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="mb-5 text-base leading-relaxed text-muted">
                {t("description_1")}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.25}>
              <p className="text-base leading-relaxed text-muted">
                {t("description_2")}
              </p>
            </AnimateOnScroll>
          </div>

          {/* Values — numbered list */}
          <AnimateOnScroll delay={0.3}>
            <div className="flex flex-col gap-8">
              {valueKeys.map((key, i) => (
                <div
                  key={key}
                  className="flex gap-5 rounded-lg p-6 transition-colors hover:bg-foreground/[0.03]"
                >
                  <span className="min-w-[28px] pt-1 text-xs font-bold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-foreground">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm font-light text-muted">
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
