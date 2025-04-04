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

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const links = await page.getByRole("navigation").getByRole("link").all();
    expect(links).toHaveLength(3);
    for (const link of links) {
      await expect(link).toBeVisible();
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
