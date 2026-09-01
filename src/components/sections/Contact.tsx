import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Caption } from "@/components/ui/Caption";
import { TornEdge } from "@/components/art/TornEdge";
import { Constellation } from "@/components/art/Constellation";
import { CONTACT_EMAIL } from "@/lib/constants";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-surface-dark py-36 max-md:py-24"
    >
      <TornEdge fill="var(--surface-dark)" variant={3} />

      <Constellation className="absolute inset-x-0 top-0 h-[55%]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-[640px] text-center">
            {/* On the night band the accent green finally has the contrast to
                carry text (10:1), so the caption keeps its rule. */}
            <Caption className="mb-8 justify-center !text-sage">
              {t("label")}
            </Caption>

            <h2 className="mb-6 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-surface">
              {t("title")}
            </h2>
            <p className="mb-14 text-base font-light leading-[1.85] text-surface/55">
              {t("description")}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-3 rounded-full bg-surface px-10 py-4 font-mono text-sm font-light lowercase tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage"
            >
              {t("cta")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>

            <p className="mt-8 font-mono text-xs font-light text-surface/55">
              {CONTACT_EMAIL}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
