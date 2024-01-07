import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Article preview component Page", () => {
  /** Go to Article preview component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/article-preview-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Article preview component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct article preview text */
  test("has article preview text", async ({ page }) => {
    await expect(
      page.getByText(
        "Ever been in a room and felt like something was missing? Perhaps it felt slightl",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a correct article preview image */
  test("has article preview image", async ({ page }) => {
    await expect(page.getByAltText("Drawer")).toBeVisible();
  });

  /** Test if the page has a correct article preview author & published date */
  test("has article preview author & published date", async ({ page }) => {
    const main = page.locator("main>div");
    await expect(
      main.getByRole("img", { name: "Michelle Appleton's Avatar" }),
    ).toBeVisible();
    await expect(main.getByText("Michelle Appleton")).toBeVisible();
    await expect(main.getByText("28 Jun 2020")).toBeVisible();
  });
});
