import { test, expect } from "@playwright/test";

const pages = ["home", "destination", "crew", "technology"] as const;

test.describe("FrontendMentor Challenge - Space Tourism Website Page", () => {
  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Home");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(
      header.getByRole("img", { name: "Space Tourism Logo" }),
    ).toBeVisible();
    const nav = header.getByRole("navigation");
    for (const page of pages) {
      await expect(nav.getByRole("link", { name: page })).toBeVisible();
      await expect(nav.getByRole("link", { name: page })).toHaveAttribute(
        "href",
        new RegExp(
          page === "home"
            ? `.*/space-tourism-website`
            : `.*/space-tourism-website/${page}`,
        ),
      );
    }
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Space" })).toBeVisible();
  });
});
