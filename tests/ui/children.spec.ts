import { test, expect } from "../helpers/fixtures";

test("@ui children section and detail page render activities", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".childrenSection")).toBeVisible();
  await expect(page.locator(".childrenCard")).toHaveCount(8);
  await page.goto("/pro-deti");
  await expect(page.locator("main h1")).toBeVisible();
});
