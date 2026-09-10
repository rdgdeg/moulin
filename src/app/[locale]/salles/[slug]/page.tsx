import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { RoomOffer, RoomQuote } from "@/components/RoomOffer";
import { Reveal } from "@/components/Reveal";
import { getRoom, rooms } from "@/lib/rooms";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    rooms.map((room) => ({ locale, slug: room.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "rooms" });
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: t(`items.${room.slug}.name`),
    description: t(`items.${room.slug}.text`),
  };
}

export default async function RoomPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const room = getRoom(slug);
  if (!room) notFound();
  const t = await getTranslations("rooms");
  const common = await getTranslations("common");

  const configs = [
    ["u", room.u],
    ["school", room.school],
    ["theater", room.theater],
    ["banquet", room.banquet],
    ["cocktail", room.cocktail],
  ] as const;

  const others = rooms.filter((item) => item.slug !== room.slug);

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t(`items.${room.slug}.name`)}
        lead={t(`items.${room.slug}.text`)}
        image={room.image}
      />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-moss">
            {room.area} {common("m2")} · {common("onQuote")}
          </p>
          <h2 className="font-display mt-3 text-4xl">{t("capacityTitle")}</h2>
          <table className="mt-8 w-full text-left">
            <tbody>
              {configs.map(([key, value]) => (
                <tr key={key} className="border-b border-ink/10">
                  <th className="py-3 font-normal text-stone">{t(`configs.${key}`)}</th>
                  <td className="py-3 font-display text-xl">
                    {value ?? "—"} {value ? common("people") : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative mt-10 aspect-[4/3] overflow-hidden lg:mt-0">
          <Image src={room.image} alt="" fill className="object-cover" sizes="50vw" />
        </div>
      </section>
      <RoomOffer />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="font-display mb-8 text-4xl">{t("otherRooms")}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((item, index) => (
            <Reveal key={item.slug} delay={index * 80}>
              <Link
                href={{ pathname: "/salles/[slug]", params: { slug: item.slug } }}
                className="group block overflow-hidden bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">
                    {t(`items.${item.slug}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-stone">
                    {item.area} {common("m2")}
                  </p>
                  <span className="mt-4 inline-flex bg-transparent px-4 py-2 text-sm font-medium underline decoration-moss underline-offset-4 transition duration-300 group-hover:bg-moss group-hover:text-white group-hover:no-underline">
                    {t("seeRoom")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <RoomQuote>
        <h2 className="font-display mb-3 text-4xl">{t("quoteCta")}</h2>
        <p className="mb-8 text-lg text-stone">{t("formLead")}</p>
        <Suspense>
          <ContactForm defaultObject="salles" />
        </Suspense>
      </RoomQuote>
    </>
  );
}
