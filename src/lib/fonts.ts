import { Poppins, Noto_Sans_JP, IBM_Plex_Mono } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// Field-journal captions and labels. Light weights only — these are annotations,
// never body copy.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-plex-mono",
  display: "swap",
});
