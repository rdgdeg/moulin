import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { WeeklyMenu } from "@/components/WeeklyMenu";
import { ContactForm } from "@/components/ContactForm";
import { PhotoMosaic } from "@/components/PhotoMosaic";
import { Reveal } from "@/components/Reveal";
import { getMenu, getSettings } from "@/lib/content";
import { site } from "@/lib/site";
import { ClockIcon, RestaurantIcon } from "@/components/Icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("restaurantTitle")} · ${t("siteName")}`,
    description: t("restaurantDescription"),
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("restaurant");
  const common = await getTranslations("common");
  const menu = await getMenu();
  const settings = await getSettings();
  const reviews = t.raw("reviews") as { quote: string; author: string }[];

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/restaurant.jpg"
      />
      <section className="bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="font-display mb-8 text-4xl">{t("menuTitle")}</h2>
          </Reveal>
          <Reveal delay={80}>
            <WeeklyMenu menu={menu} />
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="flex flex-col justify-between bg-moss px-8 py-10 text-white sm:px-10">
            <div>
              <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80">
                <ClockIcon className="h-4 w-4" />
                {t("hoursTitle")}
              </p>
              <p className="font-display mt-5 text-4xl sm:text-[2.75rem]">
                {settings.lunchFrom} – {settings.lunchTo}
              </p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/90">
                {t("hoursShort")}
              </p>
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
              <RestaurantIcon className="h-6 w-6 text-moss" />
              <h2 className="font-display mt-4 text-3xl">{t("takeaway")}</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
                {t("takeawayText")}
              </p>
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
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid min-w-0 max-w-7xl lg:grid-cols-2">
          <Reveal className="h-full min-w-0 bg-white px-5 py-14 lg:px-14 lg:py-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl">{t("reviewsTitle")}</h2>
                <p className="mt-3 max-w-md text-stone">{t("reviewsLead")}</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-moss">{site.rating}</p>
                <p className="mt-1 text-xs tracking-[0.16em] text-stone uppercase">
                  {t("ratingLabel")}
                </p>
              </div>
            </div>
            <div className="grid gap-5">
              {reviews.map((review) => (
                <blockquote key={review.quote} className="border-l-2 border-moss pl-5">
                  <p className="text-base leading-relaxed">“{review.quote}”</p>
                  <footer className="mt-3 text-sm text-stone">{review.author}</footer>
                </blockquote>
              ))}
            </div>
          </Reveal>
          <Reveal className="h-full min-w-0 bg-paper-soft px-5 py-14 lg:px-14 lg:py-16" delay={120}>
            <h2 className="font-display text-4xl">{t("formTitle")}</h2>
            <p className="mt-3 mb-8 text-stone">{t("formLead")}</p>
            <Suspense>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
      <PhotoMosaic
        title={t("galleryTitle")}
        photos={[
          {
            src: "/images/restaurant/veranda.jpg",
            caption: t("photos.veranda"),
            className: "col-span-2 row-span-2 min-h-72 lg:min-h-[28rem]",
          },
          {
            src: "/images/restaurant/plat.jpg",
            caption: t("photos.plat"),
          },
          {
            src: "/images/hero/restaurant.jpg",
            caption: t("photos.hero"),
          },
          {
            src: "/images/restaurant/table.jpg",
            caption: t("photos.table"),
          },
          {
            src: "/images/lieu/parc.jpg",
            caption: t("photos.parc"),
          },
          {
            src: "/images/salles/restaurant-salle.jpg",
            caption: t("photos.salle"),
            className: "col-span-2 min-h-52 lg:col-span-4",
          },
        ]}
      />
    </>
  );
}
