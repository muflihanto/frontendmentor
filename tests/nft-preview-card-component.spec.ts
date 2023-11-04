import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - NFT preview card component Page", () => {
  /** Go to NFT preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/nft-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | NFT preview card component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Equilibrium #3429",
      }),
    ).toBeVisible();
  });
});
