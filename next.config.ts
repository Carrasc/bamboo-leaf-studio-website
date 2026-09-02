import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // AVIF first. The portfolio banners are flat-toned site screenshots — large
    // areas of near-uniform colour — which is exactly where AVIF pulls well
    // ahead of WebP, and every one of them is a 200px-tall card.
    formats: ["image/avif", "image/webp"],
    // The optimizer keys its cache on the source *path*, not the file contents,
    // so this is also how long a replaced-in-place banner keeps serving the old
    // crop from the CDN. Thirty days is a real improvement on the 60s default
    // without turning the swap-a-banner workflow into a year-long mistake —
    // if you do replace one, redeploy rather than waiting this out.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default withNextIntl(nextConfig);
