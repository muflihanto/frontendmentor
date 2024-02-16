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

  /** Test if the page has a form */
  test.describe("has a form", () => {
    test("form is visible", async ({ page }) => {
      await expect(page.locator("form")).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const form = page.locator("form");
      // has all fields
      await expect(form.getByText("Cardholder Name")).toBeVisible();
      await expect(form.getByPlaceholder("e.g. Jane Appleseed")).toBeVisible();
      await expect(form.getByText("Card Number")).toBeVisible();
      await expect(
        form.getByPlaceholder("e.g. 1234 5678 9123 0000"),
      ).toBeVisible();
      await expect(form.getByText("Exp. Date (MM/YY)")).toBeVisible();
      await expect(form.getByPlaceholder("MM")).toBeVisible();
      await expect(form.getByPlaceholder("YY")).toBeVisible();
      await expect(form.getByText("CVC")).toBeVisible();
      await expect(
        form.getByPlaceholder("e.g. 123", { exact: true }),
      ).toBeVisible();
      // has a submit button
      await expect(form.getByRole("button", { name: "Confirm" })).toBeVisible();
    });
    test.describe("form is working", () => {
      test("valid input works", async ({ page }) => {
        const form = page.locator("form");
        const fields = [
          "e.g. Jane Appleseed",
          "e.g. 1234 5678 9123 0000",
          "MM",
          "YY",
          "e.g. 123",
        ];
        const inputs = [
          "Jane Appleseed",
          "1234 5678 9123 0000",
          "12",
          "24",
          "123",
        ];
        for (const [index, input] of Object.entries(inputs)) {
          await form
            .getByPlaceholder(fields[Number(index)], { exact: true })
            .fill(input);
        }
        const confirm = form.getByRole("button", { name: "Confirm" });
        await confirm.click();
        await page.waitForTimeout(500);
        await expect(
          page.getByText("Thank you!We've added your card detailsContinue"),
        ).toBeVisible();
        const continueButton = page.getByRole("button", { name: "Continue" });
        await expect(continueButton).toBeVisible();
        await continueButton.click();
        await page.waitForTimeout(500);
        await expect(
          page.getByText("Thank you!We've added your card detailsContinue"),
        ).not.toBeVisible();
      });
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
