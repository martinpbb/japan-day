import { test, expect } from "../helpers/fixtures";

test("@seo GTM markup has one container", async ({ page }) => {
  await page.goto("/");
  const gtm = await page.evaluate(() => ({
    scripts: [...document.scripts].filter((script) => script.textContent?.includes("GTM-N5S65NK8")).length,
    dataLayer: Array.isArray((window as Window & { dataLayer?: unknown[] }).dataLayer),
  }));
  expect(gtm).toEqual({ scripts: 1, dataLayer: true });
});
