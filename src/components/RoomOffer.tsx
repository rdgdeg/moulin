import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { RoomServiceIcon } from "./RoomServiceIcon";
import { Reveal } from "./Reveal";

const services = [
  "catering",
  "parking",
  "pmr",
  "equipment",
  "wifi",
  "park",
  "staff",
] as const;

export async function RoomOffer() {
  const t = await getTranslations("rooms");

  return (
    <section className="bg-paper-soft">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-moss">
            {t("servicesKicker")}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl">{t("servicesTitle")}</h2>
          <p className="mt-4 max-w-2xl text-lg text-stone">{t("servicesLead")}</p>
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((key, index) => (
            <li key={key}>
              <Reveal delay={index * 70}>
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-moss text-white">
                    <RoomServiceIcon id={key} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{t(`services.${key}`)}</h3>
                    <p className="mt-2 text-stone">{t(`services.${key}Text`)}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function RoomQuote({ children }: { children: ReactNode }) {
  const t = await getTranslations("rooms");

  return (
    <section className="bg-white pb-16 lg:pb-20">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <Reveal className="h-full bg-moss px-8 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/80">
            {t("pricingKicker")}
          </p>
          <h2 className="font-display mt-3 text-4xl">{t("pricingTitle")}</h2>
          <p className="mt-5 text-lg text-white/90">{t("pricingLead")}</p>
          <p className="mt-6 text-white/85">{t("pricingNote")}</p>
          <div className="mt-10 border border-white/30 px-7 py-7">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
              {t("pricingValueLabel")}
            </p>
            <p className="font-display mt-3 text-5xl">{t("pricingValue")}</p>
            <ul className="mt-6 space-y-2 text-sm text-white/85">
              {(t.raw("pricingFactors") as string[]).map((factor) => (
                <li key={factor}>— {factor}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="h-full bg-paper-soft px-8 py-12 sm:px-10 lg:px-14 lg:py-16" delay={120}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
