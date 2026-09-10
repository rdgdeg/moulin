import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroSlider } from "@/components/HeroSlider";
import { SkillIcon } from "@/components/SkillIcon";
import { SearchIcon } from "@/components/SearchIcon";
import { getSettings } from "@/lib/content";
import { skills } from "@/lib/skills";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Pathname } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("homeTitle")} · ${t("siteName")}`,
    description: t("homeDescription"),
    alternates: { canonical: `/${locale}` },
  };
}

const poles: {
  href: Exclude<Pathname, "/salles/[slug]" | "/savoir-faire/[slug]">;
  image: string;
  key: "rooms" | "restaurant" | "meals" | "craft";
  badgeKey: "cateringOnSite" | "lunchOnly" | "price" | "craft";
}[] = [
  {
    href: "/salles",
    image: "/images/salles/grande.jpg",
    key: "rooms",
    badgeKey: "cateringOnSite",
  },
  {
    href: "/restaurant",
    image: "/images/restaurant/veranda.jpg",
    key: "restaurant",
    badgeKey: "lunchOnly",
  },
  {
    href: "/repas-a-domicile",
    image: "/images/repas/formule.jpg",
    key: "meals",
    badgeKey: "price",
  },
  {
    href: "/savoir-faire",
    image: "/images/savoir-faire/jardins.jpg",
    key: "craft",
    badgeKey: "craft",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const craft = await getTranslations("craft.items");
  const settings = await getSettings();

  return (
    <>
      <HeroSlider />
      {settings.banner ? (
        <p className="bg-moss px-5 py-3 text-center text-sm text-white">
          {settings.banner}
        </p>
      ) : null}

      <section
        id="accueil-suite"
        className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8"
      >
        <div className="relative min-h-[280px] overflow-hidden bg-moss text-white">
          <Image
            src="/images/lieu/parc.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="50vw"
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
            <p className="text-[0.7rem] tracking-[0.2em] text-white/85 uppercase">{t("introKicker")}</p>
            <p className="mt-3 text-lg font-semibold">{t("etaBadge")}</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-5xl">1971</p>
                <p className="mt-1 text-sm">{t("introYear")}</p>
              </div>
              <div>
                <p className="font-display text-5xl">~100</p>
                <p className="mt-1 text-sm">{t("introStaff")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            {t("introTitle")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
            {t("introText")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {poles.map((pole) => (
            <Link
              key={pole.key}
              href={pole.href}
              className="group flex flex-col border border-ink/10 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pole.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.68rem] tracking-[0.16em] text-moss-deep uppercase">
                  {pole.badgeKey === "price"
                    ? settings.homeMealPrice
                    : pole.badgeKey === "craft"
                      ? t("poles.craft.badge")
                      : common(pole.badgeKey)}
                </p>
                <h3 className="font-display mt-2 text-2xl">
                  {t(`poles.${pole.key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-stone">
                  {t(`poles.${pole.key}.text`)}
                </p>
                <span className="mt-6 inline-flex w-fit items-center gap-0 bg-transparent px-4 py-2 text-sm font-medium text-moss-deep underline decoration-moss/40 underline-offset-4 transition duration-300 group-hover:gap-2 group-hover:bg-moss group-hover:text-white group-hover:no-underline motion-reduce:transition-none">
                  <span className="inline-flex max-w-0 overflow-hidden transition-[max-width] duration-300 group-hover:max-w-5">
                    <SearchIcon className="h-3.5 w-3.5" />
                  </span>
                  {t(`poles.${pole.key}.cta`)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-moss text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
                {t("craftKicker")}
              </p>
              <h2 className="font-display mt-2 max-w-xl text-3xl sm:text-4xl">
                {t("craftTitle")}
              </h2>
              <p className="mt-3 max-w-2xl text-white/90">{t("craftLead")}</p>
            </div>
            <Link
              href="/savoir-faire"
              className="inline-flex shrink-0 items-center bg-white px-6 py-3 text-sm font-semibold tracking-[0.1em] text-moss uppercase"
            >
              {t("craftCta")}
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-px bg-white/25 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <li key={skill.id} className="bg-moss">
                <Link
                  href={{ pathname: "/savoir-faire/[slug]", params: { slug: skill.id } }}
                  className="group flex h-full flex-col p-6"
                >
                  <SkillIcon id={skill.id} className="h-7 w-7 text-white" />
                  <h3 className="mt-4 text-sm font-semibold leading-snug">
                    {craft(`${skill.id}.name`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90">
                    {craft(`${skill.id}.text`)}
                  </p>
                  <span className="mt-5 inline-flex w-fit items-center gap-0 px-3 py-2 text-xs font-medium tracking-wide text-white uppercase underline decoration-white/40 underline-offset-4 transition duration-300 group-hover:gap-2 group-hover:bg-white group-hover:text-moss group-hover:no-underline motion-reduce:transition-none">
                    <span className="inline-flex max-w-0 overflow-hidden transition-[max-width] duration-300 group-hover:max-w-5">
                      <SearchIcon className="h-3.5 w-3.5" />
                    </span>
                    {t("craftMore")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-moss">
              {t("missionKicker")}
            </p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone sm:text-lg">
              {t("missionText")}
            </p>
            <Link
              href="/le-moulin"
              className="mt-8 inline-flex bg-moss px-5 py-3 text-sm font-medium text-white"
            >
              {t("missionCta")}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/lieu/parc.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
