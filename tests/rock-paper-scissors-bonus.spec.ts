import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Rock, Paper, Scissors Bonus Page", () => {
  /** Go to Rock, Paper, Scissors Bonus page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/rock-paper-scissors-bonus");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Rock, Paper, Scissors");
  });

  /** Test if the page has a logo */
  test("has a logo", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Rock Paper Scissors Logo" }),
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
