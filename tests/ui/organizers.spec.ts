import { test, expect } from "../helpers/fixtures";

test("@ui organizers and patronage render", async ({ page }) => {
  await page.goto("/o-akci");
  await expect(page.locator("main")).toContainText(/Chýně|Chyne|Japan|日本/);
});
