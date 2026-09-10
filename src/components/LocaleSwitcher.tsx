"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const labels: Record<string, string> = { fr: "FR", nl: "NL" };

export function LocaleSwitcher({ inverted = false }: { inverted?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em] ${
        inverted ? "text-white/80" : "text-stone"
      }`}
    >
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() =>
            router.replace(
              { pathname, params } as Parameters<typeof router.replace>[0],
              { locale: code },
            )
          }
          className={`rounded-full px-2 py-1 transition ${
            locale === code
              ? inverted
                ? "bg-white text-ink"
                : "bg-moss text-white"
              : "hover:text-ink"
          }`}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
