"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("common");
  return (
    <a
      href="#contenu"
      className="bg-ink sr-only text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:px-4 focus:py-3"
    >
      {t("skip")}
    </a>
  );
}
