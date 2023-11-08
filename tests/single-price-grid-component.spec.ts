import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Single Price Grid Component Page", () => {
  /** Go to Single Price Grid Component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/single-price-grid-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Single Price Grid Component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Join our community",
      }),
    ).toBeVisible();
  });
});
