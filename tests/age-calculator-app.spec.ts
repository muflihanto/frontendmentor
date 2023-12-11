import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Age calculator app Page", () => {
  /** Go to Age calculator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/age-calculator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Age calculator app");
  });

  /** Test if the page has a form */
  test("has a form", async ({ page }) => {
    await expect(page.getByText("DayMonthYear")).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
  });
});