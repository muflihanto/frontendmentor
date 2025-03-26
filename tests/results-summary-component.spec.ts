import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Results summary component Page", () => {
  /** Go to results summary component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/results-summary-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Results summary component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Your Result",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a cta button  */
  test("has a cta button", async ({ page }) => {
    const cta = page.getByRole("button", { name: "Continue" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveCSS("background-color", "rgb(48, 59, 90)");
    await cta.hover();
    await expect(cta).toHaveCSS(
      "background-image",
      "linear-gradient(rgb(120, 87, 255) -40%, rgb(46, 43, 233))",
    );
  });

  /** Test if the page has a footer  */
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
