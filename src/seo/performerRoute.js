export function buildPerformerRoute(performer, seo) {
  const description = `${performer.name} — ${performer.short} ${performer.description}`.replace(/\s+/g, " ").trim();
  const performersRoute = seo.routes["/ucinkujici"];

  return {
    title: `${performer.name} | ${performersRoute.breadcrumb} | ${seo.siteName} 2026`,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
    h1: performer.name,
    intro: performer.short,
    breadcrumb: performer.name,
    breadcrumbParent: {
      name: performersRoute.breadcrumb,
      path: "/ucinkujici"
    },
    schema: ["breadcrumb"]
  };
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
