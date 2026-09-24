import { test, expect } from "../helpers/fixtures";

test("@ui exhibitors render configured cards and assets", async ({ page }) => {
  await page.goto("/vystavovatele");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("img:visible").first()).toHaveAttribute("alt");
});
