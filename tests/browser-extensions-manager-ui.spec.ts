import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Browser extensions manager UI page", () => {
  /** Go to Browser extensions manager UI page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/browser-extensions-manager-ui");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Browser extensions manager UI",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
