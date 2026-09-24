import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, buildSchemas } from "../../src/seo/schema.js";
import { buildPerformerRoute } from "../../src/seo/performerRoute.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dist = path.join(root, "dist");
const baseHtml = await fs.readFile(path.join(dist, "index.html"), "utf8");

const locales = [
  { locale: "cs", prefix: "" },
  { locale: "en", prefix: "/en" },
  { locale: "ja", prefix: "/ja" },
  { locale: "de", prefix: "/de" },
  { locale: "es", prefix: "/es" },
  { locale: "zh-CN", contentLocale: "zh", prefix: "/zh" },
  { locale: "vi", prefix: "/vi" }
];

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function publicUrl(baseUrl, routePath) {
  const url = absoluteUrl(baseUrl, routePath);
  return url.endsWith("/") ? url : `${url}/`;
}

function replaceTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
}

function upsertMeta(html, attribute, key, content) {
  const regex = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const regex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function addStructuredData(html, schemas) {
  const scripts = schemas.map((schema) => `    <script type="application/ld+json" data-japanday-schema="true">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`).join("\n");
  return scripts ? html.replace("</head>", `${scripts}\n  </head>`) : html;
}

function addHreflang(html, logicalPath, baseUrl) {
  const links = locales.map(({ locale, prefix }) => {
    const localizedPath = logicalPath === "/" ? `${prefix}/` || "/" : `${prefix}${logicalPath}`;
    return `    <link rel="alternate" hreflang="${locale}" href="${escapeHtml(publicUrl(baseUrl, localizedPath))}" />`;
  });
  links.push(`    <link rel="alternate" hreflang="x-default" href="${escapeHtml(publicUrl(baseUrl, logicalPath))}" />`);
  return html.replace("</head>", `${links.join("\n")}\n  </head>`);
}

function renderRoute({ seo, site, logicalPath, publicPath, route }) {
  const canonical = publicUrl(seo.baseUrl, publicPath);
  const image = seo.defaultImage ? absoluteUrl(seo.baseUrl, seo.defaultImage) : "";
  let html = baseHtml;
  html = replaceTitle(html, route.title);
  html = upsertMeta(html, "name", "description", route.description);
  html = upsertMeta(html, "name", "robots", "index, follow");
  html = upsertMeta(html, "property", "og:title", route.title);
  html = upsertMeta(html, "property", "og:description", route.description);
  html = upsertMeta(html, "property", "og:url", canonical);
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:site_name", seo.siteName);
  html = upsertMeta(html, "property", "og:locale", seo.locale);
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  if (image) {
    html = upsertMeta(html, "property", "og:image", image);
    html = upsertMeta(html, "name", "twitter:image", image);
  }
  html = upsertCanonical(html, canonical);
  html = addStructuredData(html, buildSchemas({ seo, site, path: publicPath, route }));
  return addHreflang(html, logicalPath, seo.baseUrl);
}

const sitemapPaths = new Set();
for (const { locale, contentLocale = locale, prefix } of locales) {
  const seo = JSON.parse(await fs.readFile(path.join(root, `src/data/locales/${contentLocale}/seo.json`), "utf8"));
  const site = JSON.parse(await fs.readFile(path.join(root, `src/data/locales/${contentLocale}/site.json`), "utf8"));
  const performers = JSON.parse(await fs.readFile(path.join(root, `src/data/locales/${contentLocale}/performers.json`), "utf8"));
  const performerRoutes = Object.fromEntries(performers.items.map((performer) => [
    `/ucinkujici/${performer.id}`, buildPerformerRoute(performer, seo)
  ]));
  const routes = { ...seo.routes, ...performerRoutes };
  for (const [logicalPath, route] of Object.entries(routes)) {
    const publicPath = logicalPath === "/" ? `${prefix}/` || "/" : `${prefix}${logicalPath}`;
    const html = renderRoute({ seo, site, logicalPath, publicPath, route });
    const targetDir = publicPath === "/" ? dist : path.join(dist, publicPath.slice(1));
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(path.join(targetDir, "index.html"), html);
    sitemapPaths.add(publicPath);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...sitemapPaths].map((routePath) => `  <url><loc>${publicUrl("https://japanday.cz", routePath)}</loc></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
await fs.writeFile(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: https://japanday.cz/sitemap.xml\n");

console.log(`Generated ${sitemapPaths.size} localized SEO route documents, sitemap.xml and robots.txt.`);
