import fs from "node:fs";
import path from "node:path";

export function readLocaleContent<T>(file: string, locale = "cs"): T {
  const contentPath = path.resolve(process.cwd(), "src/data/locales", locale, `${file}.json`);
  return JSON.parse(fs.readFileSync(contentPath, "utf8")) as T;
}
