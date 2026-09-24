import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

test("@data generated HTML contains one GTM script and noscript block", () => {
  const html = fs.readFileSync(path.resolve(process.cwd(), "dist/index.html"), "utf8");
  expect((html.match(/<script>[\s\S]*?GTM-N5S65NK8[\s\S]*?<\/script>/g) || [])).toHaveLength(1);
  expect((html.match(/<noscript>[\s\S]*?GTM-N5S65NK8[\s\S]*?<\/noscript>/g) || [])).toHaveLength(1);
});
