import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Launch countdown timer Page", () => {
  /** Go to Launch countdown timer page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/launch-countdown-timer");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Launch countdown timer");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "We‘re launching soon" }),
    ).toBeVisible();
  });

  /** Test if the page has all flip cards */
  test("has all flip cards", async ({ page }) => {
    const units = ["Days", "Hours", "Minutes", "Seconds"];
    const timer = page.getByTestId("timer");
    await expect(timer).toHaveAttribute("aria-live", "assertive");
    await expect(timer).toHaveAttribute(
      "aria-describedby",
      units.map((el) => el.toLowerCase()).join(" "),
    );
    const children = await timer.locator(">div").all();
    expect(children).toHaveLength(8);
    for (const unit of units) {
      await expect(timer.getByText(unit)).toBeVisible();
      const flipCard = page.getByTestId(`flip-${unit.toLowerCase()}`);
      await expect(flipCard).toBeVisible();
      const label = await flipCard.getAttribute("aria-label");
      expect(label).toMatch(/^\d+ \w+$/);
    }
  });

  /** Test if the flip cards have correct initial values */
  test("flip cards have correct initial values", async ({ page }) => {
    const days = await page.getByTestId("flip-days").getAttribute("aria-label");
    const hours = await page
      .getByTestId("flip-hours")
      .getAttribute("aria-label");
    const minutes = await page
      .getByTestId("flip-minutes")
      .getAttribute("aria-label");
    const seconds = await page
      .getByTestId("flip-seconds")
      .getAttribute("aria-label");

    expect(days).toMatch(/^\d+ days$/);
    expect(hours).toMatch(/^\d+ hours$/);
    expect(minutes).toMatch(/^\d+ minutes$/);
    expect(seconds).toMatch(/^\d+ seconds$/);
  });

  /** Test if the countdown timer is decreasing over time */
  test("countdown timer decreases over time", async ({ page }) => {
    // Get initial values
    const initialSeconds = await page
      .getByTestId("flip-seconds")
      .getAttribute("aria-label");

    // Poll until seconds value changes (passes as soon as the timer ticks)
    await expect
      .poll(
        async () => {
          return await page
            .getByTestId("flip-seconds")
            .getAttribute("aria-label");
        },
        { timeout: 5000 },
      )
      .not.toBe(initialSeconds);
  });

  /** Test if flip cards have correct styling on mobile and desktop */
  test("flip cards have responsive styling", async ({ page }) => {
    // Check mobile view first
    await page.setViewportSize({ width: 375, height: 667 });
    const flipCard = page.getByTestId("flip-days");
    await expect(flipCard).toHaveCSS("font-size", "32px");

    // Check desktop view
    await page.setViewportSize({ width: 1440, height: 800 });
    await expect(flipCard).toHaveCSS("font-size", "78px");
  });

  /** Test if the page has correct background styling */
  test("has correct background styling", async ({ page }) => {
    const appContainer = page.getByTestId("app-container");
    await expect(appContainer).toHaveCSS("background-image", /pattern-hills/);
    await expect(appContainer).toHaveCSS("background-image", /bg-stars/);
    await expect(appContainer).toHaveCSS("background-image", /linear-gradient/);
  });

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const nav = page.getByTestId("social-nav");
    await expect(nav).toBeAttached();
    const links = await nav.getByRole("link").all();
    expect(links).toHaveLength(3);
    for (const link of links) {
      await expect(link).toBeVisible();

      const icon = link.locator("svg");
      await expect(icon).toBeVisible();

      await expect(link).toHaveAttribute("href", ""); // Check href exists
      const defaultFill = await icon.evaluate(
        (el) => getComputedStyle(el).fill,
      );
      // Hover test – change-based, not exact rgb
      await link.hover();
      await expect
        .poll(async () => icon.evaluate((el) => getComputedStyle(el).fill))
        .not.toEqual(defaultFill);
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Challenge by Frontend Mentor");
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
