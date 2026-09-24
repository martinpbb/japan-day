import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.cwd(), "src/data/locales");
const read = (locale: string) => JSON.parse(fs.readFileSync(path.join(root, locale, "program.json"), "utf8")).items;

test("@data programmes are chronological and structurally equivalent", () => {
  const cs = read("cs"); const times = cs.map((item: any) => item.time);
  expect(new Set(cs.map((item: any) => item.id).filter(Boolean)).size).toBe(cs.filter((item: any) => item.id).length);
  expect(times).toEqual([...times].sort());
  for (const locale of ["en", "ja", "de", "es", "zh", "vi"]) expect(read(locale).map((item: any) => item.time), locale).toEqual(times);
  for (const item of cs) if (item.endTime) expect(item.endTime > item.time).toBeTruthy();
});
