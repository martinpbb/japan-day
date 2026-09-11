export function buildPerformerRoute(performer) {
  const description = `${performer.name} — ${performer.short} ${performer.description}`.replace(/\s+/g, " ").trim();

  return {
    title: `${performer.name} | Účinkující | Japonský den čaje a kultury 2026`,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
    h1: performer.name,
    intro: performer.short,
    breadcrumb: performer.name,
    breadcrumbParent: {
      name: "Účinkující",
      path: "/ucinkujici"
    },
    schema: ["breadcrumb"]
  };
}
