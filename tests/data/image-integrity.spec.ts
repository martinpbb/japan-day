import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.cwd(), "src/data/locales");
const publicRoot = path.resolve(process.cwd(), "public");
const files = ["site.json", "seo.json", "program.json", "performers.json", "gastronomy.json", "exhibitors.json", "gallery.json", "partners.json", "children.json"];
function walk(value: any): string[] { if (typeof value === "string" && value.startsWith("/")) return [value]; if (Array.isArray(value)) return value.flatMap(walk); if (value && typeof value === "object") return Object.values(value).flatMap(walk); return []; }
test("@data first-party image paths exist", () => {
  for (const locale of ["cs", "en", "ja", "de", "es", "zh", "vi"]) for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(root, locale, file), "utf8"));
    for (const image of walk(data).filter((value) => /\.(png|jpe?g|webp|svg)$/i.test(value))) expect(fs.existsSync(path.join(publicRoot, image.slice(1))), `${locale}/${file}/${image}`).toBeTruthy();
  }
});
