import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Social links profile Page", () => {
  /** Go to Social links profile page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-links-profile");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Social links profile");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Jessica Randall" }),
    ).toBeVisible();
  });
});
