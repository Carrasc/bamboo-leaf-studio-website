import { getTranslations } from "next-intl/server";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { HeroShader } from "@/components/ui/HeroShader";

const ROTATING_KEYS = [0, 1, 2, 3, 4] as const;

export async function Hero() {
  const t = await getTranslations("hero");
  const words = ROTATING_KEYS.map((i) => t(`rotating.${i}`));

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface"
    >
      <HeroShader />

      {/* Decorative accent bar */}
      <div className="absolute left-0 top-0 z-10 h-full w-1 bg-accent" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-40 max-md:py-28">
        <div className="max-w-[720px]">
          <h1 className="mb-8 text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
            {t("title")}{" "}
            <RotatingWords words={words} className="text-accent" />
          </h1>

          <p className="mb-12 max-w-[520px] text-lg font-light leading-relaxed text-muted">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-4 max-md:flex-col max-md:items-start">
            <a
              href="#portfolio"
              className="inline-block rounded-lg bg-foreground px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
            >
              {t("cta_primary")}
            </a>
            <a
              href="#contact"
              className="inline-block rounded-lg border border-foreground px-8 py-4 text-sm font-semibold tracking-wide text-foreground transition-all hover:-translate-y-0.5 hover:opacity-70"
            >
              {t("cta_secondary")}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
