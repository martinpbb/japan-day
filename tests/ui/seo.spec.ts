import { test, expect } from "../helpers/fixtures";
import { localeCodes, prefixFor } from "../helpers/locales";
import { routes } from "../helpers/routes";

test.describe("@seo route metadata", () => {
  for (const locale of localeCodes) for (const route of routes.slice(0, 4)) test(`${locale} ${route}`, async ({ page }) => {
    await page.goto(prefixFor(locale, route));
    await expect(page.locator("meta[name=description]")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveCount(1);
    await expect(page.locator("meta[property='og:title']")).toHaveCount(1);
    await expect(page.locator("link[rel=alternate]")).toHaveCount(8);
    await expect(page.locator("script[type='application/ld+json']").first()).toBeAttached();
  });
});

test.describe("@seo Event JSON-LD", () => {
  const expectedLanguage: Record<string, string> = { cs: "cs", en: "en", ja: "ja", de: "de", es: "es", zh: "zh-CN", vi: "vi" };

  for (const locale of localeCodes) test(`${locale} homepage has complete Event schema`, async ({ page }) => {
    await page.goto(prefixFor(locale, "/"));
    const events = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts
      .map((script) => JSON.parse(script.textContent || "{}"))
      .filter((schema) => schema["@type"] === "Event"));
    expect(events).toHaveLength(1);
    const event = events[0];
    expect(event.startDate).toBe("2026-10-10T10:00:00+02:00");
    expect(event.endDate).toBe("2026-10-10T19:00:00+02:00");
    expect(event.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(event.organizer).toMatchObject({ name: "Město Chýně", url: "https://www.chyne.cz/" });
    expect(event.performer).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Marek Hora" }), expect.objectContaining({ name: "Gorin" }),
      expect.objectContaining({ name: "SAN DŌ MON Kendō Klub Praha" }), expect.objectContaining({ name: "Budō Plzeň" }),
      expect.objectContaining({ name: "Yosakoi Hanamaru" })
    ]));
    expect(event.performer.length).toBe(12);
    expect(event.offers).toMatchObject({ priceCurrency: "CZK" });
    expect(event.offers.url).toBeTruthy();
    expect(event.offers).not.toHaveProperty("validFrom");
    expect(event.inLanguage).toBe(expectedLanguage[locale]);
    expect(event.url).toBeTruthy();
  });
});
