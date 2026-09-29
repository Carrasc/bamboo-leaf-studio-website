import { getFormatter, getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Caption } from "@/components/ui/Caption";
import { TornEdge } from "@/components/art/TornEdge";
import {
  PortfolioStage,
  type StageProject,
  type StageStat,
} from "@/components/ui/PortfolioStage";
import {
  MIN_RATINGS,
  portfolioProjects,
  type PortfolioProject,
} from "@/lib/constants";

export async function Portfolio() {
  const t = await getTranslations("portfolio");
  const format = await getFormatter();

  // Downloads on the left of the phone, rating on the right. Numbers go
  // through the locale formatter: 200K+ / 200 k+ / 20万+.
  const statsFor = ({ downloads, rating }: PortfolioProject): StageStat[] => {
    const stats: StageStat[] = [];
    if (downloads) {
      stats.push({
        value: `${format.number(downloads, { notation: "compact" })}+`,
        label: t("stats.downloads"),
      });
    }
    if (rating && rating.count >= MIN_RATINGS) {
      const average = format.number(rating.average, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      stats.push({
        value: average,
        label: t("stats.ratings", { count: rating.count }),
        star: true,
        spoken: t("stats.rated", { rating: average }),
      });
    }
    return stats;
  };

  // Resolve every string here, on the server; the stage only animates.
  const projects: StageProject[] = portfolioProjects.map((p) => ({
    slug: p.slug,
    kind: p.kind,
    href: p.href,
    host: new URL(p.href).host,
    image: p.image,
    tint: p.tint,
    name: t(`projects.${p.slug}.name`),
    tagline: t(`projects.${p.slug}.tagline`),
    description: t(`projects.${p.slug}.description`),
    kindLabel: t(`kinds.${p.kind}`),
    cta: t(`cta.${p.kind}`),
    tags: p.tags.map((tag) => t(`tags.${tag}`)),
    stats: statsFor(p),
  }));

  return (
    <section
      id="portfolio"
      className="paper-grain relative bg-surface py-32 max-md:py-20"
    >
      <TornEdge fill="var(--surface)" variant={0} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <AnimateOnScroll>
          <div className="mb-16 max-md:mb-10">
            <Caption className="mb-6">{t("label")}</Caption>
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-foreground">
              {t("title")}
            </h2>
          </div>
        </AnimateOnScroll>
        <PortfolioStage projects={projects} pickerLabel={t("picker_label")} />
      </div>
    </section>
  );
}
