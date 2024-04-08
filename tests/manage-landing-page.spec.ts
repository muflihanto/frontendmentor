import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Manage landing Page", () => {
  /** Go to Manage landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/manage-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Manage landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    const navs = ["Pricing", "Product", "About Us", "Careers", "Community"];
    const navEl = header.locator("div").first();
    for (const nav of navs) {
      await expect(navEl.getByRole("link", { name: nav })).toBeVisible();
    }
    await expect(
      header.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(7);
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await expect(
      grid1.getByRole("img", { name: "Intro Illustration" }),
    ).toBeVisible();
    await expect(
      grid2.getByRole("heading", {
        name: "Bring everyone together to build better products.",
      }),
    ).toBeVisible();
    await expect(
      grid2.getByText(
        "Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.",
      ),
    ).toBeVisible();
    await expect(
      grid2.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });
});
