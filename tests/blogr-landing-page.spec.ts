import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - [Blogr] Page", () => {
  /** Go to [Blogr] page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/blogr-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | [Blogr]");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "A modern publishing platform",
      }),
    ).toBeVisible();
  });

  /** Test if the page has top navigation bar */
  test("has top navigation bar", async ({ page }) => {
    const navItems = [
      {
        parent: "Product",
        children: [
          "Overview",
          "Pricing",
          "Marketplace",
          "Features",
          "Integrations",
        ],
      },
      {
        parent: "Company",
        children: ["About", "Team", "Blog", "Careers"],
      },
      {
        parent: "Connect",
        children: ["Contact", "Newsletter", "LinkedIn"],
      },
    ];
    const nav = page.getByRole("banner").locator("nav");
    await expect(nav).toBeInViewport();
    // has blogr logo
    await expect(nav.getByRole("img", { name: "Blogr Logo" })).toBeVisible();
    // has navigation links
    const navlinks = await nav.locator("ul summary").all();
    expect(navlinks).toHaveLength(3);
    for (const [index, link] of Object.entries(navlinks)) {
      await expect(
        link.getByText(navItems[Number(index)].parent),
      ).toBeVisible();
    }
    // has login link
    await expect(nav.getByRole("link", { name: "Login" })).toBeVisible();
    // has sign up link
    await expect(nav.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });
});
