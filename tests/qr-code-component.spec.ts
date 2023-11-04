import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - QR code component Page", () => {
  /** Go to QR code component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/qr-code-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | QR code component");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Improve your front-end skills by building projects",
      }),
    ).toBeVisible();
  });
});
