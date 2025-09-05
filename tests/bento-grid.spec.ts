import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Bento grid page", () => {
  /** Go to Bento grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/bento-grid");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Bento grid");
  });

  /** Test if the page has a correct number of sections */
  test("has correct number of sections", async ({ page }) => {
    const sections = await page.locator("section").all();
    expect(sections).toHaveLength(8);
  });

  /** Test if the page has a heading and an image on every sections */
  test("has a heading and an image on every sections", async ({ page }) => {
    const sections = await page.locator("section").all();
    for (const section of sections) {
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("heading")).toBeVisible();
      await expect(section.getByRole("img")).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
