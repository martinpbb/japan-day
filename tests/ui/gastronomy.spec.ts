import { test, expect } from "../helpers/fixtures";

test("@ui gastronomy renders categories and detail content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#gastronomie")).toBeVisible();
  await page.goto("/gastronomie");
  await expect(page.locator("#gastronomie .gastronomyCategory")).not.toHaveCount(0);
});
