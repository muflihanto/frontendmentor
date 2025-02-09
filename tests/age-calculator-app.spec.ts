import AxeBuilder from "@axe-core/playwright";
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

  /** Test if the page form works */
  test.describe("form works", () => {
    test("can handle empty inputs", async ({ page }) => {
      const form = page.locator("form");
      const submit = form.getByRole("button");
      const dayLabel = page.getByText("Day", { exact: true });
      const monthLabel = page.getByText("Month", { exact: true });
      const yearLabel = page.getByText("Year", { exact: true });
      const getErrorWarnings = async () =>
        await page.getByText("This field is required").all();
      expect(await getErrorWarnings()).toHaveLength(0);
      await expect(dayLabel).toHaveCSS("color", "rgb(113, 111, 111)");
      await expect(monthLabel).toHaveCSS("color", "rgb(113, 111, 111)");
      await expect(yearLabel).toHaveCSS("color", "rgb(113, 111, 111)");
      await submit.click();
      expect(await getErrorWarnings()).toHaveLength(3);
      await expect(dayLabel).toHaveCSS("color", "rgb(255, 87, 87)");
      await expect(monthLabel).toHaveCSS("color", "rgb(255, 87, 87)");
      await expect(yearLabel).toHaveCSS("color", "rgb(255, 87, 87)");
    });
    test("can handle invalid inputs", async ({ page }) => {
      const form = page.locator("form");
      const submit = form.getByRole("button");
      const dayField = form.getByPlaceholder("DD");
      const monthField = form.getByPlaceholder("MM");
      const yearField = form.getByPlaceholder("YYYY");
      const dayError = page.getByText("Must be a valid day");
      const monthError = page.getByText("Must be a valid month");
      const yearError = page.getByText("Must be a valid year");
      const pastError = page.getByText("Must be in the past");
      await expect(dayError).not.toBeVisible();
      await expect(monthError).not.toBeVisible();
      await expect(yearError).not.toBeVisible();
      // case: invalid all input values
      await dayField.fill("35");
      await monthField.fill("15");
      await yearField.fill("-1");
      await submit.click();
      await expect(dayError).toBeVisible();
      await expect(monthError).toBeVisible();
      await expect(yearError).toBeVisible();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      const fillAndSubmit = async (date: Date) => {
        await dayField.fill(`${date.getDate()}`);
        await monthField.fill(`${date.getMonth() + 1}`);
        await yearField.fill(`${date.getFullYear()}`);
        await submit.click();
      };
      // case: future year value
      let date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      await fillAndSubmit(date);
      await expect(
        page.locator("label", { hasText: "Year", has: pastError }),
      ).toBeVisible();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      // case: future month value
      date = new Date();
      date.setMonth(date.getMonth() + 1);
      await fillAndSubmit(date);
      await expect(
        page.locator("label", { hasText: "Month", has: pastError }),
      ).toBeVisible();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      // case: future day value
      date = new Date();
      date.setDate(date.getDate() + 1);
      await fillAndSubmit(date);
      const dayErrorVisible = await page
        .locator("label", { hasText: "Day", has: pastError })
        .isVisible();
      const monthErrorVisible = await page
        .locator("label", { hasText: "Month", has: pastError })
        .isVisible();
      expect(dayErrorVisible || monthErrorVisible).toBeTruthy();
    });
    test("can handle valid inputs", async ({ page }) => {
      const form = page.locator("form");
      const submit = form.getByRole("button");
      const dayField = form.getByPlaceholder("DD");
      const monthField = form.getByPlaceholder("MM");
      const yearField = form.getByPlaceholder("YYYY");
      const yearDiff = page.getByText("- -years");
      const monthDiff = page.getByText("- -months");
      const dayDiff = page.getByText("- -days");
      await dayField.fill("12");
      await monthField.fill("12");
      await yearField.fill("2012");
      await expect(yearDiff).toBeVisible();
      await expect(monthDiff).toBeVisible();
      await expect(dayDiff).toBeVisible();
      await submit.click();
      await page.waitForTimeout(2000);
      await expect(yearDiff).not.toBeVisible();
      await expect(monthDiff).not.toBeVisible();
      await expect(dayDiff).not.toBeVisible();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      // case: year < 100
      await dayField.fill("12");
      await monthField.fill("12");
      await yearField.fill("12");
      await expect(yearDiff).toBeVisible();
      await expect(monthDiff).toBeVisible();
      await expect(dayDiff).toBeVisible();
      await submit.click();
      await page.waitForTimeout(2000);
      await expect(yearDiff).not.toBeVisible();
      await expect(monthDiff).not.toBeVisible();
      await expect(dayDiff).not.toBeVisible();
    });
  });

  test.describe("has accessibility features", () => {
    test("should allow keyboard navigation through the form", async ({
      page,
    }) => {
      await page.keyboard.press("Tab");
      await expect(page.locator('input[placeholder="DD"]')).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.locator('input[placeholder="MM"]')).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.locator('input[placeholder="YYYY"]')).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(
        page.locator('button[aria-label="Calculate age"]'),
      ).toBeFocused();

      await page.keyboard.press("Enter");
      await expect(page.locator('p[id="day-error"]')).toBeVisible();
      await expect(page.locator('p[id="month-error"]')).toBeVisible();
      await expect(page.locator('p[id="year-error"]')).toBeVisible();
    });

    test("should announce error messages to screen readers", async ({
      page,
    }) => {
      await page.fill('input[placeholder="DD"]', "30");
      await page.fill('input[placeholder="MM"]', "02");
      await page.fill('input[placeholder="YYYY"]', "2023");

      await page.click('button[aria-label="Calculate age"]');

      const dayError = page.locator('p[id="day-error"]');
      await expect(dayError).toHaveAttribute("role", "alert");
      await expect(dayError).toHaveAttribute("aria-live", "assertive");
      await expect(dayError).toContainText("Must be a valid date");
    });

    test("should set aria-invalid and aria-describedby attributes on invalid inputs", async ({
      page,
    }) => {
      await page.fill('input[placeholder="DD"]', "30");
      await page.fill('input[placeholder="MM"]', "02");
      await page.fill('input[placeholder="YYYY"]', "2023");

      await page.click('button[aria-label="Calculate age"]');

      const dayInput = page.locator('input[placeholder="DD"]');
      await expect(dayInput).toHaveAttribute("aria-invalid", "true");
      await expect(dayInput).toHaveAttribute("aria-describedby", "day-error");
    });

    test("should manage focus correctly after form submission", async ({
      page,
    }) => {
      await page.fill('input[placeholder="DD"]', "15");
      await page.fill('input[placeholder="MM"]', "05");
      await page.fill('input[placeholder="YYYY"]', "1990");

      await page.click('button[aria-label="Calculate age"]');

      await expect(
        page.locator('button[aria-label="Calculate age"]'),
      ).toBeFocused();
    });
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
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
