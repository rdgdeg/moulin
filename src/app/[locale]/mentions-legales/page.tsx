import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: `${t("legalTitle")} · ${t("siteName")}` };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-20">
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <h2 className="font-display mt-10 text-2xl">{t("publisher")}</h2>
      <p className="mt-3 text-stone">{t("publisherText")}</p>
      <h2 className="font-display mt-8 text-2xl">{t("hosting")}</h2>
      <p className="mt-3 text-stone">{t("hostingText")}</p>
      <h2 className="font-display mt-8 text-2xl">{t("credits")}</h2>
      <p className="mt-3 text-stone">{t("creditsText")}</p>
    </article>
  );
}
