import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

  /** Test custom tip input functionality */
  test("custom tip input should work correctly", async ({ page }) => {
    const customTipInput = page.getByPlaceholder("Custom");
    await expect(customTipInput).toBeVisible();

    // Enter custom tip
    await customTipInput.fill("12");
    await customTipInput.blur();

    // Verify custom tip is selected
    await expect(customTipInput).toHaveValue("12");

    // Select a preset tip should clear custom input
    await page.getByText("10%").click();
    await expect(customTipInput).toHaveValue("");
  });

  /** Test error handling for zero people input */
  test("should show error when people is zero", async ({ page }) => {
    const peopleInput = page.getByLabel("Number of People");
    await peopleInput.fill("0");
    await peopleInput.blur();

    // Verify error message appears
    await expect(page.getByText("Can't be zero")).toBeVisible();

    // Verify error state clears when fixed
    await peopleInput.fill("2");
    await peopleInput.blur();
    await expect(page.getByText("Can't be zero")).not.toBeVisible();
  });

  /** Test input validation for negative numbers */
  test("should prevent negative numbers in inputs", async ({ page }) => {
    const bill = page.getByLabel("Bill");
    const people = page.getByLabel("Number of People");

    await bill.fill("-10");
    await bill.blur();
    await expect(bill).toHaveValue("");

    await people.fill("-2");
    await people.blur();
    await expect(people).toHaveValue("");
  });

  /** Test reset button disabled state */
  test("reset button should be disabled initially and when no inputs", async ({
    page,
  }) => {
    const resetButton = page.getByRole("button", { name: "Reset" });

    // Initially disabled
    await expect(resetButton).toBeDisabled();

    // Fill some inputs
    await page.getByLabel("Bill").fill("10");
    await page.getByText("10%").click();
    await page.getByLabel("Number of People").fill("1");
    await page.getByLabel("Number of People").blur();
    await expect(resetButton).toBeEnabled();

    // Clear inputs
    await resetButton.click();
    await expect(resetButton).toBeDisabled();
    await expect(page.getByLabel("Bill")).toHaveValue("");
    await expect(page.getByLabel("Number of People")).toHaveValue("");
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

  /** Test calculation with custom tip */
  test("should calculate correctly with custom tip", async ({ page }) => {
    const container = page
      .locator("div", { has: page.getByRole("button", { name: "Reset" }) })
      .nth(2);
    const bill = page.getByLabel("Bill");
    const customTip = page.getByPlaceholder("Custom");
    const people = page.getByLabel("Number of People");

    await bill.fill("100");
    await customTip.fill("12.5");
    await people.fill("4");
    await people.blur();

    await expect(container.getByText("Tip Amount/ person$3.13")).toBeVisible();
    await expect(container.getByText("Total/ person$28.13")).toBeVisible();
  });

  /** Test hover states for tip percentage buttons */
  test("tip percentage buttons should have correct hover state", async ({
    page,
  }) => {
    await page.waitForTimeout(500);

    const tipButtons = await page.getByText(/\d+%/).all();
    expect(tipButtons).toHaveLength(5);

    for (const button of tipButtons) {
      // Check initial state
      await expect(button).toHaveCSS("background-color", "rgb(0, 73, 77)");
      await expect(button).toHaveCSS("color", "rgb(244, 250, 250)");

      // Hover and check state
      await button.hover();
      await expect(button).toHaveCSS(
        "background-color",
        "rgba(38, 192, 171, 0.4)",
      );
      await expect(button).toHaveCSS("color", "rgb(0, 73, 77)");
    }
  });

  /** Test focus states for input fields */
  test("input fields should have correct focus state", async ({ page }) => {
    await page.waitForTimeout(500);

    const billInput = page.getByLabel("Bill");
    const peopleInput = page.getByLabel("Number of People");
    const customTipInput = page.getByPlaceholder("Custom");

    // Test bill input focus
    await expect(billInput).toHaveCSS("box-shadow", "none");
    await billInput.focus();
    await expect(billInput).not.toHaveCSS("box-shadow", "none");

    // Test people input focus
    await expect(peopleInput).toHaveCSS("box-shadow", "none");
    await peopleInput.focus();
    await expect(peopleInput).not.toHaveCSS("box-shadow", "none");

    // Test custom tip input focus
    await expect(customTipInput).toHaveCSS("box-shadow", "none");
    await customTipInput.focus();
    await expect(customTipInput).not.toHaveCSS("box-shadow", "none");
  });

  /** Test selected tip button state */
  test("selected tip button should have correct state", async ({ page }) => {
    await page.waitForTimeout(500);

    const tipButton = page.locator('label[for="10%"]');
    const input = page.locator('input[value="10"]');

    // Select the tip
    await tipButton.click();

    // Check selected state
    await expect(input).toBeChecked();
    await expect(tipButton).toHaveCSS("background-color", "rgb(38, 192, 171)");
    await expect(tipButton).toHaveCSS("color", "rgb(0, 73, 77)");

    // Click again to deselect
    await tipButton.click();
    await page.mouse.move(0, 0);
    await expect(input).not.toBeChecked();
    await expect(tipButton).toHaveCSS("background-color", "rgb(0, 73, 77)");
    await expect(tipButton).toHaveCSS("color", "rgb(244, 250, 250)");
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
