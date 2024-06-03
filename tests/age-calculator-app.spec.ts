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

  /** Test if the page has main card */
  test("has main card", async ({ page }) => {
    const form = page.locator("form");
    await expect(form.getByPlaceholder("DD")).toBeVisible();
    await expect(form.getByPlaceholder("MM")).toBeVisible();
    await expect(form.getByPlaceholder("YYYY")).toBeVisible();
    await expect(form.getByRole("button")).toBeVisible();
    await expect(page.getByText("- -years")).toBeVisible();
    await expect(page.getByText("- -months")).toBeVisible();
    await expect(page.getByText("- -days")).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
  });
});
