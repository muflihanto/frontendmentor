import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Blog preview card Page", () => {
  /** Go to Blog preview card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/blog-preview-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Blog preview card");
  });

  /** Test if the page has a correct illustration */
  test("has a correct illustration", async ({ page }) => {
    const image = page.getByRole("img", { name: "Illustration Article" });
    await expect(image).toBeVisible();
  });

  /** Test if the page has correct author info */
  test("has correct author info", async ({ page }) => {
    const author = page.locator("div").filter({ hasText: /^Greg Hooper$/ });
    const avatar = author.getByRole("img", { name: "Greg Hooper Avatar" });
    const name = author.getByText("Greg Hooper");
    await expect(avatar).toBeVisible();
    await expect(name).toBeVisible();
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      level: 1,
      name: "HTML & CSS foundations",
    });
    await expect(heading).toBeVisible();
    const headingLink = heading.getByRole("link");
    await expect(headingLink).toHaveCSS("color", "rgb(18, 18, 18)");
    await heading.hover();
    await expect(headingLink).toHaveCSS("color", "rgb(244, 208, 78)");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Challenge by Frontend Mentor")).toBeVisible();
  });
});
