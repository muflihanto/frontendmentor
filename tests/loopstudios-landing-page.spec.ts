import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Loopstudios landing Page", () => {
  /** Go to Loopstudios landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/loopstudios-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Loopstudios landing page",
    );
  });

  /** Test if the page has a correct header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("header")).toBeInViewport();
    });
    test("has a logo", async ({ page }) => {
      await expect(
        page
          .locator("header")
          .getByRole("img", { name: "Loopstudios Logo", exact: true }),
      ).toBeVisible();
    });
    test("has a nav", async ({ page }) => {
      const header = page.locator("header");
      const links = ["About", "Careers", "Events", "Products", "Support"];
      const nav = header.getByText(links.join(""));
      await expect(nav).toBeVisible();
      for (const link of links) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  test.describe("has a hero section", () => {
    /** Test if the page has a correct heading */
    test("has a heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Immersive experiences that deliver",
        }),
      ).toBeVisible();
    });
  });
});
