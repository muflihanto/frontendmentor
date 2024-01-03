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
    const heading = page.getByRole("heading", {
      level: 1,
      name: "Equilibrium #3429",
    });
    await expect(heading).toBeVisible();
    await heading.hover();
    // Test hover state
    await expect(heading).toHaveCSS("color", "rgb(0, 255, 247)");
  });

  /** Test if the page has a header image */
  test("has a header image", async ({ page }) => {
    await expect(page.getByAltText("Equilibrium Image")).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page has correct creator info */
  test("has creator info", async ({ page }) => {
    const creator = page
      .locator("p")
      .filter({ hasText: "Creation ofJules Wyvern" });
    await expect(creator).toBeVisible();
    const name = creator.locator("span").filter({ hasText: "Jules Wyvern" });
    await name.hover();
    await expect(name).toHaveCSS("color", "rgb(0, 255, 247)");
  });
});
