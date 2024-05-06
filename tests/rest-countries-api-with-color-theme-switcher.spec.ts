import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Rest Countries Api With Color Theme Switcher Page", () => {
  /** Go to Rest Countries Api With Color Theme Switcher page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/rest-countries-api-with-color-theme-switcher");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Rest Countries Api With Color Theme Switcher",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("heading", {
        level: 1,
        name: "Where in the world?",
      }),
    ).toBeVisible();
    await expect(
      header.getByRole("button", { name: "Moon Icon Dark Mode" }),
    ).toBeVisible();
  });

  /** Test if the page has countries filters */
  test.describe("has countries filters", () => {
    test("elements visible", async ({ page }) => {
      const container = page.locator("div").nth(3);
      await expect(
        container.getByPlaceholder("Search for a country..."),
      ).toBeVisible();
      await expect(
        container.getByRole("button", { name: "Filter by Region" }),
      ).toBeVisible();
    });
  });
});
