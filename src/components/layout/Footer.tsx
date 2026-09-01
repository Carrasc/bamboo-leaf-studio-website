import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, TWITTER_URL } from "@/lib/constants";
import { Mail } from "lucide-react";
import { TornEdge } from "@/components/art/TornEdge";
import { Hanko } from "@/components/art/Marks";

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="paper-grain relative bg-surface pb-10 pt-24">
      <TornEdge fill="var(--surface)" variant={2} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="mb-16 grid grid-cols-[2fr_1fr_1fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
          {/* Brand */}
          <div>
            <a href="#hero" className="inline-flex items-center gap-3 text-xl font-bold tracking-tight">
              <Hanko size={30} className="opacity-80" />
              <span className="text-foreground">Bamboo</span>
              <span className="font-light text-muted">Leaf</span>
            </a>
            <p className="mt-4 max-w-[300px] text-sm font-light leading-[1.8] text-muted">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="mb-5 font-mono text-xs font-light lowercase tracking-[0.06em] text-accent">
              {t("footer.nav_title")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="#about"
                className="w-fit text-sm font-light text-muted transition-colors hover:text-accent"
              >
                {t("nav.about")}
              </a>
              <a
                href="#services"
                className="w-fit text-sm font-light text-muted transition-colors hover:text-accent"
              >
                {t("nav.services")}
              </a>
              <a
                href="#process"
                className="w-fit text-sm font-light text-muted transition-colors hover:text-accent"
              >
                {t("nav.process")}
              </a>
              <a
                href="#portfolio"
                className="w-fit text-sm font-light text-muted transition-colors hover:text-accent"
              >
                {t("nav.work")}
              </a>
              <a
                href="#contact"
                className="w-fit text-sm font-light text-muted transition-colors hover:text-accent"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>

          {/* Connect links */}
          <div>
            <h4 className="mb-5 font-mono text-xs font-light lowercase tracking-[0.06em] text-accent">
              {t("footer.connect_title")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex w-fit items-center gap-2 text-sm font-light text-muted transition-colors hover:text-accent"
              >
                <Mail size={16} strokeWidth={1.5} className="shrink-0" />
                {t("footer.email")}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-sm font-light text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                {t("footer.instagram")}
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-sm font-light text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {t("footer.twitter")}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-sm font-light text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <line x1="8" y1="11" x2="8" y2="16" />
                  <line x1="8" y1="8" x2="8" y2="8.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 0 0-4 0" />
                </svg>
                {t("footer.linkedin")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-foreground/10 pt-10 max-md:flex-col max-md:gap-2 max-md:text-center">
          <p className="font-mono text-xs font-light text-muted">
            {t("footer.copyright")}
          </p>
          <p className="font-mono text-xs font-light text-muted">
            {t("footer.location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
