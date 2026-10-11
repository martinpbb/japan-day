import { test, expect } from "../helpers/fixtures";
import { readLocaleContent } from "../helpers/content";

const gastronomy = readLocaleContent<any>("gastronomy");

test("@ui gastronomy renders categories and detail content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#gastronomie")).toBeVisible();
  await page.goto("/gastronomie");
  const categories = page.locator("#gastronomie .gastronomyCategory");
  await expect(categories).toHaveCount(gastronomy.items.length);
  const ids = gastronomy.items.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const item of gastronomy.items) {
    const category = page.locator(`#${item.id}`);
    await expect(category).toBeVisible();
    if (item.details.items.length) await expect(category.locator(".gastronomyItem")).toHaveCount(item.details.items.length);
  }
  const beerIndex = ids.indexOf("beer");
  const sakeIndex = ids.indexOf("sake");
  const whiskyIndex = ids.indexOf("whisky");
  if (beerIndex >= 0 && sakeIndex >= 0) expect(beerIndex).toBeLessThan(sakeIndex);
  if (sakeIndex >= 0 && whiskyIndex >= 0) expect(sakeIndex).toBeLessThan(whiskyIndex);
  await expect(page.locator("#beer")).toContainText("Kirin");
});
