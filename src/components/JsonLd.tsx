import { getSiteUrl, site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${getSiteUrl()}/#restaurant`,
        name: site.name,
        telephone: site.phoneHref.replace("tel:", ""),
        email: site.email,
        servesCuisine: "French",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          postalCode: "7950",
          addressLocality: "Chièvres",
          addressCountry: "BE",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.2",
          reviewCount: "214",
        },
      },
      {
        "@type": "EventVenue",
        name: `${site.name} — salles`,
        maximumAttendeeCapacity: site.capacityMax,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          postalCode: "7950",
          addressLocality: "Chièvres",
          addressCountry: "BE",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
