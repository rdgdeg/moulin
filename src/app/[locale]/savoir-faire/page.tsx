import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SearchIcon } from "@/components/SearchIcon";
import { skills, type SkillAudience } from "@/lib/skills";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("craftTitle")} · ${t("siteName")}`,
    description: t("craftDescription"),
  };
}

function audienceTags(audience: SkillAudience) {
  if (audience === "both") return ["particuliers", "entreprises"] as const;
  return [audience] as const;
}

export default async function CraftPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("craft");

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/savoir-faire/jardins.jpg"
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Reveal key={skill.id} delay={index * 70} className="h-full min-w-0">
              <article className="h-full overflow-hidden bg-white">
                <Link
                  href={{ pathname: "/savoir-faire/[slug]", params: { slug: skill.id } }}
                  className="group flex h-full flex-col border border-ink/10 transition duration-500 hover:-translate-y-1 hover:border-moss hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={skill.image}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      sizes="(min-width:1024px) 25vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-1.5">
                      {audienceTags(skill.audience).map((tag) => (
                        <span
                          key={tag}
                          className="bg-moss/10 px-2 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-moss-deep uppercase"
                        >
                          {t(`audienceLabel.${tag}`)}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display mt-3 text-xl lg:text-2xl">
                      {t(`items.${skill.id}.name`)}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone lg:text-base">
                      {t(`items.${skill.id}.text`)}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center gap-0 bg-transparent px-4 py-2 text-sm font-medium underline decoration-moss underline-offset-4 transition duration-300 group-hover:gap-2 group-hover:bg-moss group-hover:text-white group-hover:no-underline motion-reduce:transition-none">
                      <span className="inline-flex max-w-0 overflow-hidden transition-[max-width] duration-300 group-hover:max-w-5">
                        <SearchIcon className="h-3.5 w-3.5" />
                      </span>
                      {t("readPage")}
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
