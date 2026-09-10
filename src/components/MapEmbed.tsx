import { site } from "@/lib/site";

export function MapEmbed({ className = "h-64 w-full" }: { className?: string }) {
  return (
    <iframe
      title={`${site.name} — ${site.address}, ${site.postal}`}
      src={site.mapsEmbed}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
