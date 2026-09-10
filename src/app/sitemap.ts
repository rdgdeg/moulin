import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { rooms } from "@/lib/rooms";
import { skills } from "@/lib/skills";
import { getSiteUrl } from "@/lib/site";

const host = getSiteUrl();

const pages = [
  "/",
  "/restaurant",
  "/salles",
  "/repas-a-domicile",
  "/savoir-faire",
  "/le-moulin",
  "/contact",
  "/plan-du-site",
  "/mentions-legales",
  "/confidentialite",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const href of pages) {
      entries.push({
        url: `${host}${getPathname({ locale, href })}`,
        lastModified: new Date(),
      });
    }
    for (const room of rooms) {
      entries.push({
        url: `${host}${getPathname({
          locale,
          href: { pathname: "/salles/[slug]", params: { slug: room.slug } },
        })}`,
        lastModified: new Date(),
      });
    }
    for (const skill of skills) {
      entries.push({
        url: `${host}${getPathname({
          locale,
          href: {
            pathname: "/savoir-faire/[slug]",
            params: { slug: skill.id },
          },
        })}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
