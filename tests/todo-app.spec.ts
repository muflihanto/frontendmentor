import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Todo app Page", () => {
  /** Go to Todo app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/todo-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Todo app");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "TODO" })).toBeVisible();
  });
});
