import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - News homepage Page", () => {
  /** Go to News homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/news-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | News homepage");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "The Bright Future of Web 3.0?",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByRole("banner").first()).toBeVisible();
      await expect(page.getByRole("banner").first()).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByRole("banner").first();
      // has a company logo
      await expect(
        header.getByRole("img", { name: "Company Logo" }),
      ).toBeVisible();
      // has all navlinks
      const links = ["Home", "New", "Popular", "Trending", "Categories"];
      for (const link of links) {
        await expect(header.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });
});
