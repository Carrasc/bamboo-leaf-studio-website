export const SITE_URL = "https://bambooleafstudios.com";
export const CONTACT_EMAIL = "luiscbilbao@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/luisfcarrasco/";
export const TWITTER_URL = "https://x.com/bambooleafstdio";
export const INSTAGRAM_URL = "https://www.instagram.com/bambooleafstudio/";

export type PortfolioProject = {
  slug: string;
  href: string;
  image: string | null;
  linkType: "appStore" | "website";
  tags: string[];
  gradient: string | null;
  icon: "calculator" | "globe" | "music" | null;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "liquid-piano",
    href: "https://apps.apple.com/us/app/liquid-piano/id6758108114",
    image: "/images/liquid-piano-icon.png",
    linkType: "appStore",
    tags: ["iOS", "Music", "Free"],
    gradient: null,
    icon: null,
  },
  {
    slug: "calculadora-aranceles",
    href: "https://calculadora-camsam.vercel.app",
    image: null,
    linkType: "website",
    tags: ["Web App", "Next.js", "B2B"],
    gradient: "from-[#7AC279] to-[#4a9a49]",
    icon: "calculator",
  },
  {
    slug: "notegrid",
    href: "https://apps.apple.com/us/app/notegrid-play-music-by-ear/id6452839894",
    image: "/images/512x512.png",
    linkType: "appStore",
    tags: ["iOS", "Music", "B2B"],
    gradient: null,
    icon: null,
  },
  {
    slug: "wimbo",
    href: "https://apps.apple.com/us/app/learn-music-wimbo-piano-tutor/id1630555349",
    image: "/images/WimboIcon180.png",
    linkType: "appStore",
    tags: ["iOS", "Music", "B2B"],
    gradient: null,
    icon: null,
  },
  {
    slug: "tapmap",
    href: "https://apps.apple.com/mx/app/tapmap/id6738144322",
    image: null,
    linkType: "appStore",
    tags: ["iOS", "Education", "B2B"],
    gradient: "from-[#4A90D9] to-[#2B5EA7]",
    icon: "globe",
  },
];
