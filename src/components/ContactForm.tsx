"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { skills } from "@/lib/skills";

const objects = ["restaurant", "salles", "repas", "savoir-faire", "autre"] as const;
type ContactObject = (typeof objects)[number];

export function ContactForm({
  defaultObject = "restaurant",
  defaultWorkshop,
}: {
  defaultObject?: ContactObject;
  defaultWorkshop?: string;
}) {
  const t = useTranslations("contact");
  const craft = useTranslations("craft.items");
  const searchParams = useSearchParams();
  const initial = useMemo(() => {
    const objet = searchParams.get("objet");
    return objects.includes(objet as ContactObject)
      ? (objet as ContactObject)
      : defaultObject;
  }, [searchParams, defaultObject]);
  const initialWorkshop =
    searchParams.get("service") ?? defaultWorkshop ?? skills[0].id;

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [object, setObject] = useState<ContactObject>(initial);

  const showEvent = object === "restaurant" || object === "salles";
  const showMeals = object === "repas";
  const showWorkshop = object === "savoir-faire";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "min-h-12 border border-ink/20 bg-white px-4 py-3 text-base";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="grid gap-2 text-base">
        {t("fields.object")}
        <select
          name="object"
          value={object}
          onChange={(event) => setObject(event.target.value as ContactObject)}
          className={fieldClass}
        >
          {objects.map((item) => (
            <option key={item} value={item}>
              {t(`objects.${item}`)}
            </option>
          ))}
        </select>
      </label>
      {showWorkshop ? (
        <label className="grid gap-2 text-base">
          {t("fields.workshop")}
          <select name="workshop" defaultValue={initialWorkshop} className={fieldClass}>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {craft(`${skill.id}.name`)}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="grid gap-2 text-base">
        {t("fields.name")}
        <input required name="name" autoComplete="name" className={fieldClass} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-base">
          {t("fields.email")}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-2 text-base">
          {t("fields.phone")}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required={showMeals}
            className={fieldClass}
          />
        </label>
      </div>
      {showEvent ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-base">
            {t("fields.date")}
            <input type="date" name="date" className={fieldClass} />
          </label>
          <label className="grid gap-2 text-base">
            {t("fields.guests")}
            <input type="number" min={1} name="guests" className={fieldClass} />
          </label>
        </div>
      ) : null}
      {showMeals ? (
        <label className="grid gap-2 text-base">
          {t("fields.commune")}
          <input name="commune" className={fieldClass} />
        </label>
      ) : null}
      <label className="grid gap-2 text-base">
        {t("fields.message")}
        <textarea required name="message" rows={5} className={`${fieldClass} min-h-32`} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 bg-moss px-6 py-3 text-base font-medium text-white disabled:opacity-60"
      >
        {status === "sending" ? t("fields.sending") : t("fields.submit")}
      </button>
      {status === "success" ? (
        <p role="status" className="text-base text-moss-deep">
          {t("fields.success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-base text-red-800">
          {t("fields.error")}
        </p>
      ) : null}
    </form>
  );
}
