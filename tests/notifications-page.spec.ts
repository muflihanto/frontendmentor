import { test, expect } from "@playwright/test";
// import { notifications } from "../components/notifications-page/Main"

test.describe("FrontendMentor Challenge - Notifications Page", () => {
  /** Go to index page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/notifications-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/notifications page/i);
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Notifications",
      }),
    ).toBeVisible();
  });

  /** Test if the page has unread notifications indicator */
  test.describe("has unread notifications indicator", () => {
    test("indicator is visible", async ({ page }) => {
      await expect(page.locator("header div")).toBeVisible();
    });

    test("indicator has correct text", async ({ page }) => {
      await expect(page.locator("header div")).toContainText("3");
    });
  });

  /** Test if the page has "mark all as read" button */
  test('has "mark all as read" button', async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Mark all as read" }),
    ).toBeVisible();
  });
});
