import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { rooms } from "@/lib/rooms";
import { skills } from "@/lib/skills";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: `${t("sitemapTitle")} · ${t("siteName")}` };
}

export default async function SitemapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sitemap");
  const nav = await getTranslations("nav");
  const roomsT = await getTranslations("rooms.items");
  const craft = await getTranslations("craft.items");

  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-20">
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <p className="mt-6 text-lg text-stone">{t("lead")}</p>
      <section className="mt-12">
        <h2 className="font-display text-2xl">{t("main")}</h2>
        <ul className="mt-4 space-y-2 text-base">
          <li>
            <Link href="/" className="underline underline-offset-4">
              {nav("home")}
            </Link>
          </li>
          <li>
            <Link href="/salles" className="underline underline-offset-4">
              {nav("rooms")}
            </Link>
          </li>
          <li>
            <Link href="/restaurant" className="underline underline-offset-4">
              {nav("restaurant")}
            </Link>
          </li>
          <li>
            <Link href="/repas-a-domicile" className="underline underline-offset-4">
              {nav("homeMeals")}
            </Link>
          </li>
          <li>
            <Link href="/savoir-faire" className="underline underline-offset-4">
              {nav("craft")}
            </Link>
          </li>
          <li>
            <Link href="/le-moulin" className="underline underline-offset-4">
              {nav("about")}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="underline underline-offset-4">
              {nav("contact")}
            </Link>
          </li>
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">{nav("rooms")}</h2>
        <ul className="mt-4 space-y-2 text-base">
          {rooms.map((room) => (
            <li key={room.slug}>
              <Link
                href={{ pathname: "/salles/[slug]", params: { slug: room.slug } }}
                className="underline underline-offset-4"
              >
                {roomsT(`${room.slug}.name`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">{nav("craft")}</h2>
        <ul className="mt-4 space-y-2 text-base">
          {skills.map((skill) => (
            <li key={skill.id}>
              <Link
                href={{ pathname: "/savoir-faire/[slug]", params: { slug: skill.id } }}
                className="underline underline-offset-4"
              >
                {craft(`${skill.id}.name`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">{t("legal")}</h2>
        <ul className="mt-4 space-y-2 text-base">
          <li>
            <Link href="/mentions-legales" className="underline underline-offset-4">
              {t("legalLink")}
            </Link>
          </li>
          <li>
            <Link href="/confidentialite" className="underline underline-offset-4">
              {t("privacyLink")}
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
