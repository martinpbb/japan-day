import { test, expect } from "../helpers/fixtures";

test("@ui program is chronological and links configured performers", async ({ page }) => {
  await page.goto("/program");
  const times = await page.locator(".programTime strong").allTextContents();
  expect(times.length).toBeGreaterThan(10);
  expect(times.map((time) => time.replace(".", ":"))).toEqual([...times].sort());
  await expect(page.locator(".programItem").first()).toBeVisible();
  const items = page.locator(".programItem");
  const map = page.locator(".programPlanSection");
  await expect(map).toBeVisible();
  const isAfterTimeline = await page.evaluate(() => {
    const timeline = document.querySelector(".timeline");
    const mapSection = document.querySelector(".programPlanSection");
    return Boolean(timeline && mapSection && timeline.compareDocumentPosition(mapSection) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(isAfterTimeline).toBeTruthy();
  await expect(map.locator("img")).toHaveAttribute("src", "/images/gallery/mapa.png");
  await expect(map.locator("img")).toHaveAttribute("alt", /\S+/);
  const mapImage = await map.locator("img").evaluate((image: HTMLImageElement) => ({ complete: image.complete, width: image.naturalWidth }));
  expect(mapImage.complete && mapImage.width > 0).toBeTruthy();
  await expect(page.locator('.programTitleLink[href*="ogashi-dojo"]')).toBeVisible();
});
