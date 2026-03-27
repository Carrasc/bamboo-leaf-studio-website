import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Carousel } from "@/components/ui/Carousel";
import { portfolioProjects } from "@/lib/constants";
import { Music } from "lucide-react";

function CalculatorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="12" y1="10" x2="14" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="12" y1="14" x2="14" y2="14" />
      <line x1="8" y1="18" x2="10" y2="18" />
      <line x1="12" y1="18" x2="16" y2="18" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const placeholderIcons = {
  calculator: <CalculatorIcon />,
  globe: <GlobeIcon />,
  music: <Music size={48} strokeWidth={1.5} />,
} as const;

export async function Portfolio() {
  const t = await getTranslations("portfolio");

  const cards = portfolioProjects.map((project) => (
    <a
      key={project.slug}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      {/* Image / icon */}
      <div className="flex justify-center bg-surface-alt px-6 py-8">
        {project.image ? (
          <Image
            src={project.image}
            alt={t(`projects.${project.slug}.name`)}
            width={120}
            height={120}
            className="rounded-[26px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          />
        ) : (
          <div
            className={`flex h-[120px] w-[120px] items-center justify-center rounded-[26px] bg-gradient-to-br ${project.gradient} text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
          >
            {project.icon && placeholderIcons[project.icon]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {t(`projects.${project.slug}.name`)}
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {t(`projects.${project.slug}.tagline`)}
            </p>
          </div>
          <span className="ml-4 shrink-0 rounded-full bg-accent/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-accent">
            {t("badge_live")}
          </span>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted">
          {t(`projects.${project.slug}.description`)}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-lg bg-surface-alt px-3 py-1.5 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hover:text-foreground">
          {project.linkType === "appStore" ? (
            <>
              <AppStoreIcon />
              <span>{t("link_app_store")}</span>
            </>
          ) : (
            <>
              <ExternalLinkIcon />
              <span>{t("link_website")}</span>
            </>
          )}
        </div>
      </div>
    </a>
  ));

  return (
    <section id="portfolio" className="overflow-hidden bg-surface py-32 max-md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <div className="mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-accent">
              {t("label")}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
              {t("title")}
            </h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <Carousel>{cards}</Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
