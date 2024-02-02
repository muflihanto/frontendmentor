import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo data storage component Page", () => {
  /** Go to Fylo data storage component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-data-storage-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo data storage component",
    );
  });

  /** Test if the page has a header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("banner")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByRole("banner");
      await expect(
        header.getByRole("img", { name: "Fylo Company Logo" }),
      ).toBeVisible();
      const links = await header.getByRole("list").getByRole("link").all();
      expect(links).toHaveLength(3);
      for (const link of links) {
        await expect(link.getByRole("img")).toBeVisible();
      }
    });
  });

  /** Test if the page has a status section */
  test.describe("has a status section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("div").nth(4)).toBeVisible();
      await expect(page.getByText("185 GB Left")).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(4);
      await expect(
        section.getByText("You‘ve used 815 GB of your storage"),
      ).toBeVisible();
      await expect(section.getByText("0 GB", { exact: true })).toBeVisible();
      await expect(section.getByText("1000 GB")).toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
