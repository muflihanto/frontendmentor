import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Room homepage Page", () => {
  /** Go to Room homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/room-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Room homepage");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Discover innovative ways to decorate",
      }),
    ).toBeVisible();
  });
});
