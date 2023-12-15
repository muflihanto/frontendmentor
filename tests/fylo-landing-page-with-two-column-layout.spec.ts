import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with two column layout Page", () => {
  /** Go to Fylo landing page with two column layout page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-landing-page-with-two-column-layout");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with two column layout",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
  });
});
