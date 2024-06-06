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
      await yearField.fill("12");
      await submit.click();
      await expect(dayError).toBeVisible();
      await expect(monthError).toBeVisible();
      await expect(yearError).toBeVisible();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      // case: future year value
      await dayField.fill("12");
      await monthField.fill("12");
      await yearField.fill("2025");
      await submit.click();
      await expect(
        page.locator("label", { hasText: "Year", has: pastError }),
      ).toBeVisible();
      await page.reload();
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
