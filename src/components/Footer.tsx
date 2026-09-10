import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/content";
import { Logo } from "./Logo";
import { FacebookIcon } from "./FacebookIcon";
import { MapEmbed } from "./MapEmbed";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  RestaurantIcon,
} from "./Icons";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const settings = await getSettings();

  return (
    <footer className="bg-moss text-white">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-10 md:grid-cols-2 lg:grid-cols-[0.9fr_0.7fr_0.9fr_1.3fr] lg:px-8">
        <div>
          <Logo size={88} className="h-[5.5rem] w-[5.5rem]" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/90">
            {t("tagline")}
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.14em] uppercase">
            {t("eta")}
          </p>
          <a
            href={site.facebook}
            rel="noreferrer"
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
            aria-label="Facebook — Le Moulin de la Hunelle"
          >
            <FacebookIcon />
            Facebook
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("poles")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/salles">{nav("rooms")}</Link>
            </li>
            <li>
              <Link href="/restaurant">{nav("restaurant")}</Link>
            </li>
            <li>
              <Link href="/repas-a-domicile">{nav("homeMeals")}</Link>
            </li>
            <li>
              <Link href="/savoir-faire">{nav("craft")}</Link>
            </li>
            <li>
              <Link href="/contact">{nav("contact")}</Link>
            </li>
            <li>
              <Link href="/plan-du-site">{t("sitemap")}</Link>
            </li>
            <li>
              <Link href="/mentions-legales">{t("legal")}</Link>
            </li>
            <li>
              <Link href="/confidentialite">{t("privacy")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("visit")}
          </p>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <span>
                {site.address}
                <br />
                {site.postal}
              </span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <a href={site.phoneHref} className="font-semibold">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-white/75 uppercase">
                  {t("hours")}
                </p>
                <p className="mt-1 text-white/95">{settings.officeHours}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <RestaurantIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-white/75 uppercase">
                  {t("restaurantHours")}
                </p>
                <p className="mt-1 font-semibold">
                  {settings.lunchFrom} – {settings.lunchTo}
                </p>
                <p className="mt-1 text-white/90">{t("restaurantHoursNote")}</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 text-ink sm:p-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
            {t("map")}
          </p>
          <div className="mt-3 overflow-hidden">
            <MapEmbed className="h-44 w-full" />
          </div>
          <a
            href={site.mapsDirections}
            className="mt-3 inline-block text-sm font-medium text-moss underline underline-offset-4"
            rel="noreferrer"
            target="_blank"
          >
            {t("itinerary")}
          </a>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/90 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <p>
            {t("madeBy")}{" "}
            <a
              href="https://ldmedia.be"
              className="font-medium underline decoration-white/50 underline-offset-4"
              rel="noreferrer"
              target="_blank"
            >
              {t("agency")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
