export type RoomSlug =
  | "salle-moyenne"
  | "salle-rustique"
  | "restaurant"
  | "grande-salle";

export type RoomConfig = {
  slug: RoomSlug;
  image: string;
  area: number;
  u: number | null;
  school: number | null;
  theater: number | null;
  banquet: number | null;
  cocktail: number | null;
};

export const rooms: RoomConfig[] = [
  {
    slug: "salle-moyenne",
    image: "/images/salles/moyenne.jpg",
    area: 44,
    u: 20,
    school: 20,
    theater: 40,
    banquet: 35,
    cocktail: 50,
  },
  {
    slug: "salle-rustique",
    image: "/images/salles/rustique.jpg",
    area: 45,
    u: 20,
    school: 15,
    theater: 40,
    banquet: 40,
    cocktail: 60,
  },
  {
    slug: "restaurant",
    image: "/images/salles/restaurant-salle.jpg",
    area: 55,
    u: 40,
    school: null,
    theater: null,
    banquet: 60,
    cocktail: 100,
  },
  {
    slug: "grande-salle",
    image: "/images/salles/grande.jpg",
    area: 192,
    u: 60,
    school: 120,
    theater: 250,
    banquet: 230,
    cocktail: 300,
  },
];

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
