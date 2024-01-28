import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Crowdfunding product Page", () => {
  /** Go to Crowdfunding product page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/crowdfunding-product-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Crowdfunding product page",
    );
  });

  /** Test if the page has a top navigation bar inside a header */
  test.describe("has a page header header", () => {
    test("header is visible and in viewport", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toBeVisible();
      await expect(header).toBeInViewport();
    });
    test("crowdfund logo is visible and in viewport", async ({ page }) => {
      const logo = page
        .locator("header")
        .getByRole("img", { name: "Crowdfunding Logo" });
      await expect(logo).toBeVisible();
      await expect(logo).toBeInViewport();
    });
    test("navigation is visible and in viewport", async ({ page }) => {
      const navbar = page.locator("header").getByRole("navigation");
      await expect(navbar).toBeVisible();
      await expect(navbar).toBeInViewport();
      const links = ["About", "Discover", "Get Started"];
      for (const link of links) {
        await expect(navbar.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  /** Test if the page has an 'Overview' card */
  test.describe("has an 'Overview' card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(6);
      await expect(card).toBeVisible();
    });
    test("card has all elements", async ({ page }) => {
      const card = page.locator("div").nth(6);
      await expect(
        card.getByRole("img", { name: "Mastercraft Brand Logo" }),
      ).toBeVisible();
      await expect(
        card.getByRole("heading", {
          level: 1,
          name: "Mastercraft Bamboo Monitor Riser",
        }),
      ).toBeVisible();
      await expect(
        card.getByText(
          "A beautifully & handcrafted monitor stand to reduce neck and eye strain.",
        ),
      ).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Back this project" }),
      ).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Bookmark" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a 'Statistic' card */
  test.describe("has a 'Statistic' card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(10);
      await expect(card).toBeVisible();
    });
    test("card has all elements", async ({ page }) => {
      const statisticData = [
        {
          h: "$89,914",
          p: "of $100,000 backed",
        },
        {
          h: "5,007",
          p: "total backers",
        },
        {
          h: "56",
          p: "days left",
        },
      ];
      const card = page.locator("div").nth(10);
      await card.scrollIntoViewIfNeeded();
      for (const stat of statisticData) {
        await expect(card.getByRole("heading", { name: stat.h })).toBeVisible();
        await expect(card.getByText(stat.p)).toBeVisible();
      }
    });
  });
});
