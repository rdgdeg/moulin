"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export function FloatingActions() {
  const t = useTranslations("common");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        <Link
          href="/contact"
          aria-label={t("book")}
          title={t("book")}
          className="flex h-12 w-12 items-center justify-center bg-moss text-white shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
        </Link>
        <a
          href={`mailto:${site.email}`}
          aria-label={t("email")}
          title={t("email")}
          className="flex h-12 w-12 items-center justify-center bg-ink text-white shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 7 9-7" />
          </svg>
        </a>
      </div>
      <a
        href={site.phoneHref}
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-14 items-center justify-center gap-2 bg-moss px-4 pt-3.5 text-sm font-semibold tracking-wide text-white md:hidden"
        style={{ paddingBottom: "max(0.85rem, env(safe-area-inset-bottom))" }}
      >
        <PhoneIcon className="h-5 w-5" />
        {t("callBar")}
      </a>
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-3 bottom-[4.75rem] z-40 flex h-11 w-11 items-center justify-center bg-moss text-white shadow-lg md:right-5 md:bottom-5"
          aria-label={t("backToTop")}
          title={t("backToTop")}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      ) : null}
    </>
  );
}
