import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Advice generator app Page", () => {
  /** Go to Advice generator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/advice-generator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Advice generator app");
  });

  /** Test if the page works  */
  test.describe("page works correctly", () => {
    test("show loading state", async ({ page }) => {
      await expect(page.getByText("Advice #...")).toBeVisible();
      await expect(page.getByRole("status")).toBeVisible();
    });
    test("spinner component has proper accessibility attributes", async ({
      page,
    }) => {
      // Force loading state to see the spinner
      await page.evaluate(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.fetch = () => new Promise(() => {});
      });
      await page.getByLabel("Generate new advice").click();

      const spinner = page.getByRole("status");
      await expect(spinner).toBeVisible();

      // Verify SVG has proper aria attributes
      const svg = spinner.locator("svg");
      await expect(svg).toHaveAttribute("aria-hidden", "true");

      // Verify loading text is properly hidden
      const loadingText = spinner.locator(".sr-only");
      await expect(loadingText).toHaveText("Loading...");
      await expect(loadingText).toHaveClass(/sr-only/);
    });
    test("dice button works", async ({ page }) => {
      const button = page.getByLabel("Generate new advice");
      await expect(button).toBeVisible();
      await page.waitForTimeout(1000);
      const advice = page.locator("id=advice-content");
      const adviceText = await advice.innerText();
      await expect(page.getByRole("status")).not.toBeVisible();
      await expect(advice).toHaveText(/^\".*\"$/);
      await button.click();
      await expect(page.getByText("Advice #...")).toBeVisible();
      await expect(page.getByRole("status")).toBeVisible();
      await page.waitForTimeout(1000);
      await expect(page.getByRole("status")).not.toBeVisible();
      await expect(advice).toHaveText(/^\".*\"$/);
      await expect(advice).not.toHaveText(adviceText);
    });
  });

  /** Test if the page has a divider */
  test("has a divider", async ({ page }) => {
    await expect(page.getByAltText("Line Divider")).toBeVisible();
    await expect(page.getByAltText("Line Divider")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("displays correct divider image based on viewport", async ({ page }) => {
    // Check mobile view first
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileDivider = page.getByAltText("Line Divider");
    await expect(mobileDivider).toBeVisible();

    // Get the currentSrc property value
    const mobileSrc = await mobileDivider.evaluate(
      (el) => (el as HTMLImageElement).currentSrc,
    );
    expect(mobileSrc).toContain("pattern-divider-mobile.svg");

    // Check desktop view
    await page.setViewportSize({ width: 1440, height: 800 });
    await page.waitForTimeout(300);

    // Get the updated currentSrc property value
    const desktopSrc = await mobileDivider.evaluate(
      (el) => (el as HTMLImageElement).currentSrc,
    );
    expect(desktopSrc).toContain("pattern-divider-desktop.svg");
  });

  test("has proper ARIA attributes for accessibility", async ({ page }) => {
    // Verify main section has proper labeling
    await expect(page.locator("main")).toHaveAttribute(
      "aria-labelledby",
      "advice-section-title",
    );

    // Verify title is properly set for screen readers
    const title = page.locator("#advice-section-title");
    await expect(title).toHaveClass(/sr-only/);
    await expect(title).toHaveText("Advice Generator App");

    // Verify live regions for dynamic content
    const adviceIdElement = page.locator('p[aria-live="polite"]');
    await expect(adviceIdElement).toHaveAttribute("aria-live", "polite");
    await expect(adviceIdElement).toHaveAttribute("aria-atomic", "true");

    const adviceContentElement = page.locator("#advice-content");
    await expect(adviceContentElement).toHaveAttribute("aria-live", "polite");
    await expect(adviceContentElement).toHaveAttribute("aria-atomic", "true");
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
