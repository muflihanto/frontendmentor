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

  test.describe("has a 'Interactive' section", () => {
    /** Test if the page has a correct heading */
    test("section is visible", async ({ page }) => {
      await expect(page.locator("div").nth(5)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(5);
      // has an illustration
      await expect(
        section.getByRole("img", { name: "A Man Playing Game With VR" }),
      ).toBeVisible();
      // has a heading
      await expect(
        section.getByRole("heading", { name: "The leader in interactive VR" }),
      ).toBeVisible();
      // has a text
      await expect(
        section.getByText(
          "Founded in 2011, Loopstudios has been producing world-class virtual reality projects for some of the best companies around the globe. Our award-winning creations have transformed businesses through digital experiences that bind to their brand.",
        ),
      ).toBeVisible();
    });
  });
});
