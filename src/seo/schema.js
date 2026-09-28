export function absoluteUrl(baseUrl, path = "/") {
  if (!path || path === "/") return `${baseUrl}/`;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const schemaPerformers = [
  ["Person", "Marek Hora"], ["Person", "Noriko Komiyama"], ["Person", "Markéta Fránová"],
  ["Person", "Aska Pluskal"], ["Person", "Tomáš Pelich"], ["Person", "Radka Tůmová"],
  ["PerformingGroup", "Gorin"], ["PerformingGroup", "Aikidō Chýně"],
  ["PerformingGroup", "SAN DŌ MON Kendō Klub Praha"], ["PerformingGroup", "Budō Plzeň"],
  ["PerformingGroup", "Nihon Bunka Plzeň"], ["PerformingGroup", "Yosakoi Hanamaru"]
].map(([type, name]) => ({ "@type": type, name }));

const schemaLanguage = {
  "cs-CZ": "cs", "en-GB": "en", "ja-JP": "ja", "de-DE": "de",
  "es-ES": "es", "zh-CN": "zh-CN", "vi-VN": "vi"
};

export function buildFestivalSchema({ seo, site, path = "/" }) {
  const localePrefix = { "en-GB": "/en", "ja-JP": "/ja", "de-DE": "/de", "es-ES": "/es", "zh-CN": "/zh", "vi-VN": "/vi" }[seo.language] || "";
  const localizedPath = path === "/" && localePrefix ? `${localePrefix}/` : path;
  const image = seo.defaultImage ? absoluteUrl(seo.baseUrl, seo.defaultImage) : undefined;
  const startDate = `${site.event.dateISO}T${site.event.openingTime}:00+02:00`;
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${absoluteUrl(seo.baseUrl, localizedPath)}#festival`,
    name: "Japonský den čaje a kultury 2026",
    alternateName: "Japan Day Chýně 2026",
    description: seo.routes["/"].description,
    startDate,
    endDate: `${site.event.dateISO}T19:00:00+02:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: schemaLanguage[seo.language] || seo.language,
    location: {
      "@type": "Place",
      name: site.event.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.event.street,
        postalCode: site.event.postalCode,
        addressLocality: site.event.city,
        addressRegion: site.event.region,
        addressCountry: site.event.country
      }
    },
    url: absoluteUrl(seo.baseUrl, localizedPath),
    organizer: {
      "@type": "Organization",
      name: "Město Chýně",
      url: "https://www.chyne.cz/"
    },
    performer: schemaPerformers,
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(seo.baseUrl, localizedPath),
      price: site.event.admissionPrice,
      priceCurrency: site.event.currency,
      availability: "https://schema.org/InStock"
    }
  };

  if (site.event.closingTime) {
    event.endDate = `${site.event.dateISO}T${site.event.closingTime}:00+02:00`;
  }
  if (image) event.image = [image];
  return event;
}

export function buildOrganizationSchema({ seo }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seo.baseUrl}/#organizer-city`,
    name: "Město Chýně",
    url: "https://www.chyne.cz/"
  };
}

export function buildBreadcrumbSchema({ seo, path, route }) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: seo.siteName,
      item: absoluteUrl(seo.baseUrl, "/")
    }
  ];

  if (route.breadcrumbParent) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: route.breadcrumbParent.name,
      item: absoluteUrl(seo.baseUrl, route.breadcrumbParent.path)
    });
  }

  itemListElement.push({
    "@type": "ListItem",
    position: itemListElement.length + 1,
    name: route.breadcrumb || route.h1,
    item: absoluteUrl(seo.baseUrl, path)
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
}

export function buildSchemas({ seo, site, path, route }) {
  const requested = new Set(route.schema || []);
  const schemas = [];
  if (requested.has("festival")) schemas.push(buildFestivalSchema({ seo, site, path }));
  if (requested.has("organization")) schemas.push(buildOrganizationSchema({ seo }));
  if (requested.has("breadcrumb") && path !== "/") schemas.push(buildBreadcrumbSchema({ seo, path, route }));
  return schemas;
}
/**
 * Copyright © 2026 Martin Labudík
 * All rights reserved.
 *
 * Unauthorized copying, modification, redistribution or reuse
 * of this source code, in whole or in part, is prohibited
 * without prior written permission from the copyright holder.
 */
/**
 * Copyright © 2026 Martin Labudík
 * All rights reserved.
 *
 * Unauthorized copying, modification, redistribution or reuse
 * of this source code, in whole or in part, is prohibited
 * without prior written permission from the copyright holder.
 */
