import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Advice generator app Page", () => {
  /** Go to Advice generator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/advice-generator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Advice generator app");
  });

  /** Test if the page works  */
  test.describe("page works correctly", () => {
    test("show loading state", async ({ page }) => {
      await expect(page.getByText("Advice #...")).toBeVisible();
      await expect(page.getByRole("status")).toBeVisible();
    });
    test("dice button works", async ({ page }) => {
      const button = page.getByLabel("Generate new advice");
      await expect(button).toBeVisible();
      await page.waitForTimeout(1000);
      const advice = page.locator("id=advice-content");
      const adviceText = await advice.innerText();
      await expect(page.getByRole("status")).not.toBeVisible();
      await expect(advice).toHaveText(/^\".*\"$/);
      await button.click();
      await expect(page.getByText("Advice #...")).toBeVisible();
      await expect(page.getByRole("status")).toBeVisible();
      await page.waitForTimeout(1000);
      await expect(page.getByRole("status")).not.toBeVisible();
      await expect(advice).toHaveText(/^\".*\"$/);
      await expect(advice).not.toHaveText(adviceText);
    });
  });

  /** Test if the page has a divider */
  test("has a divider", async ({ page }) => {
    await expect(page.getByAltText("Line Divider")).toBeVisible();
    await expect(page.getByAltText("Line Divider")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
