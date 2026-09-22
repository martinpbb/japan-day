export function absoluteUrl(baseUrl, path = "/") {
  if (!path || path === "/") return `${baseUrl}/`;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildFestivalSchema({ seo, site, path = "/" }) {
  const image = seo.defaultImage ? absoluteUrl(seo.baseUrl, seo.defaultImage) : undefined;
  const startDate = `${site.event.dateISO}T${site.event.openingTime}:00+02:00`;
  const event = {
    "@context": "https://schema.org",
    "@type": "Festival",
    "@id": `${absoluteUrl(seo.baseUrl, path)}#festival`,
    name: "Japonský den čaje a kultury 2026",
    alternateName: "Japan Day Chýně 2026",
    description: seo.routes["/"].description,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: seo.language,
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
    url: absoluteUrl(seo.baseUrl, path),
    organizer: [
      { "@id": `${seo.baseUrl}/#organizer-city` },
      { "@type": "Person", name: "Ing. Martin Labudík" }
    ],
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(seo.baseUrl, path),
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
