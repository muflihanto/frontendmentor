import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Profile card component Page", () => {
  /** Go to Profile card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/profile-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Profile card component");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Victor Crest",
      }),
    ).toBeVisible();
  });
});
