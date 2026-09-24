import { test, expect } from "../helpers/fixtures";

test("@ui performers cards expose names, images and detail links", async ({ page }) => {
  await page.goto("/ucinkujici");
  const cards = page.locator(".performerCard");
  await expect(cards).not.toHaveCount(0);
  await expect(cards.first().locator("img")).toHaveAttribute("alt", /\S+/);
  await expect(cards.first()).toHaveAttribute("href", /\/ucinkujici\//);
});
