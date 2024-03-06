import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with dark theme and features grid Page", () => {
  /** Go to Fylo landing page with dark theme and features grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-dark-theme-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with dark theme and features grid",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img", { name: "Fylo Logo" })).toBeVisible();
    const nav = header.getByRole("navigation");
    const navlinks = ["Features", "Team", "Sign In"];
    for (const link of navlinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(2);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: "Hero Image Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Fylo stores all your most important files in one secure location. Access them wherever you need, share and collaborate with friends family, and co-workers.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Started" }),
    ).toBeVisible();
  });
});
