import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Social proof section Page", () => {
  /** Go to Social proof section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-proof-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Social proof section");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "10,000+ of our users love our products.",
      }),
    ).toBeVisible();
  });

  /** Test if the page has all 5 star rating visible */
  test("all 5 star rating should be visible", async ({ page }) => {
    const h1 = page.getByRole("heading", {
      name: "10,000+ of our users love our products.",
    });
    const h1Parent = page.locator("div").filter({ has: h1 }).nth(2);
    const ratingsParent = h1Parent.locator("div").nth(1);
    const ratings = await ratingsParent.locator(">div").all();
    for (const rating of ratings) {
      await expect(rating).toBeVisible();
      expect(await rating.getByRole("img").all()).toHaveLength(5);
    }
  });
  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor . Coded by Muflihanto."),
    ).toBeVisible();
  });
});
