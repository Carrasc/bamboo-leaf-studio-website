import { getTranslations } from "next-intl/server";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { HeroAmbient } from "@/components/ui/HeroAmbient";
import { Caption } from "@/components/ui/Caption";
import { Bamboo } from "@/components/art/Bamboo";
import { Asterisk, Hanko } from "@/components/art/Marks";

const ROTATING_KEYS = [0, 1, 2, 3, 4] as const;

export async function Hero() {
  const t = await getTranslations("hero");
  const words = ROTATING_KEYS.map((i) => t(`rotating.${i}`));

  return (
    <section
      id="hero"
      className="paper-grain relative flex min-h-screen items-center overflow-hidden bg-surface"
    >
      {/* Everything that moves in the hero lives inside HeroAmbient, which
          stops all of it the moment the hero leaves the viewport. The wrapper
          is `inset-0` on the section, so the bamboo still resolves its
          bottom-right anchor against exactly the box it did before. */}
      <HeroAmbient>
        {/* The stand the studio is named for. Anchored to the baseline, drifting
            off the right edge so it reads as a fragment of something larger. */}
        <Bamboo
          className="absolute bottom-0 right-0 h-[82vh] w-[46vw] opacity-70 max-lg:h-[46vh] max-lg:w-[76vw] max-lg:opacity-30"
          count={5}
        />
      </HeroAmbient>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-40 max-md:py-28">
        <div className="max-w-[720px]">
          <Caption className="mb-10">{t("label")}</Caption>

          <h1 className="mb-8 text-[clamp(2.15rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-foreground">
            {t("title")}{" "}
            <RotatingWords words={words} className="font-normal text-accent" />
          </h1>

          <div className="mb-12 flex w-full max-w-[560px] items-start gap-4">
            <Asterisk className="mt-2 shrink-0" size={13} />
            <p className="min-w-0 text-lg font-light leading-relaxed text-muted">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 max-md:flex-col max-md:items-start">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-mono text-sm font-light lowercase tracking-wide text-surface transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
            >
              {t("cta_primary")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <a
              href="#contact"
              className="inline-block rounded-full border border-foreground/25 px-8 py-4 font-mono text-sm font-light lowercase tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/60"
            >
              {t("cta_secondary")}
            </a>
          </div>
        </div>
      </div>

      {/* The studio's seal, bottom-left, the way a drawing is stamped. */}
      <Hanko className="absolute bottom-12 left-6 opacity-70 max-md:hidden" size={42} />
    </section>
  );
}
