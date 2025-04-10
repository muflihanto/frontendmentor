import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    const group = page.getByRole("group", { name: "Select Tip %" });
    await expect(group).toBeVisible();
    const inputs = await group.locator("input").all();
    expect(inputs).toHaveLength(6);
  });

  /** Test if the page has a 'number of people' field */
  test("has a 'number of people' field", async ({ page }) => {
    await expect(page.getByLabel("Number of People")).toBeVisible();
  });

  /** Test if the page has correct initial tip values */
  test("has correct initial tip values", async ({ page }) => {
    const container = page
      .locator("div", { has: page.getByRole("button", { name: "Reset" }) })
      .nth(2);
    await expect(container.getByText("Tip Amount/ person$0.00")).toBeVisible();
    await expect(container.getByText("Total/ person$0.00")).toBeVisible();
  });

  /** Test if valid input produce correct output */
  test("valid input should produce correct output", async ({ page }) => {
    const resetButton = page.getByRole("button", { name: "Reset" });
    const container = page.locator("div", { has: resetButton }).nth(2);
    await expect(container.getByText("Tip Amount/ person$0.00")).toBeVisible();
    await expect(container.getByText("Total/ person$0.00")).toBeVisible();
    const bill = page.getByLabel("Bill");
    const percent = page.getByText("10%");
    const people = page.getByLabel("Number of People");
    await bill.fill("10");
    await percent.click();
    await people.fill("2");
    await people.blur();
    await expect(container.getByText("Tip Amount/ person$0.50")).toBeVisible();
    await expect(container.getByText("Total/ person$5.50")).toBeVisible();
    // Test if reset button works
    await expect(resetButton).toBeEnabled();
    await resetButton.click();
    await expect(resetButton).toBeDisabled();
    await expect(bill).toHaveValue("");
    await expect(people).toHaveValue("");
    await expect(container.getByText("Tip Amount/ person$0.00")).toBeVisible();
    await expect(container.getByText("Total/ person$0.00")).toBeVisible();
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
