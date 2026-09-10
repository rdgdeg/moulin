import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getSettings } from "@/lib/content";
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

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/repas.jpg"
      />
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 bg-moss px-8 py-14 text-white lg:grid-cols-2 lg:px-14 lg:py-16">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
              {t("serviceKicker")}
            </p>
            <p className="text-[0.7rem] mt-6 uppercase tracking-[0.2em] text-white/80">
              {t("priceLabel")}
            </p>
            <p className="font-display mt-3 text-5xl sm:text-6xl">{settings.homeMealPrice}</p>
            <p className="mt-4 text-xl text-white/90">{settings.homeMealFormula}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{t("lead")}</p>
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex bg-white px-6 py-3 text-sm font-medium text-moss transition duration-300 hover:bg-white/90"
            >
              {common("call")} {site.phone}
            </a>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/repas/formule.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {(["daily", "texture", "human"] as const).map((key, index) => (
              <Reveal key={key} delay={index * 80}>
                <article className="border-t border-moss pt-5">
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
          <Reveal className="h-full bg-white px-8 py-14 lg:px-14 lg:py-16">
            <h2 className="font-display text-4xl">{t("zoneTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone">{t("zoneLead")}</p>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden">
              <Image
                src="/images/repas/livraison.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
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
