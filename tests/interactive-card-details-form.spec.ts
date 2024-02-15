import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive card details form Page", () => {
  /** Go to Interactive card details form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-card-details-form");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive card details form",
    );
  });

  /** Test if the page has a front card preview */
  test.describe("has a front card preview", () => {
    test("card is visible", async ({ page }) => {
      await expect(page.locator("div").nth(5)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const card = page.locator("div").nth(5);
      // has an initial card number
      await expect(card.getByText("0000 0000 0000 0000")).toBeVisible();
      // has an initial cardholder name
      await expect(card.getByText("Jane Appleseed")).toBeVisible();
      // has an initial exp. date
      await expect(card.getByText("00/00")).toBeVisible();
    });
  });

  /** Test if the page has a back card preview */
  test.describe("has a back card preview", () => {
    test("card is visible", async ({ page }) => {
      await expect(page.locator("div").nth(4)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const card = page.locator("div").nth(4);
      // has an initial cvc number
      await expect(card.getByText("000", { exact: true })).toBeVisible();
    });
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
  });
});
