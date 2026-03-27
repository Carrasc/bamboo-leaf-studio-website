"use client";

import { useState, useEffect, type ReactNode } from "react";

type NavLink = {
  href: string;
  label: string;
};

type Props = {
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
  children: ReactNode;
};

export function MobileNav({
  links,
  contactLabel,
  contactHref,
  children,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-[1000] w-full border-b transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-card-border/60 bg-surface/80 backdrop-blur-xl backdrop-saturate-[1.8]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold tracking-tight"
            onClick={closeMenu}
          >
            <span className="text-foreground">Bamboo</span>
            <span className="font-light text-muted">Leaf</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contactHref}
                className="rounded-lg border border-foreground px-5 py-2.5 text-sm font-semibold tracking-wide text-foreground transition-all hover:-translate-y-0.5 hover:opacity-70"
              >
                {contactLabel}
              </a>
            </li>
          </ul>

          {/* Controls */}
          <div className="hidden items-center gap-3 md:flex">{children}</div>

          {/* Mobile toggle — z-[1001] keeps it above the overlay */}
          <div className="relative z-[1001] flex items-center gap-3 md:hidden">
            {children}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex flex-col gap-[5px] p-1"
              aria-label="Toggle navigation"
            >
              <span
                className={`block h-[2px] w-5 bg-foreground transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 translate-y-[7px] rotate-45"
                    : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-foreground transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-foreground transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 -translate-y-[7px] -rotate-45"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — sibling of nav to avoid backdrop-filter stacking context conflict */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 bg-surface backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="text-2xl font-light text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
        <a
          href={contactHref}
          onClick={closeMenu}
          className="mt-4 rounded-lg bg-foreground px-8 py-3 text-base font-semibold text-white"
        >
          {contactLabel}
        </a>
      </div>
    </>
  );
}
