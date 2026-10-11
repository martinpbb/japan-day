import { test, expect } from "../helpers/fixtures";
import { readLocaleContent } from "../helpers/content";

const children = readLocaleContent<any>("children");

test("@ui children section and detail page render activities", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".childrenSection")).toBeVisible();
  await expect(page.locator(".childrenCard")).toHaveCount(children.activities.length);
  await page.goto("/pro-deti");
  await expect(page.locator("main h1")).toBeVisible();
  for (const activity of children.activities) await expect(page.locator(".childrenCard").filter({ has: page.getByRole("heading", { name: activity.title, exact: true }) })).toBeVisible();
  await expect(page.locator(".childrenCompetition")).toBeVisible();
  for (const category of children.competition.categories) {
    await expect(page.locator(".childrenCompetitionCard").filter({ has: page.getByRole("heading", { name: category.title, exact: true }) })).toBeVisible();
  }
  await expect(page.locator(".childrenPrize")).toBeVisible();
  await expect(page.locator(".childrenSafety")).toBeVisible();
  if (children.freeEntry) await expect(page.locator(".childrenFreeEntry")).toBeVisible();
});
