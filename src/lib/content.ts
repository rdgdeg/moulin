import { readFile } from "node:fs/promises";
import path from "node:path";
import { weekDays, type WeekDay } from "./site";

export type MenuDay = {
  dish: string;
  suggestions: string[];
};

export type WeeklyMenu = {
  weekLabel: string;
  updatedAt: string;
  note: string;
  days: Record<WeekDay, MenuDay>;
};

export type Settings = {
  hoursNote: string;
  lunchFrom: string;
  lunchTo: string;
  officeHours: string;
  homeMealPrice: string;
  homeMealFormula: string;
  banner: string;
  takeaway: boolean;
};

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const api = process.env.CONTENT_API_URL;
  if (api) {
    try {
      const response = await fetch(`${api.replace(/\/$/, "")}/${file}`, {
        next: { revalidate: 30 },
      });
      if (response.ok) {
        return (await response.json()) as T;
      }
    } catch {
      // Fall through to local files.
    }
  }

  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const emptyDay: MenuDay = { dish: "", suggestions: [] };

export const fallbackMenu: WeeklyMenu = {
  weekLabel: "",
  updatedAt: "",
  note: "",
  days: {
    monday: emptyDay,
    tuesday: emptyDay,
    wednesday: emptyDay,
    thursday: emptyDay,
    friday: emptyDay,
  },
};

export const fallbackSettings: Settings = {
  hoursNote:
    "Restaurant : service du midi uniquement, du lundi au vendredi. Fermé le soir, le samedi et le dimanche.",
  lunchFrom: "12:00",
  lunchTo: "14:00",
  officeHours: "Lundi–jeudi 8h–16h30 · Vendredi 8h–14h30",
  homeMealPrice: "8 €",
  homeMealFormula: "Potage + plat + dessert",
  banner: "",
  takeaway: true,
};

export async function getMenu(): Promise<WeeklyMenu> {
  const menu = await readJson<WeeklyMenu>("menu.json", fallbackMenu);
  for (const day of weekDays) {
    if (!menu.days?.[day]) {
      menu.days = menu.days ?? fallbackMenu.days;
      menu.days[day] = emptyDay;
    }
  }
  return menu;
}

export async function getSettings(): Promise<Settings> {
  return readJson<Settings>("settings.json", fallbackSettings);
}
