import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
      <p className="mb-8 max-w-md text-muted">{t("description")}</p>
      <Link
        href="/"
        className="rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-surface transition-transform hover:-translate-y-0.5"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
