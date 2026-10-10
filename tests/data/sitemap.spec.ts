import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { localeCodes, prefixFor } from "../helpers/locales";

test("@data sitemap is valid when build output exists", () => {
  const file = path.resolve(process.cwd(), "dist/sitemap.xml");
  test.skip(!fs.existsSync(file), "Run npm run build first");

  const xml = fs.readFileSync(file, "utf8");
  const urls = [...xml.matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map((match) => match[1]);
  expect(urls.length).toBeGreaterThan(0);
  expect(urls).toContain("https://japanday.cz/");
  expect(new Set(urls).size).toBe(urls.length);
  for (const url of urls) expect(url).toMatch(/^https:\/\/japanday\.cz\//);

  const expectedUrls = new Set<string>();
  for (const locale of localeCodes) {
    const dataDir = path.resolve(process.cwd(), "src/data/locales", locale);
    const seo = JSON.parse(fs.readFileSync(path.join(dataDir, "seo.json"), "utf8"));
    const performers = JSON.parse(fs.readFileSync(path.join(dataDir, "performers.json"), "utf8"));
    // Match the generator's union of editorial routes and performer detail routes.
    const routes = new Set<string>([
      ...Object.keys(seo.routes),
      ...performers.items.map((performer: { id: string }) => `/ucinkujici/${performer.id}`),
    ]);
    const toUrl = (route: string) => `https://japanday.cz${prefixFor(locale, route).replace(/\/$/, "")}/`;
    for (const route of routes) expectedUrls.add(toUrl(route));
    for (const route of ["/", "/program", "/ucinkujici/ogashi-dojo", "/vystavovatele/tenkokudo"]) {
      expect(urls).toContain(toUrl(route));
    }
  }
  expect(urls).toHaveLength(expectedUrls.size);
  expect([...urls].sort()).toEqual([...expectedUrls].sort());
});
