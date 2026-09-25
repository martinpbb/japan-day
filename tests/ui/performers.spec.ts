import { test, expect } from "../helpers/fixtures";
import { assertRenderedDetail } from "../helpers/assertions";
import { localeCodes, prefixFor, type Locale } from "../helpers/locales";

const performers = ["aikido-chyne", "marek-hora", "noriko-komiyama", "nihon-bunka-plzen", "gorin", "aska-pluskal", "iaido", "sandomon-kendo-klub-praha", "marketa-franova", "shakuhachi", "yosakoi-hanamaru", "radka-tumova"] as const;

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
