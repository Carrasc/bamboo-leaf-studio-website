import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { poppins, notoSansJP, plexMono } from "@/lib/fonts";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://bambooleafstudios.com"),
    icons: {
      icon: "/images/Bamboo_leaf_logo.png",
      apple: "/images/Bamboo_leaf_logo.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://bambooleafstudios.com",
      siteName: "Bamboo Leaf Studios",
      locale,
      type: "website",
      images: [{ url: "/images/Bamboo_leaf_logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/Bamboo_leaf_logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${poppins.variable} ${notoSansJP.variable} ${plexMono.variable}`}>
      <head>
        {/* framer-motion renders these reveals at opacity:0 on the server. If
            JS never runs, the whole page below the hero would stay blank. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-surface font-sans leading-relaxed antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
