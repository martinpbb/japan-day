import { test, expect } from "../helpers/fixtures";

test("@ui gallery thumbnails and lightbox interaction", async ({ page }) => {
  await page.goto("/galerie");
  const item = page.locator(".galleryItem").first();
  await expect(item).toBeVisible();
  await item.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
});
