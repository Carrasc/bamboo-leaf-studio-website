import { Poppins, Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Japanese fallback, applied only on /ja — a 25 kB preload that renders no
// glyph at all on the latin locales, since Poppins wins every codepoint there.
// All four weights resolve to the same variable-font file, so listing them
// costs nothing beyond the axis range.
export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  // next/font preloads every font in a route's module graph, whether or not the
  // markup ends up referencing it — so without this the latin locales paid for
  // Noto on the critical path. Opting out plus the locale gate in the layout
  // means en/es never request the file at all, and /ja fetches it when the
  // first CJK glyph needs it and swaps, exactly as `display: "swap"` intends.
  preload: false,
});

// Field-journal captions and labels. Light weights only — these are annotations,
// never body copy.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-plex-mono",
  display: "swap",
});
