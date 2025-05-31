import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

  /** Test if the page shows correct formatted values in inputs */
  test("shows formatted values in inputs", async ({ page }) => {
    const form = page.locator("form");
    const amount = form.getByLabel("Mortgage Amount£");

    await amount.fill("300000");
    await expect(amount).toHaveValue("300,000");

    await amount.fill("1234567");
    await expect(amount).toHaveValue("1,234,567");
  });

  /** Test if the page has empty result components */
  test("has empty result components", async ({ page }) => {
    const results = page.getByText("Results shown hereComplete");
    await expect(results.locator("svg")).toBeVisible();
    await expect(
      results.getByRole("heading", { name: "Results shown here" }),
    ).toBeVisible();
    await expect(
      results.getByText(
        "Complete the form and click “calculate repayments” to see what your monthly repayments would be.",
      ),
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

  /** Test if the page handles invalid inputs */
  test("shows errors for invalid inputs", async ({ page }) => {
    const form = page.locator("form");
    const amount = form.getByLabel("Mortgage Amount£");
    const term = form.getByLabel("Mortgage Termyears");
    const rate = form.getByLabel("Interest Rate%");

    await amount.fill("0");
    await term.fill("0");
    await rate.fill("0");
    await form.getByRole("button", { name: "Calculate Repayments" }).click();

    const errorMessages = await page.getByText("This field is required").all();
    expect(errorMessages).toHaveLength(4);
  });

  /** Test if the page can handle valid inputs */
  test("can handle valid inputs", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    const amount = form.getByLabel("Mortgage Amount£");
    const term = form.getByLabel("Mortgage Termyears");
    const rate = form.getByLabel("Interest Rate%");
    const repayment = form.getByText("Repayment", { exact: true });
    await amount.fill("300000");
    await term.fill("25");
    await rate.fill("5.25");
    await repayment.click();
    await form.getByRole("button", { name: "Calculate Repayments" }).click();
    const results = page.getByText("Your resultsYour results are");
    await expect(
      results.getByRole("heading", { name: "Your results" }),
    ).toBeVisible();
    await expect(
      results.getByText(
        "Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.",
      ),
    ).toBeVisible();
    await expect(results.getByText("£1,797.74")).toBeVisible();
    await expect(results.getByText("£539,322.94")).toBeVisible();
  });

  /** Test if the page can handle interest-only calculation */
  test("can handle interest-only calculation", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    const amount = form.getByLabel("Mortgage Amount£");
    const term = form.getByLabel("Mortgage Termyears");
    const rate = form.getByLabel("Interest Rate%");
    const interestOnly = form.getByText("Interest Only");

    await amount.fill("300000");
    await term.fill("25");
    await rate.fill("5.25");
    await interestOnly.click();
    await form.getByRole("button", { name: "Calculate Repayments" }).click();

    const results = page.getByText("Your resultsYour results are");
    await expect(results.getByText("£797.74")).toBeVisible();
    await expect(results.getByText("£239,322.94")).toBeVisible();
  });

  /** Test if the page can reset all fields */
  test("can reset all fields", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    const amount = form.getByLabel("Mortgage Amount£");
    const term = form.getByLabel("Mortgage Termyears");
    const rate = form.getByLabel("Interest Rate%");
    const repayment = form.getByText("Repayment", { exact: true });
    await amount.fill("300000");
    await term.fill("25");
    await rate.fill("5.25");
    await repayment.click();
    await expect(amount).toHaveValue("300,000");
    await expect(term).toHaveValue("25");
    await expect(rate).toHaveValue("5.25");
    await expect(page.locator("#repayment")).toBeChecked();
    const clearAll = page.getByRole("button", { name: "Clear All" });
    await clearAll.click();
    await expect(amount).toHaveValue("");
    await expect(term).toHaveValue("");
    await expect(rate).toHaveValue("");
    await expect(page.locator("#repayment")).not.toBeChecked();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
