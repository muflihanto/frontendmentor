import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Tip calculator app Page", () => {
  /** Go to Tip calculator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/tip-calculator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Tip calculator app");
  });

  /** Test if the page has a bill field */
  test("has a bill field", async ({ page }) => {
    await expect(page.getByLabel("Bill")).toBeVisible();
  });

  /** Test if the page has a select tip field */
  test("has a select tip field", async ({ page }) => {
    await expect(
      page.getByRole("group", { name: "Select Tip %" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'number of people' field */
  test("has a 'number of people' field", async ({ page }) => {
    await expect(page.getByLabel("Number of People")).toBeVisible();
  });
});
