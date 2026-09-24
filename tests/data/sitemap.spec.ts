import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
test("@data sitemap is valid when build output exists", () => {
  const file = path.resolve(process.cwd(), "dist/sitemap.xml"); test.skip(!fs.existsSync(file), "Run npm run build first");
  const xml = fs.readFileSync(file, "utf8"); expect(xml).toContain("https://japanday.cz/"); expect([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])).toHaveLength(154);
});
