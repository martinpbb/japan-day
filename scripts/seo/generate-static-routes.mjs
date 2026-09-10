import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, buildSchemas } from "../../src/seo/schema.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dist = path.join(root, "dist");
const seo = JSON.parse(await fs.readFile(path.join(root, "src/data/seo.json"), "utf8"));
const site = JSON.parse(await fs.readFile(path.join(root, "src/data/site.json"), "utf8"));
const baseHtml = await fs.readFile(path.join(dist, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
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

function renderRoute(routePath, route) {
  const canonical = absoluteUrl(seo.baseUrl, routePath);
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
  html = addStructuredData(html, buildSchemas({ seo, site, path: routePath, route }));
  return html;
}

for (const [routePath, route] of Object.entries(seo.routes)) {
  const html = renderRoute(routePath, route);
  if (routePath === "/") {
    await fs.writeFile(path.join(dist, "index.html"), html);
  } else {
    const targetDir = path.join(dist, routePath.slice(1));
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(path.join(targetDir, "index.html"), html);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(seo.routes).map((routePath) => `  <url><loc>${absoluteUrl(seo.baseUrl, routePath)}</loc></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
await fs.writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${seo.baseUrl}/sitemap.xml\n`);

console.log(`Generated ${Object.keys(seo.routes).length} SEO route documents, sitemap.xml and robots.txt.`);
