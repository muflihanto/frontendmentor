import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Huddle landing page with single introductory section", () => {
  /** Go to Huddle landing page with single introductory section before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/huddle-landing-page-with-single-introductory-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Huddle landing page with single introductory section",
    );
  });

  /** Test if the page has a correct huddle logo */
  test("has a huddle logo", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Huddle Logo" })).toBeVisible();
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Build The Community Your Fans Will Love",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct body text */
  test("has a body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a correct register link */
  test("has a register link", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  });

  /** Test if the page has a correct mockup illustration */
  test("has a mockup illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Huddle Illustration Mockup" }),
    ).toBeVisible();
  });

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const names = ["Facebook", "Twitter", "Instagram"];
    const container = page.locator("div").nth(6);
    expect(await container.getByRole("link").all()).toHaveLength(3);
    for (const name of names) {
      const link = container.getByRole("link", { name });
      await expect(link).toBeVisible();
      const svg = link.locator("svg");
      await expect(svg).toBeVisible();
      const box = await svg.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    }
  });

  /** Test if the page has a correct footer */
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
