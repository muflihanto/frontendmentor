import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Mortgage Repayment Calculator Page", () => {
  /** Go to Mortgage Repayment Calculator page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/mortgage-repayment-calculator");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Mortgage Repayment Calculator",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
