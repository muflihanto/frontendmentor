import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Social media dashboard with theme switcher Page", () => {
  /** Go to Social media dashboard with theme switcher page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-media-dashboard-with-theme-switcher");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Social media dashboard with theme switcher",
    );
  });

  /** Test if the page has a header image */
  test("has a header image", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Social Media Dashboard" }),
    ).toBeVisible();
  });
});
