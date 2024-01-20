import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Sunnyside agency landing Page", () => {
  /** Go to Sunnyside agency landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/sunnyside-agency-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Sunnyside agency landing page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We are creatives",
      }),
    ).toBeVisible();
  });

  /** Test if the page has top navigation links */
  test.describe("has top navbar", () => {
    test("has sunnyside logo", async ({ page }) => {
      const nav = page.getByRole("navigation");
      await expect(nav).toBeVisible();
      await expect(nav).toBeInViewport();
      await expect(nav.getByRole("img")).toBeVisible();
    });

    test("has navigation links", async ({ page }) => {
      const nav = page.getByRole("navigation");
      const links = await nav.getByRole("link").all();
      for (const link of links) {
        await expect(link).toBeVisible();
      }
    });
  });

  /** Test if the page has a bouncing arrow */
  test("has a bouncing arrow", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Arrow Down" })).toBeVisible();
  });

  /** Test if the page has 'Transform your brand' section */
  test.describe("has 'Transform your brand' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").first()).toBeVisible();
    });
    test("has all section elements", async ({ page }) => {
      const section = page.locator("section").first();
      await expect(section.locator("header")).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Transform your brand" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "We are a full-service creative agency specializing in helping brands grow fast. Engage your clients through compelling visuals that do most of the marketing for you.",
        ),
      ).toBeVisible();
      await expect(
        section.getByRole("link", { name: "Learn more" }),
      ).toBeVisible();
    });
  });
});
