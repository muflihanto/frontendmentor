import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Intro component with sign up form Page", () => {
  /** Go to Intro component with sign up form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/intro-component-with-signup-form");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Intro component with sign up form",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Learn to code by watching others",
      }),
    ).toBeVisible();
  });
});
