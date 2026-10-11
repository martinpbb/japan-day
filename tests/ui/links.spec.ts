import { test, expect } from "../helpers/fixtures";
import { routes } from "../helpers/routes";
import { localeCodes, prefixFor } from "../helpers/locales";
import { readLocaleContent } from "../helpers/content";

const performers = readLocaleContent<any>("performers");
const exhibitors = readLocaleContent<any>("exhibitors");

test("@ui links have valid hrefs and safe external targets", async ({ page }) => {
  const pages = ["/", "/program", "/ucinkujici/ogashi-dojo", "/vystavovatele/tenkokudo"];
  const knownRoutes = new Set([
    ...routes,
    ...pages.slice(2),
    ...performers.items.map(({ id }: { id: string }) => `/ucinkujici/${id}`),
    ...exhibitors.items.filter((item: { detail?: unknown }) => item.detail).map(({ id }: { id: string }) => `/vystavovatele/${id}`),
  ]);
  for (const locale of localeCodes) for (const route of pages) {
    const localizedPage = prefixFor(locale, route);
    await page.goto(localizedPage);
    const links = await page.locator("a").evaluateAll((anchors) => anchors.map((anchor) => ({ href: anchor.getAttribute("href"), target: anchor.getAttribute("target"), rel: anchor.getAttribute("rel"), nested: Boolean(anchor.querySelector("a")) })));
    for (const link of links) {
      expect(link.href, `${localizedPage} empty href`).toBeTruthy();
      const href = link.href || "";
      expect(href).not.toBe("#");
      expect(href).not.toMatch(/^javascript:/i);
      if (href?.startsWith("/")) {
        const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
        const unprefixed = path.replace(/^\/(en|de|es|ja|zh|vi)(?=\/|$)/, "") || "/";
        expect(knownRoutes.has(unprefixed), `${localizedPage} internal link ${href}`).toBeTruthy();
      }
      if (href?.startsWith("http")) expect(href).toMatch(/^https:\/\//);
      expect(link.nested, `${localizedPage} nested anchor`).toBeFalsy();
      if (link.target === "_blank") expect(link.rel || "").toMatch(/noopener|noreferrer/);
    }
  }
});
