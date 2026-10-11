import { test, expect } from "../helpers/fixtures";
const viewports = [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }];
for (const route of ["/", "/program", "/ucinkujici/ogashi-dojo", "/vystavovatele/tenkokudo"]) {
  for (const viewport of viewports) test(`@responsive ${route} ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    await expect(page.locator("main h1")).toBeVisible();
    if (route.includes("/vystavovatele/")) {
      const width = await page.locator(".exhibitorDetailImage").first().evaluate((image: HTMLImageElement) => image.getBoundingClientRect().width);
      expect(width).toBeLessThanOrEqual(viewport.width);
    }
    if (route.includes("/ucinkujici/")) {
      const width = await page.locator(".performerDetailImage").first().evaluate((image: HTMLImageElement) => image.getBoundingClientRect().width);
      expect(width).toBeLessThanOrEqual(viewport.width);
    }
  });
}
