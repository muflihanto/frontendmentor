import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Shortly URL shortening API Challenge Page", () => {
  /** Go to Shortly URL shortening API Challenge page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/url-shortening-api");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Shortly URL shortening API Challenge",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "More than just shorter links",
      }),
    ).toBeVisible();
  });
});