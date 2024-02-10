import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Insure landing Page", () => {
  /** Go to Insure landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/insure-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Insure landing page");
  });

  /** Test if the page has a header*/
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("banner")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByRole("banner");
      // has an insure logo
      await expect(
        header.getByRole("img", { name: "insure logo" }),
      ).toBeVisible();
      // has a navigation links
      const nav = header.getByRole("navigation");
      const links = ["How we work", "Blog", "Account", "View plans"];
      for (const link of links) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Humanizing your insurance.",
      }),
    ).toBeVisible();
  });
});
