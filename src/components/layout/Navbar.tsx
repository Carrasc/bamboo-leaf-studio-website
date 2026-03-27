import { getTranslations } from "next-intl/server";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export async function Navbar() {
  const t = await getTranslations("nav");

  const links = [
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    { href: "#process", label: t("process") },
    { href: "#portfolio", label: t("work") },
  ];

  return (
    <MobileNav
      links={links}
      contactLabel={t("contact")}
      contactHref="#contact"
    >
      <LanguageSwitcher />
    </MobileNav>
  );
}
