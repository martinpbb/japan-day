import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.cwd(), "src/data/locales");
const read = (locale: string) => JSON.parse(fs.readFileSync(path.join(root, locale, "program.json"), "utf8")).items;

test("@data programmes are chronological and structurally equivalent", () => {
  const cs = read("cs"); const times = cs.map((item: any) => item.time);
  expect(new Set(cs.map((item: any) => item.id).filter(Boolean)).size).toBe(cs.filter((item: any) => item.id).length);
  expect(times).toEqual([...times].sort());
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  let previousEnd = -1;
  for (const item of cs) {
    const start = minutes(item.time);
    expect(start, `${item.title} start`).toBeGreaterThanOrEqual(0);
    if (item.endTime) {
      const end = minutes(item.endTime);
      expect(end, `${item.title} start < end`).toBeGreaterThan(start);
      expect(start, `${item.title} overlaps prior item`).toBeGreaterThanOrEqual(previousEnd);
      previousEnd = end;
    } else previousEnd = start;
  }
  for (const locale of ["en", "ja", "de", "es", "zh", "vi"]) {
    const translated = read(locale);
    expect(translated, `${locale} count`).toHaveLength(cs.length);
    expect(translated.map((item: any) => item.time), locale).toEqual(times);
  }
  const finalPerformance = [...cs].reverse().find((item: any) => item.type === "performance");
  const closing = [...cs].reverse().find((item: any) => item.type === "ceremony");
  expect(finalPerformance).toBeTruthy();
  expect(closing, "closing item").toBeTruthy();
  expect(minutes(closing.time)).toBeGreaterThanOrEqual(minutes(finalPerformance.endTime || finalPerformance.time));
  for (const id of ["radka-tumova", "ogashi-dojo", "gorin"]) {
    const entries = cs.filter((item: any) => item.performerId === id);
    expect(entries.length, id).toBeGreaterThan(0);
    for (const item of entries) if (item.endTime) expect(minutes(item.endTime), id).toBeLessThanOrEqual(minutes(closing.time));
  }
});
