import { test, expect } from "../helpers/fixtures";
import { assertRenderedDetail } from "../helpers/assertions";
import { localeCodes, prefixFor, type Locale } from "../helpers/locales";
import { readLocaleContent } from "../helpers/content";

const performers = ["aikido-chyne", "marek-hora", "noriko-komiyama", "nihon-bunka-plzen", "gorin", "aska-pluskal", "iaido", "sandomon-kendo-klub-praha", "marketa-franova", "shakuhachi", "yosakoi-hanamaru", "radka-tumova", "ogashi-dojo"] as const;
const ogashi = readLocaleContent<any>("performers").items.find((performer: { id: string }) => performer.id === "ogashi-dojo");

function assertNoRuntimeErrors(runtime: { pageErrors: string[]; consoleErrors: string[] }) {
  expect(runtime.pageErrors, `page errors: ${runtime.pageErrors.join(" | ")}`).toEqual([]);
  expect(runtime.consoleErrors, `console errors: ${runtime.consoleErrors.join(" | ")}`).toEqual([]);
}

test("@ui every performer card navigates to a rendered detail page", async ({ page, runtime }) => {
  for (const id of performers) {
    await page.goto("/");
    const card = page.locator(`#host-${id}`);
    const name = await card.locator("h3").innerText();
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/ucinkujici/${id}/?$`));
    await assertRenderedDetail(page, name);
    assertNoRuntimeErrors(runtime);
  }
});

test("@ui every performer detail route renders directly", async ({ page, runtime }) => {
  await page.goto("/");
  const names = new Map<string, string>();
  for (const id of performers) names.set(id, await page.locator(`#host-${id} h3`).innerText());
  for (const id of performers) {
    await page.goto(`/ucinkujici/${id}`);
    await assertRenderedDetail(page, names.get(id)!);
    assertNoRuntimeErrors(runtime);
  }
});

test("@ui one performer click flow renders in every locale", async ({ page, runtime }) => {
  for (const locale of localeCodes as Locale[]) {
    await page.goto(prefixFor(locale, "/"));
    await page.locator("#host-nihon-bunka-plzen").click();
    await expect(page).toHaveURL(new RegExp(prefixFor(locale, "/ucinkujici/nihon-bunka-plzen").replaceAll("/", "\\/") + "/?$"));
    await assertRenderedDetail(page, /\S+/);
    assertNoRuntimeErrors(runtime);
  }
});

test("@ui ogashi-dojo detail preserves its Japanese name, image and programme link", async ({ page }) => {
  await page.goto("/ucinkujici/ogashi-dojo");
  await expect(page.locator("main h1")).toHaveText(ogashi.name);
  const image = page.locator(".performerDetailImage");
  await expect(image).toHaveAttribute("src", ogashi.image);
  expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('.performerScheduleLink[href="/program"]')).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/\?gashi|D\?j\?|Sh\?den|Shint\?-ry\?/i);
});
