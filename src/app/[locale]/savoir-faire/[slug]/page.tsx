import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SkillIcon } from "@/components/SkillIcon";
import { Reveal } from "@/components/Reveal";
import { SearchIcon } from "@/components/SearchIcon";
import { PhotoMosaic } from "@/components/PhotoMosaic";
import { getSkill, skills } from "@/lib/skills";
import { skillCopy } from "@/content/skills-copy";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    skills.map((skill) => ({ locale, slug: skill.id })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  const copy = skillCopy[locale as keyof typeof skillCopy]?.[skill.id];
  if (!copy) return {};
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
  };
}

export default async function SkillPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const skill = getSkill(slug);
  if (!skill) notFound();
  const copy =
    skillCopy[locale as keyof typeof skillCopy]?.[skill.id] ?? skillCopy.fr[skill.id];
  const t = await getTranslations("craft");
  const others = skills.filter((item) => item.id !== skill.id).slice(0, 4);

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t(`items.${skill.id}.name`)}
        lead={copy.lead}
        image={skill.image}
      />
      <article className="bg-white pt-12 lg:pt-16">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <Reveal className="h-full bg-moss px-8 py-14 text-white lg:px-14 lg:py-16">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
              {t("kicker")}
            </p>
            <h2 className="font-display mt-3 text-4xl">
              {t(`items.${skill.id}.name`)}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/95">{copy.lead}</p>
            <p className="mt-5 text-base leading-relaxed text-white/90">{copy.body}</p>
            <h3 className="font-display mt-10 text-2xl">{t("includes")}</h3>
            <ul className="mt-5 space-y-2 text-base text-white/90">
              {copy.points.map((point) => (
                <li key={point}>— {point}</li>
              ))}
            </ul>
            <p className="mt-8 text-base">
              <strong className="text-white">{t("forWho")} :</strong> {copy.forWho}
            </p>
            <p className="mt-3 text-base text-white/90">
              <strong className="text-white">{t("area")} :</strong> {copy.area}
            </p>
          </Reveal>
          <Reveal className="h-full bg-paper-soft px-8 py-14 lg:px-14 lg:py-16" delay={120}>
            <h2 className="font-display text-3xl">{t("cta")}</h2>
            <p className="mt-3 mb-6 text-stone">{t("formLead")}</p>
            <Suspense>
              <ContactForm defaultObject="savoir-faire" defaultWorkshop={skill.id} />
            </Suspense>
          </Reveal>
        </div>
      </article>
      <PhotoMosaic
        theme="paper"
        photos={skill.gallery.map((src) => ({
          src,
          caption: t("galleryCaption"),
        }))}
      />
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <Reveal>
            <h2 className="font-display mb-8 text-3xl">{t("otherSkills")}</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 70} className="h-full">
                  <Link
                    href={{ pathname: "/savoir-faire/[slug]", params: { slug: item.id } }}
                    className="group flex h-full flex-col border border-ink/10 p-5 transition duration-500 hover:-translate-y-1 hover:border-moss hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.3)] motion-reduce:transition-none"
                  >
                    <SkillIcon
                      id={item.id}
                      className="h-7 w-7 text-moss transition duration-300 group-hover:scale-110"
                    />
                    <span className="mt-3 font-medium">{t(`items.${item.id}.name`)}</span>
                    <span className="mt-4 inline-flex w-fit items-center gap-0 px-3 py-2 text-xs font-medium underline decoration-moss underline-offset-4 transition duration-300 group-hover:gap-2 group-hover:bg-moss group-hover:text-white group-hover:no-underline">
                      <span className="inline-flex max-w-0 overflow-hidden transition-[max-width] duration-300 group-hover:max-w-5">
                        <SearchIcon className="h-3.5 w-3.5" />
                      </span>
                      {t("readPage")}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
