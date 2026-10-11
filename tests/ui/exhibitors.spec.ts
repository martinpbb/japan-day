import { test, expect } from "../helpers/fixtures";
import { readLocaleContent } from "../helpers/content";

const exhibitors = readLocaleContent<any>("exhibitors");

test("@ui exhibitor cards match configured records and links are safe", async ({ page }) => {
  await page.goto("/vystavovatele");
  const cards = page.locator(".exhibitorGrid > *");
  await expect(cards).toHaveCount(exhibitors.items.length);
  for (const item of exhibitors.items) {
    const card = page.locator(".exhibitorGrid > *").filter({ has: page.getByRole("heading", { name: item.name, exact: true }) });
    await expect(card).toBeVisible();
    if (item.detail) await expect(card).toHaveAttribute("href", `/vystavovatele/${item.id}`);
    else if (item.website) {
      await expect(card).toHaveAttribute("href", /^https:\/\//);
      await expect(card).toHaveAttribute("target", "_blank");
      await expect(card).toHaveAttribute("rel", /noopener/);
    } else await expect(card).not.toHaveAttribute("href", /.+/);
    expect(await card.locator("a").count(), `${item.id} nested links`).toBe(0);
    const image = card.locator("img");
    if (item.image) {
      await expect(image).toHaveAttribute("src", item.image);
      await expect(image).toHaveAttribute("alt", /\S+/);
      const width = await image.evaluate((element: HTMLImageElement) => element.naturalWidth);
      expect(width, `${item.id} image`).toBeGreaterThan(0);
    }
  }
});

test("@ui Tenkokudo internal detail shows ordering details and images", async ({ page }) => {
  await page.goto("/vystavovatele");
  const card = page.locator('.exhibitorGrid > a[href="/vystavovatele/tenkokudo"]');
  await expect(card).toBeVisible();
  await card.click();
  await expect(page).toHaveURL(/\/vystavovatele\/tenkokudo\/?$/);
  await expect(page.locator(".exhibitorDetail h1")).toContainText("Tenkokud");
  await expect(page.locator(".exhibitorOrder")).toContainText("500");
  await expect(page.locator(".exhibitorOrder")).toContainText(/kanji/i);
  await expect(page.locator(".exhibitorOrder")).toContainText(/hiragana/i);
  await expect(page.locator(".exhibitorOrder")).toContainText(/katakana/i);
  await expect(page.locator(".exhibitorOrder")).toContainText(/4/);
  await expect(page.locator(".exhibitorDetailGallery img")).toHaveCount((exhibitors.items.find((item) => item.id === "tenkokudo")?.gallery || []).length);
  for (const image of await page.locator(".exhibitorDetail img").all()) {
    await image.scrollIntoViewIfNeeded();
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
});

test("@ui exhibitor and performer detail routes load directly in each locale", async ({ page }) => {
  for (const prefix of ["", "/en", "/de", "/es", "/ja", "/vi", "/zh"]) {
    for (const route of ["/ucinkujici/ogashi-dojo", "/vystavovatele/tenkokudo"]) {
      await page.goto(`${prefix}${route}`);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator("main h1")).not.toBeEmpty();
    }
  }
});
