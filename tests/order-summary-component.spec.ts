import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Order summary card Page", () => {
  /** Go to Order summary card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/order-summary-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Order summary card");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Order Summary",
      }),
    ).toBeVisible();
  });
});
