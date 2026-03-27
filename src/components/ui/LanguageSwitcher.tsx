"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ja: "JP",
};

const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇲🇽",
  ja: "🇯🇵",
};

const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ja: "日本語",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(nextLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-medium text-muted transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {localeLabels[locale]}
        <ChevronDown size={12} strokeWidth={2} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-xl bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === locale}
                onClick={() => switchLocale(l)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-alt ${
                  l === locale
                    ? "font-medium text-foreground"
                    : "text-muted"
                }`}
              >
                <span>{localeFlags[l]}</span>
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
