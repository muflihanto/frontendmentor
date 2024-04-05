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

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "Next generation digital banking",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Take your financial life online. Your Easybank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Request Invite" }),
    ).toBeVisible();
    await expect(section.getByRole("img", { name: "Mockup" })).toBeVisible();
  });
});
