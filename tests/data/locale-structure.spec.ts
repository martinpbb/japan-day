import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "src/data/locales");
const locales = ["cs", "en", "ja", "de", "es", "zh", "vi"];
const files = ["site", "seo", "program", "performers", "gastronomy", "exhibitors", "gallery", "partners", "children"];
const read = (locale: string, file: string) => JSON.parse(fs.readFileSync(path.join(root, locale, `${file}.json`), "utf8"));

test("@data locale files have matching top-level structure", () => {
  const reference = Object.fromEntries(files.map((file) => [file, Object.keys(read("cs", file)).sort()]));
  for (const locale of locales) for (const file of files) {
    const source = fs.readFileSync(path.join(root, locale, `${file}.json`));
    expect(source.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf])), `${locale}/${file} UTF-8 BOM`).toBeFalsy();
    const text = source.toString("utf8");
    expect(() => JSON.parse(text), `${locale}/${file} strict JSON`).not.toThrow();
    expect(Object.keys(JSON.parse(text)).sort(), `${locale}/${file}`).toEqual(reference[file]);
    expect(text, `${locale}/${file} malformed encoding`).not.toMatch(/\uFFFD|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]|â€|ï¿½/);
  }
});

test("@data locale sites contain Hero openingFrom and required arrays", () => {
  for (const locale of locales) {
    const site = read(locale, "site"); const content = Object.fromEntries(files.filter((file) => file !== "site").map((file) => [file, read(locale, file)]));
    expect(site.ui.openingFrom, locale).toBeTruthy();
    expect(content.program.items, locale).toEqual(expect.any(Array)); expect(content.performers.items, locale).toEqual(expect.any(Array));
  }
});
