import { test, expect } from "../helpers/fixtures";
import { assertRenderedDetail } from "../helpers/assertions";
import { localeCodes, prefixFor, type Locale } from "../helpers/locales";

const performers = [
  ["aikido-chyne", "Aikido Chýně"], ["marek-hora", "Marek Hora"],
  ["noriko-komiyama", "Noriko Komiyama"], ["nihon-bunka-plzen", "Nihon Bunka Plzeň"],
  ["gorin", "Gorin"], ["aska-pluskal", "Aska Pluskal"], ["iaido", "Iaido"],
  ["sandomon-kendo-klub-praha", "Sandomon Kendo Klub Praha"], ["marketa-franova", "Markéta Franová"],
  ["shakuhachi", "Shakuhachi Shibumi"], ["yosakoi-hanamaru", "Yosakoi Hanamaru"], ["radka-tumova", "Radka Tůmova"],
] as const;

function assertNoRuntimeErrors(runtime: { pageErrors: string[]; consoleErrors: string[] }) {
  expect(runtime.pageErrors, `page errors: ${runtime.pageErrors.join(" | ")}`).toEqual([]);
  expect(runtime.consoleErrors, `console errors: ${runtime.consoleErrors.join(" | ")}`).toEqual([]);
}

test("@ui every performer card navigates to a rendered detail page", async ({ page, runtime }) => {
  for (const [id, name] of performers) {
    await page.goto("/");
    await page.locator(`#host-${id}`).click();
    await expect(page).toHaveURL(new RegExp(`/ucinkujici/${id}/?$`));
    await assertRenderedDetail(page, name);
    assertNoRuntimeErrors(runtime);
  }
});

test("@ui every performer detail route renders directly", async ({ page, runtime }) => {
  for (const [id, name] of performers) {
    await page.goto(`/ucinkujici/${id}`);
    await assertRenderedDetail(page, name);
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
