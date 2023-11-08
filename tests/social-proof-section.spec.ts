import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Social proof section Page", () => {
  /** Go to Social proof section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-proof-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Social proof section");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "10,000+ of our users love our products.",
      }),
    ).toBeVisible();
  });
});
