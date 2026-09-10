import { getTranslations } from "next-intl/server";
import { weekDays } from "@/lib/site";
import type { WeeklyMenu } from "@/lib/content";

export async function WeeklyMenu({
  menu,
  compact = false,
  showNote = true,
}: {
  menu: WeeklyMenu;
  compact?: boolean;
  showNote?: boolean;
}) {
  const t = await getTranslations("restaurant");
  const days = await getTranslations("days");

  return (
    <div className="overflow-hidden border border-ink/10 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 bg-moss px-6 py-5 text-white">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/80">
            {t("menuTitle")}
          </p>
          <p className="mt-1 text-xl font-semibold">{menu.weekLabel}</p>
        </div>
        {showNote && menu.note ? (
          <p className="max-w-sm text-sm text-white/80">{menu.note}</p>
        ) : null}
      </div>
      <div
        className={`divide-y divide-ink/10 ${compact ? "" : "md:grid md:grid-cols-5 md:divide-x md:divide-y-0"}`}
      >
        {weekDays.map((day) => {
          const item = menu.days[day];
          return (
            <article key={day} className="px-5 py-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-moss">
                {days(day)}
              </p>
              <p className="mt-3 text-base leading-snug font-medium">{item.dish}</p>
              {!compact && item.suggestions?.length ? (
                <ul className="mt-3 space-y-1 text-sm text-stone">
                  {item.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
