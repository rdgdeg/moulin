import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { WeeklyMenu } from "@/components/WeeklyMenu";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { DeliveryIcon } from "@/components/Icons";
import { getMenu, getSettings } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("homeMealsTitle")} · ${t("siteName")}`,
    description: t("homeMealsDescription"),
  };
}

export default async function MealsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meals");
  const common = await getTranslations("common");
  const settings = await getSettings();
  const menu = await getMenu();
  const communes = t.raw("communes") as string[];

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/repas.jpg"
      />
      <section className="bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="font-display mb-3 text-4xl">{t("menuTitle")}</h2>
            <p className="mb-8 max-w-2xl text-stone">{t("menuLead")}</p>
          </Reveal>
          <Reveal delay={80}>
            <WeeklyMenu menu={menu} showNote={false} />
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="flex flex-col justify-between bg-moss px-8 py-10 text-white sm:px-10">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("priceLabel")}
              </p>
              <p className="font-display mt-5 text-5xl sm:text-[3.25rem]">
                {settings.homeMealPrice}
              </p>
              <p className="mt-4 text-xl text-white/90">{settings.homeMealFormula}</p>
            </div>
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex w-fit bg-white px-5 py-3 text-sm font-medium text-moss transition duration-300 hover:bg-white/90"
            >
              {common("call")} {site.phone}
            </a>
          </Reveal>
          <Reveal
            className="flex flex-col justify-between border border-ink/10 bg-paper-soft px-8 py-10 sm:px-10"
            delay={100}
          >
            <div>
              <DeliveryIcon className="h-6 w-6 text-moss" />
              <h2 className="font-display mt-4 text-3xl">{t("zoneTitle")}</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
                {t("zoneLead")}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {communes.map((commune) => (
                  <li
                    key={commune}
                    className="bg-white px-3 py-1.5 text-sm text-ink"
                  >
                    {commune}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex w-fit bg-moss px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-moss-deep"
            >
              {common("call")} {site.phone}
            </a>
          </Reveal>
        </div>
      </section>
      <section className="bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {(["daily", "texture", "human"] as const).map((key, index) => (
              <Reveal key={key} delay={index * 80}>
                <article className="h-full border border-ink/10 bg-white px-6 py-7">
                  <h2 className="font-display text-2xl">{t(`points.${key}.title`)}</h2>
                  <p className="mt-4 text-stone">{t(`points.${key}.text`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <Reveal className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
            <Image
              src="/images/repas/livraison.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </Reveal>
          <Reveal className="h-full bg-paper-soft px-8 py-14 lg:px-14 lg:py-16" delay={120}>
            <h2 className="font-display text-4xl">{t("formTitle")}</h2>
            <p className="mt-3 mb-8 text-stone">{t("formLead")}</p>
            <Suspense>
              <ContactForm defaultObject="repas" />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
