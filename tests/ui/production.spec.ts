import { test, expect } from "@playwright/test";

test("@production production origin is HTTPS and has no localhost metadata", async ({ page }) => {
  test.skip(!process.env.BASE_URL?.startsWith("https://japanday.cz"), "Set BASE_URL=https://japanday.cz");
  await page.goto("/"); await expect(page).toHaveURL(/^https:\/\/japanday\.cz/);
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", /^https:\/\/japanday\.cz/);
  expect(await page.content()).not.toMatch(/localhost|127\.0\.0\.1|C:\\Users/i);
});
