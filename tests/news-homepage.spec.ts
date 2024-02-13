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

  /** Test if the page has a main news */
  test.describe("has a main news", () => {
    test("news is visible", async ({ page }) => {
      await expect(page.locator("div").nth(4)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const container = page.locator("div").nth(4);
      // has an illustration
      await expect(
        container.getByRole("img", { name: "Web 3.0 Illustration" }),
      ).toBeVisible();
      // has a heading
      await expect(
        container.getByRole("heading", {
          level: 1,
          name: "The Bright Future of Web 3.0?",
        }),
      ).toBeVisible();
      // has a summary
      await expect(
        container.getByText(
          "We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people. But is it really fulfilling its promise?",
        ),
      ).toBeVisible();
      // has a read more link
      await expect(
        container.getByRole("link", { name: "Read more" }),
      ).toBeVisible();
    });
  });
});
