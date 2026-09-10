"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { skills } from "@/lib/skills";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { FacebookIcon } from "./FacebookIcon";
import { ChevronDownIcon, CloseIcon, ContactIcon, MenuIcon } from "./Icons";

const links = [
  { href: "/" as const, key: "home" },
  { href: "/salles" as const, key: "rooms" },
  { href: "/restaurant" as const, key: "restaurant" },
  { href: "/repas-a-domicile" as const, key: "homeMeals" },
  { href: "/savoir-faire" as const, key: "craft" },
  { href: "/le-moulin" as const, key: "about" },
] as const;

function linkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const t = useTranslations("nav");
  const craftItems = useTranslations("craft.items");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [craftOpen, setCraftOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setCraftOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-moss after:transition-all hover:after:w-full ${
      linkActive(pathname, href) ? "after:w-full" : ""
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white text-ink transition ${
        scrolled ? "border-ink/10 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/" aria-label="Le Moulin de la Hunelle">
          <Logo size={64} className="h-14 w-14" priority />
        </Link>
        <nav
          className="hidden items-center gap-6 text-[0.72rem] font-medium tracking-[0.14em] uppercase lg:flex"
          aria-label="Navigation principale"
        >
          {links.map((link) =>
            link.key === "craft" ? (
              <div
                key={link.href}
                className="group relative"
                onMouseEnter={() => setCraftOpen(true)}
                onMouseLeave={() => setCraftOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setCraftOpen(false);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1 ${linkClass(link.href)}`}
                  aria-expanded={craftOpen}
                  aria-haspopup="true"
                  onFocus={() => setCraftOpen(true)}
                >
                  {t(link.key)}
                  <ChevronDownIcon className="h-3.5 w-3.5" />
                </Link>
                <div
                  className={`absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
                    craftOpen ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <ul className="border border-ink/10 bg-white py-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)]">
                    <li>
                      <Link
                        href="/savoir-faire"
                        className="block px-4 py-2.5 text-[0.72rem] font-semibold tracking-[0.08em] text-moss uppercase"
                      >
                        {t("allCraft")}
                      </Link>
                    </li>
                    {skills.map((skill) => (
                      <li key={skill.id}>
                        <Link
                          href={{
                            pathname: "/savoir-faire/[slug]",
                            params: { slug: skill.id },
                          }}
                          className={`block px-4 py-2 text-[0.85rem] font-medium tracking-normal normal-case transition hover:bg-paper-soft hover:text-moss ${
                            pathname === `/savoir-faire/${skill.id}` ? "text-moss" : ""
                          }`}
                        >
                          {craftItems(`${skill.id}.name`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {t(link.key)}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            aria-label={t("contact")}
            title={t("contact")}
            className={`text-ink hover:text-moss ${
              pathname.startsWith("/contact") ? "text-moss" : ""
            }`}
          >
            <ContactIcon className="h-5 w-5" />
          </Link>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.facebook}
            rel="noreferrer"
            target="_blank"
            aria-label="Facebook — Le Moulin de la Hunelle"
            className="text-ink hover:text-moss-deep"
          >
            <FacebookIcon />
          </a>
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="bg-moss px-4 py-2 text-[0.72rem] font-medium tracking-[0.12em] text-white uppercase"
          >
            {t("cta")}
          </Link>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/contact"
            aria-label={t("contact")}
            title={t("contact")}
            className="text-ink"
          >
            <ContactIcon className="h-5 w-5" />
          </Link>
          <a
            href={site.facebook}
            rel="noreferrer"
            target="_blank"
            aria-label="Facebook — Le Moulin de la Hunelle"
            className="text-ink"
          >
            <FacebookIcon />
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 px-1.5 text-[0.8rem] font-medium uppercase tracking-[0.12em]"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-ink/10 bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4 text-lg uppercase">
            {links.map((link) =>
              link.key === "craft" ? (
                <div key={link.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between font-medium uppercase"
                    aria-expanded={craftOpen}
                    onClick={() => setCraftOpen((value) => !value)}
                  >
                    {t(link.key)}
                    <ChevronDownIcon
                      className={`h-5 w-5 transition ${craftOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {craftOpen ? (
                    <ul className="mt-3 space-y-2 border-l border-moss/40 pl-4 text-base font-medium normal-case tracking-normal">
                      <li>
                        <Link href="/savoir-faire" className="text-moss">
                          {t("allCraft")}
                        </Link>
                      </li>
                      {skills.map((skill) => (
                        <li key={skill.id}>
                          <Link
                            href={{
                              pathname: "/savoir-faire/[slug]",
                              params: { slug: skill.id },
                            }}
                          >
                            {craftItems(`${skill.id}.name`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="font-medium">
                  {t(link.key)}
                </Link>
              ),
            )}
            <Link href="/contact" className="inline-flex items-center gap-2 font-medium">
              <ContactIcon className="h-5 w-5" />
              {t("contact")}
            </Link>
            <a
              href={site.facebook}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center gap-2 font-medium"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
          <div className="mt-6">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
