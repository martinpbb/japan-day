import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.cwd(), "src/data/locales");
const read = (locale: string, file: string) => JSON.parse(fs.readFileSync(path.join(root, locale, file), "utf8"));

test("@data performer IDs and programme references resolve in every locale", () => {
  const ids = read("cs", "performers.json").items.map((item: any) => item.id); expect(new Set(ids).size).toBe(ids.length);
  for (const locale of ["cs", "en", "ja", "de", "es", "zh", "vi"]) {
    const performers = read(locale, "performers.json").items; const performerIds = new Set(performers.map((item: any) => item.id));
    expect(performers.map((item: any) => item.id), locale).toEqual(ids);
    for (const item of read(locale, "program.json").items) if (item.performerId) expect(performerIds.has(item.performerId), `${locale}/${item.performerId}`).toBeTruthy();
  }
});

test("@data locale entities have unique IDs and stable cross-locale references", () => {
  const locales = ["cs", "en", "ja", "de", "es", "zh", "vi"];
  const ids = (locale: string, file: string) => {
    const data = read(locale, `${file}.json`);
    const entities = file === "children" ? data.activities : data.items;
    return entities.map((item: any) => item.id).filter(Boolean);
  };
  const referenceIds = Object.fromEntries(["performers", "exhibitors", "gastronomy", "children"].map((file) => [file, ids("cs", file)]));
  for (const locale of locales) {
    for (const file of ["performers", "exhibitors", "gastronomy", "children"]) {
      const entityIds = ids(locale, file);
      expect(new Set(entityIds).size, `${locale}/${file} duplicate IDs`).toBe(entityIds.length);
      expect(entityIds, `${locale}/${file} IDs`).toEqual(referenceIds[file]);
    }
    const exhibitors = new Set(ids(locale, "exhibitors"));
    const program = read(locale, "program.json").items;
    const programIds = program.map((item: any) => item.id).filter(Boolean);
    expect(new Set(programIds).size, `${locale}/program duplicate IDs`).toBe(programIds.length);
    for (const item of program) if (item.exhibitorId) expect(exhibitors.has(item.exhibitorId), `${locale}/${item.exhibitorId}`).toBeTruthy();
  }
});
