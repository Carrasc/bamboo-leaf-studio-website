export const SITE_URL = "https://bambooleafstudios.com";
export const CONTACT_EMAIL = "luiscbilbao@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/luisfcarrasco/";
export const TWITTER_URL = "https://x.com/bambooleafstdio";
export const INSTAGRAM_URL = "https://www.instagram.com/bambooleafstudio/";

export type ProjectKind = "website" | "web_app" | "ios";

/** Keys into `portfolio.tags` in the message files. */
export type ProjectTag =
  | "nextjs"
  | "ios"
  | "hospitality"
  | "b2b"
  | "music"
  | "education"
  | "free";

export type PortfolioProject = {
  slug: string;
  href: string;
  kind: ProjectKind;
  /**
   * Web kinds: a screenshot of the site's own hero, 1.75:1.
   * iOS: the square App Store icon.
   */
  image: string;
  /**
   * The project's own brand color, sampled from its icon or hero. Only ever
   * mixed ~12% into `card` to wash the stage, and used for the picker dot —
   * never as a text color, so it is data rather than a design token.
   */
  tint: string;
  tags: ProjectTag[];
  /**
   * App Store snapshot from the iTunes lookup API (`averageUserRating`,
   * `userRatingCount`; US store, MX for Tapmap), taken 2026-09-28. Shown only
   * at MIN_RATINGS or more, so a lone 5.0 never stands in for a reputation.
   */
  rating?: { average: number; count: number };
  /** Lifetime downloads, from App Store Connect — Apple doesn't publish them. */
  downloads?: number;
};

export const MIN_RATINGS = 10;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "konohanatei",
    href: "https://konohanatei.vercel.app",
    kind: "website",
    image: "/images/konohanatei-site.jpg",
    tint: "#8e3b2a",
    tags: ["nextjs", "hospitality"],
  },
  {
    slug: "carrasco-arquitectos",
    href: "https://carrasco-arquitectos.vercel.app",
    kind: "website",
    image: "/images/carrasco-arquitectos-site.jpg",
    tint: "#6b5645",
    tags: ["nextjs", "b2b"],
  },
  {
    slug: "calculadora-aranceles",
    href: "https://calculadora-camsam.vercel.app",
    kind: "web_app",
    image: "/images/calculadora-aranceles-site.jpg",
    tint: "#3a3632",
    tags: ["nextjs", "b2b"],
  },
  {
    slug: "liquid-piano",
    href: "https://apps.apple.com/us/app/liquid-piano/id6758108114",
    kind: "ios",
    image: "/images/liquid-piano-icon.png",
    tint: "#4f9f88",
    tags: ["ios", "music", "free"],
  },
  {
    slug: "notegrid",
    href: "https://apps.apple.com/us/app/notegrid-play-music-by-ear/id6452839894",
    kind: "ios",
    image: "/images/notegrid-icon.png",
    tint: "#1f5a63",
    tags: ["ios", "music", "b2b"],
    rating: { average: 4.67, count: 572 },
    downloads: 200_000,
  },
  {
    slug: "wimbo",
    href: "https://apps.apple.com/us/app/learn-music-wimbo-piano-tutor/id1630555349",
    kind: "ios",
    image: "/images/wimbo-icon.png",
    tint: "#7d82cf",
    tags: ["ios", "music", "b2b"],
    rating: { average: 4.96, count: 24 },
  },
  {
    slug: "tapmap",
    href: "https://apps.apple.com/mx/app/tapmap/id6738144322",
    kind: "ios",
    image: "/images/tapmap-icon.png",
    tint: "#1f7fc9",
    tags: ["ios", "education", "b2b"],
    rating: { average: 5, count: 1 },
  },
];
