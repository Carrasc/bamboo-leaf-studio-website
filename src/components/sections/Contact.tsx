import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { CONTACT_EMAIL } from "@/lib/constants";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="bg-surface-dark py-32 max-md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-[600px] text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-accent">
              {t("label")}
            </p>
            <h2 className="mb-6 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              {t("title")}
            </h2>
            <p className="mb-12 text-base leading-relaxed text-white/50">
              {t("description")}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block rounded-lg bg-white px-10 py-4 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-white/90"
            >
              {t("cta")}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
