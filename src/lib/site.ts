export const site = {
  name: "Le Moulin de la Hunelle",
  shortName: "Le Moulin",
  email: "info@hunelle.be",
  phone: "068 65 67 67",
  phoneHref: "tel:+3268656767",
  address: "Rue d'Ath 90",
  postal: "7950 Chièvres",
  country: "Belgique",
  facebook: "https://www.facebook.com/moulin.hunelle",
  mapsQuery: "Rue d'Ath 90, 7950 Chièvres, Belgique",
  mapsEmbed:
    "https://maps.google.com/maps?q=Rue%20d%27Ath%2090%2C%207950%20Chi%C3%A8vres&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Rue%20d%27Ath%2090%2C%207950%20Chi%C3%A8vres",
  founded: 1971,
  staff: 100,
  rating: "4,2/5",
  capacityMin: 20,
  capacityMax: 250,
} as const;

export const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

export type WeekDay = (typeof weekDays)[number];
