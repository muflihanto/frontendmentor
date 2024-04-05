import { test, expect } from "@playwright/test";

const navs = ["Home", "About", "Contact", "Blog", "Careers"];

test.describe("FrontendMentor Challenge - Easybank landing Page", () => {
  /** Go to Easybank landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/easybank-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Easybank landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.locator("div").nth(2);
    await expect(header.getByRole("img")).toBeVisible();
    for (const nav of navs) {
      await expect(header.getByRole("link", { name: nav })).toBeVisible();
    }
    await expect(
      header.getByRole("button", { name: "Request Invite" }),
    ).toBeVisible();
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Next generation digital banking",
      }),
    ).toBeVisible();
  });
});
