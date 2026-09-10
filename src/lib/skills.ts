export type SkillId =
  | "garnissage"
  | "confection"
  | "blanchisserie"
  | "menuiserie"
  | "peinture"
  | "conditionnement"
  | "jardins"
  | "abattoir";

export type SkillAudience = "particuliers" | "entreprises" | "both";

export type Skill = {
  id: SkillId;
  image: string;
  audience: SkillAudience;
  gallery: string[];
};

function atelierGallery(id: SkillId): string[] {
  const base = `/images/savoir-faire/${id}`;
  return [
    `${base}.jpg`,
    `${base}-2.jpg`,
    `${base}-3.jpg`,
    `${base}-4.jpg`,
    `${base}-5.jpg`,
  ];
}

export const skills: Skill[] = [
  {
    id: "garnissage",
    image: "/images/savoir-faire/garnissage.jpg",
    audience: "both",
    gallery: atelierGallery("garnissage"),
  },
  {
    id: "confection",
    image: "/images/savoir-faire/confection.jpg",
    audience: "both",
    gallery: atelierGallery("confection"),
  },
  {
    id: "blanchisserie",
    image: "/images/savoir-faire/blanchisserie.jpg",
    audience: "particuliers",
    gallery: atelierGallery("blanchisserie"),
  },
  {
    id: "menuiserie",
    image: "/images/savoir-faire/menuiserie.jpg",
    audience: "both",
    gallery: atelierGallery("menuiserie"),
  },
  {
    id: "peinture",
    image: "/images/savoir-faire/peinture.jpg",
    audience: "both",
    gallery: atelierGallery("peinture"),
  },
  {
    id: "conditionnement",
    image: "/images/savoir-faire/conditionnement.jpg",
    audience: "entreprises",
    gallery: atelierGallery("conditionnement"),
  },
  {
    id: "jardins",
    image: "/images/savoir-faire/jardins.jpg",
    audience: "both",
    gallery: atelierGallery("jardins"),
  },
  {
    id: "abattoir",
    image: "/images/savoir-faire/abattoir.jpg",
    audience: "entreprises",
    gallery: atelierGallery("abattoir"),
  },
];

export function getSkill(slug: string) {
  return skills.find((skill) => skill.id === slug);
}
