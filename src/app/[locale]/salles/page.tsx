import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { RoomOffer, RoomQuote } from "@/components/RoomOffer";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { rooms } from "@/lib/rooms";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("roomsTitle")} · ${t("siteName")}`,
    description: t("roomsDescription"),
  };
}

export default async function RoomsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("rooms");
  const common = await getTranslations("common");
  const events = t.raw("events") as string[];

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        image="/images/hero/salles.jpg"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl">{t("listTitle")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {rooms.map((room, index) => (
            <Reveal key={room.slug} delay={index * 90} className="h-full">
              <Link
                href={{ pathname: "/salles/[slug]", params: { slug: room.slug } }}
                className="group flex h-full flex-col overflow-hidden bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={room.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="50vw"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl">
                      {t(`items.${room.slug}.name`)}
                    </h3>
                    <p className="text-sm text-stone">
                      {room.area} {common("m2")}
                    </p>
                  </div>
                  <p className="mt-3 text-stone">{t(`items.${room.slug}.text`)}</p>
                  <p className="mt-4 text-sm text-moss">
                    {common("capacity")} : {room.theater ?? room.cocktail}{" "}
                    {common("people")}
                  </p>
                  <span className="mt-6 inline-flex bg-transparent px-5 py-2.5 text-sm font-medium underline decoration-moss underline-offset-4 transition duration-300 group-hover:bg-moss group-hover:text-white group-hover:no-underline motion-reduce:transition-none">
                    {t("seeRoom")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-moss text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl">{t("whyTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(["kitchen", "parking", "flex", "green"] as const).map((key, index) => (
              <Reveal key={key} delay={index * 80}>
                <div className="border-t border-white/35 pt-5">
                  <h3 className="font-display text-2xl">{t(`why.${key}`)}</h3>
                  <p className="mt-3 text-white/90">{t(`why.${key}Text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <RoomOffer />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl">{t("eventsTitle")}</h2>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-3">
          {events.map((event, index) => (
            <li key={event}>
              <Reveal delay={index * 50}>
                <span className="inline-block border border-ink/15 px-4 py-2 text-sm transition duration-300 hover:border-moss hover:bg-moss hover:text-white">
                  {event}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <RoomQuote>
        <h2 className="font-display mb-3 text-4xl">{t("formTitle")}</h2>
        <p className="mb-8 text-lg text-stone">{t("formLead")}</p>
        <Suspense>
          <ContactForm defaultObject="salles" />
        </Suspense>
      </RoomQuote>
    </>
  );
}
