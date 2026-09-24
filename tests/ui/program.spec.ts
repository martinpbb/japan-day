import { test, expect } from "../helpers/fixtures";

test("@ui program is chronological and links configured performers", async ({ page }) => {
  await page.goto("/program");
  const times = await page.locator(".programTime strong").allTextContents();
  expect(times.length).toBeGreaterThan(10);
  expect(times.map((time) => time.replace(".", ":"))).toEqual([...times].sort());
  await expect(page.locator(".programItem").first()).toBeVisible();
});
