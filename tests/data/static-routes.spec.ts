import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
test("@data static output contains generated route documents", () => {
  const dist = path.resolve(process.cwd(), "dist"); test.skip(!fs.existsSync(dist), "Run npm run build first");
  const locales = ["", "en", "ja", "de", "es", "zh", "vi"];
  for (const locale of locales) {
    const prefix = locale ? `${locale}/` : "";
    for (const route of ["index.html", "program/index.html", "ucinkujici/index.html", "vystavovatele/index.html", "pro-deti/index.html", "ucinkujici/ogashi-dojo/index.html", "vystavovatele/tenkokudo/index.html"]) {
      const file = path.join(dist, prefix, route);
      expect(fs.existsSync(file), file).toBeTruthy();
    }
  }
});
