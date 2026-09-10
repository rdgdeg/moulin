"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const KEY = "hunelle-cookies";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(KEY));
  }, []);

  if (!visible) return null;

  function choose(value: "accepted" | "refused") {
    window.localStorage.setItem(KEY, value);
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("hunelle-analytics"));
    }
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-ink bg-white p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
      role="dialog"
      aria-label={t("title")}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-base leading-relaxed text-ink">
          {t("text")}{" "}
          <Link href="/confidentialite" className="font-medium underline underline-offset-4">
            {t("more")}
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="min-h-12 bg-moss px-5 py-3 text-base font-medium text-white"
            onClick={() => choose("accepted")}
          >
            {t("accept")}
          </button>
          <button
            type="button"
            className="min-h-12 border-2 border-ink px-5 py-3 text-base font-medium"
            onClick={() => choose("refused")}
          >
            {t("refuse")}
          </button>
        </div>
      </div>
    </div>
  );
}
