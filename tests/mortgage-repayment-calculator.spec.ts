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

  /** Test if the page has all form fields */
  test("has all form fields", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    await expect(
      form.getByRole("heading", { name: "Mortgage Calculator" }),
    ).toBeVisible();
    await expect(form.getByRole("button", { name: "Clear All" })).toBeVisible();
    await expect(
      form.getByText("Mortgage Amount", { exact: true }),
    ).toBeVisible();
    await expect(form.getByLabel("Mortgage Amount£")).toBeVisible();
    await expect(
      form.getByText("Mortgage Term", { exact: true }),
    ).toBeVisible();
    await expect(form.getByLabel("Mortgage Termyears")).toBeVisible();
    await expect(
      form.getByText("Interest Rate", { exact: true }),
    ).toBeVisible();
    await expect(form.getByLabel("Interest Rate%")).toBeVisible();
    await expect(form.getByText("Repayment", { exact: true })).toBeVisible();
    await expect(form.getByText("Interest Only")).toBeVisible();
    await expect(
      form.getByRole("button", { name: "Calculate Repayments" }),
    ).toBeVisible();
  });

  /** Test if the page can handle empty inputs */
  test("can handle empty inputs", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    await form.getByRole("button", { name: "Calculate Repayments" }).click();
    const errorMessages = await page.getByText("This field is required").all();
    expect(errorMessages).toHaveLength(4);
    for (const err of errorMessages) {
      await expect(err).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
