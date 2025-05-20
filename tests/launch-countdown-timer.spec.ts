import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    const timer = page.getByRole("timer");
    await expect(timer).toHaveAttribute("aria-live", "assertive");
    await expect(timer).toHaveAttribute(
      "aria-describedby",
      units.map((el) => el.toLowerCase()).join(" "),
    );
    const children = await timer.locator(">div").all();
    expect(children).toHaveLength(8);
    await page.waitForTimeout(1000);
    for (const unit of units) {
      await expect(timer.getByText(unit)).toBeVisible();
      const flipCard = timer.locator(`id=${unit.toLowerCase()}`);
      await expect(timer.locator(`id=${unit.toLowerCase()}`)).toBeVisible();
      const label = await flipCard.getAttribute("aria-label");
      expect(label).toMatch(/^\d+ \w+$/);
    }
  });

  /** Test if the flip cards have correct initial values */
  test("flip cards have correct initial values", async ({ page }) => {
    const timer = page.getByRole("timer");
    const days = await timer.locator("id=days").getAttribute("aria-label");
    const hours = await timer.locator("id=hours").getAttribute("aria-label");
    const minutes = await timer
      .locator("id=minutes")
      .getAttribute("aria-label");
    const seconds = await timer
      .locator("id=seconds")
      .getAttribute("aria-label");

    expect(days).toMatch(/^\d+ days$/);
    expect(hours).toMatch(/^\d+ hours$/);
    expect(minutes).toMatch(/^\d+ minutes$/);
    expect(seconds).toMatch(/^\d+ seconds$/);
  });

  /** Test if the countdown timer is decreasing over time */
  test("countdown timer decreases over time", async ({ page }) => {
    const timer = page.getByRole("timer");

    // Get initial values
    const initialSeconds = await timer
      .locator("id=seconds")
      .getAttribute("aria-label");

    // Wait for 2 seconds
    await page.waitForTimeout(2000);

    // Get new values
    const newSeconds = await timer
      .locator("id=seconds")
      .getAttribute("aria-label");

    // Verify at least seconds have changed (other units might not change in 2 seconds)
    expect(initialSeconds).not.toBe(newSeconds);
  });

  /** Test if flip cards have correct styling on mobile and desktop */
  test("flip cards have responsive styling", async ({ page }) => {
    // Check mobile view first
    await page.setViewportSize({ width: 375, height: 667 });
    const flipCard = page.locator("id=days");
    await expect(flipCard).toHaveCSS("font-size", "32px");

    // Check desktop view
    await page.setViewportSize({ width: 1440, height: 800 });
    await expect(flipCard).toHaveCSS("font-size", "78px");
  });

  /** Test if the page has correct background styling */
  test("has correct background styling", async ({ page }) => {
    const appContainer = page.locator(".App");
    await expect(appContainer).toHaveCSS("background-image", /pattern-hills/);
    await expect(appContainer).toHaveCSS("background-image", /bg-stars/);
    await expect(appContainer).toHaveCSS("background-image", /linear-gradient/);
  });

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const links = await page.getByRole("navigation").getByRole("link").all();
    expect(links).toHaveLength(3);
    for (const link of links) {
      await expect(link).toBeVisible();

      const icon = link.locator("svg");
      await expect(icon).toBeVisible();

      await expect(link).toHaveAttribute("href", ""); // Check href exists
      await expect(icon).toHaveCSS("fill", "rgb(131, 133, 169)"); // Initial color

      // Hover test
      await link.hover();
      await page.waitForTimeout(500);
      await expect(icon).toHaveCSS("fill", "rgb(251, 96, 135)"); // Hover color

      await page.mouse.move(0, 0);
      await page.waitForTimeout(500);
      await expect(icon).toHaveCSS("fill", "rgb(131, 133, 169)"); // Initial color
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
