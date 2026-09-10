import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { FacebookIcon } from "@/components/FacebookIcon";
import { PageHero } from "@/components/PageHero";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { getSettings } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("contactTitle")} · ${t("siteName")}`,
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const common = await getTranslations("common");
  const settings = await getSettings();

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/hunelle.jpg"
      />
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <a href={site.phoneHref} className="border border-ink/10 p-6 transition hover:border-moss">
            <PhoneIcon className="h-5 w-5 text-moss" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide">{common("call")}</p>
            <p className="mt-2 text-2xl font-semibold text-moss-deep">{site.phone}</p>
            <p className="mt-2 text-sm text-stone">{t("phoneHelp")}</p>
          </a>
          <a href={`mailto:${site.email}`} className="border border-ink/10 p-6 transition hover:border-moss">
            <MailIcon className="h-5 w-5 text-moss" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide">{common("email")}</p>
            <p className="mt-2 text-xl font-semibold break-all">{site.email}</p>
          </a>
          <div className="border border-ink/10 p-6">
            <PinIcon className="h-5 w-5 text-moss" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide">{t("addressLabel")}</p>
            <p className="mt-2 text-base leading-relaxed">
              {site.address}
              <br />
              {site.postal}
            </p>
            <p className="mt-3 text-sm text-stone">{t("parking")}</p>
          </div>
          <div className="border border-ink/10 p-6">
            <ClockIcon className="h-5 w-5 text-moss" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide">{t("hoursLabel")}</p>
            <p className="mt-2 text-base leading-relaxed">{settings.officeHours}</p>
            <p className="mt-3 text-sm text-stone">{settings.hoursNote}</p>
          </div>
        </div>
      </section>
      <section className="bg-paper-soft">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <h2 className="font-display text-4xl">{t("formTitle")}</h2>
            <p className="mt-4 mb-8 text-lg text-stone">{t("formLead")}</p>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <div>
            <h2 className="font-display text-4xl">{t("accessTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">{t("access")}</p>
            <p className="mt-4 text-base text-stone">{t("pmr")}</p>
            <a
              href={site.mapsDirections}
              className="mt-6 inline-flex min-h-12 items-center bg-moss px-5 py-3 font-medium text-white"
              rel="noreferrer"
              target="_blank"
            >
              {t("itinerary")}
            </a>
            <a
              href={site.facebook}
              rel="noreferrer"
              target="_blank"
              className="mt-4 flex items-center gap-2 text-base font-medium"
            >
              <FacebookIcon />
              Facebook
            </a>
            <div className="mt-8 overflow-hidden border border-ink/10 bg-white">
              <MapEmbed className="h-80 w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
