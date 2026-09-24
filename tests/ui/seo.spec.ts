import { test, expect } from "../helpers/fixtures";
import { localeCodes, prefixFor } from "../helpers/locales";
import { routes } from "../helpers/routes";

test.describe("@seo route metadata", () => {
  for (const locale of localeCodes) for (const route of routes.slice(0, 4)) test(`${locale} ${route}`, async ({ page }) => {
    await page.goto(prefixFor(locale, route));
    await expect(page.locator("meta[name=description]")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveCount(1);
    await expect(page.locator("meta[property='og:title']")).toHaveCount(1);
    await expect(page.locator("link[rel=alternate]")).toHaveCount(8);
    await expect(page.locator("script[type='application/ld+json']").first()).toBeAttached();
  });
});
