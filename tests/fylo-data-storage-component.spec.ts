import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo data storage component Page", () => {
  /** Go to Fylo data storage component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-data-storage-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo data storage component",
    );
  });

  /** Test if the page has a header image */
  test("has a header image", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Fylo Company Logo" }),
    ).toBeVisible();
  });
});
