import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Recipe Page", () => {
  /** Go to Recipe page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/recipe-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Recipe Page");
  });

  /** Test if the page has a main card */
  test("has a main card", async ({ page }) => {
    const card = page.getByRole("main");
    await expect(card).toBeVisible();
    await expect(
      card.getByRole("heading", { level: 1, name: "Simple Omelette Recipe" }),
    ).toBeVisible();
    await expect(
      card.getByText(
        " An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
