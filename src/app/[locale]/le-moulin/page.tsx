import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("aboutTitle")} · ${t("siteName")}`,
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/hunelle.jpg"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {[
            [t("stats.year"), String(site.founded)],
            [t("stats.people"), `~${site.staff}`],
            [t("stats.rooms"), "4"],
            [t("stats.eta"), t("eta")],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-moss pt-5">
              <p className="font-display text-3xl">{value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-stone">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 max-w-3xl text-lg leading-relaxed text-stone">{t("story")}</p>
      </section>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 bg-moss px-8 py-14 text-white lg:grid-cols-2 lg:px-14 lg:py-16">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/images/lieu/parc.jpg" alt="" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <h2 className="font-display text-4xl">{t("accessTitle")}</h2>
            <p className="mt-5 text-lg text-white/90">{t("access")}</p>
          </div>
        </div>
      </section>
      <section className="bg-paper-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <h2 className="font-display text-4xl">{t("valuesTitle")}</h2>
          <p className="mt-5 max-w-3xl text-lg text-stone">{t("valuesText")}</p>
        </div>
      </section>
    </>
  );
}
