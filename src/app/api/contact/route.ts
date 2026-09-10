import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const allowed = ["restaurant", "salles", "repas", "savoir-faire", "autre"] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const object = allowed.includes(body.object as (typeof allowed)[number])
    ? (body.object as (typeof allowed)[number])
    : "autre";

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const entry = {
    at: new Date().toISOString(),
    object,
    name,
    email,
    phone: String(body.phone ?? ""),
    date: String(body.date ?? ""),
    guests: String(body.guests ?? ""),
    workshop: String(body.workshop ?? ""),
    commune: String(body.commune ?? ""),
    message,
  };

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "contacts.json");
  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await readFile(file, "utf8")) as unknown[];
  } catch {
    existing = [];
  }
  existing.push(entry);
  await writeFile(file, JSON.stringify(existing, null, 2));

  return NextResponse.json({ ok: true });
}
