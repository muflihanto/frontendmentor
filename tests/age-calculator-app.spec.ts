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
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
  });
});
