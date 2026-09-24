import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
test("@data static output contains generated route documents", () => {
  const dist = path.resolve(process.cwd(), "dist"); test.skip(!fs.existsSync(dist), "Run npm run build first");
  for (const route of ["index.html", "en/index.html", "ja/index.html", "program/index.html", "en/program/index.html", "ucinkujici/index.html", "pro-deti/index.html"]) expect(fs.existsSync(path.join(dist, route)), route).toBeTruthy();
});
