import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Profile card component Page", () => {
  /** Go to Profile card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/profile-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Profile card component");
  });

  /** Test if the page has a correct header image */
  test("has a header image", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Header Image" })).toBeVisible();
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Victor Crest",
      }),
    ).toBeVisible();
  });

  /** Test if the page has correct user's avatar */
  test("has user's avatar", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Avatar" })).toBeVisible();
  });

  /** Test if the page has correct user's city info */
  test("has user's city info", async ({ page }) => {
    await expect(page.getByText("London")).toBeVisible();
  });

  /** Test if the page has correct user's followers info */
  test("has user's followers info", async ({ page }) => {
    await expect(page.getByText("80K Followers")).toBeVisible();
  });

  /** Test if the page has correct user's likes info */
  test("has user's likes info", async ({ page }) => {
    await expect(page.getByText("803K Likes")).toBeVisible();
  });

  /** Test if the page has correct user's photos info */
  test("has user's photos info", async ({ page }) => {
    await expect(page.getByText("1.4K Photos")).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
