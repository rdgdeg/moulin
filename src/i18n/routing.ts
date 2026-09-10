import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "nl"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/restaurant": "/restaurant",
    "/salles": {
      fr: "/salles",
      nl: "/zalen",
    },
    "/salles/[slug]": {
      fr: "/salles/[slug]",
      nl: "/zalen/[slug]",
    },
    "/repas-a-domicile": {
      fr: "/repas-a-domicile",
      nl: "/maaltijden-aan-huis",
    },
    "/savoir-faire": {
      fr: "/savoir-faire",
      nl: "/vakmanschap",
    },
    "/savoir-faire/[slug]": {
      fr: "/savoir-faire/[slug]",
      nl: "/vakmanschap/[slug]",
    },
    "/le-moulin": {
      fr: "/le-moulin",
      nl: "/de-molen",
    },
    "/contact": "/contact",
    "/plan-du-site": {
      fr: "/plan-du-site",
      nl: "/sitemap",
    },
    "/mentions-legales": {
      fr: "/mentions-legales",
      nl: "/wettelijke-vermeldingen",
    },
    "/confidentialite": {
      fr: "/confidentialite",
      nl: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
