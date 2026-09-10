import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: `${t("privacyTitle")} · ${t("siteName")}` };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-20">
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <p className="mt-8 text-lg text-stone">{t("intro")}</p>
      <h2 className="font-display mt-8 text-2xl">{t("retention")}</h2>
      <p className="mt-3 text-stone">{t("retentionText")}</p>
      <h2 className="font-display mt-8 text-2xl">{t("rights")}</h2>
      <p className="mt-3 text-stone">{t("rightsText")}</p>
      <h2 className="font-display mt-8 text-2xl">{t("cookies")}</h2>
      <p className="mt-3 text-stone">{t("cookiesText")}</p>
    </article>
  );
}
