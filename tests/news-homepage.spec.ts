import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - News homepage Page", () => {
  /** Go to News homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/news-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | News homepage");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "The Bright Future of Web 3.0?",
      }),
    ).toBeVisible();
  });
});
