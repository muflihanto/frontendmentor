import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - E-commerce product Page", () => {
  /** Go to E-commerce product page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ecommerce-product-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | E-commerce product page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img").first()).toBeVisible();
    const navlinks = ["Collections", "Men", "Women", "About", "Contact"];
    const nav = page.getByRole("navigation");
    for (const link of navlinks) {
      await expect(
        nav.getByRole("link", { name: link, exact: true }),
      ).toBeVisible();
    }
    await expect(page.locator("#cart-toggle")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "User's avatar" }),
    ).toBeVisible();
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Fall Limited Edition Sneakers",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
