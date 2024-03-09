import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with two column layout Page", () => {
  /** Go to Fylo landing page with two column layout page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-landing-page-with-two-column-layout");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with two column layout",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    const nav = header.getByRole("navigation");
    const navLinks = ["Features", "Team", "Sign In"];
    for (const link of navLinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a hero section */
  test("has a hero section", async ({ page }) => {
    const section = page.locator("div").nth(2);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(section.getByRole("img")).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Fylo stores your most important files in one secure location. Access them wherever you need, share and collaborate with friends, family, and co-workers.",
      ),
    ).toBeVisible();
    await expect(section.getByPlaceholder("Enter your email...")).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get Started", exact: true }),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Hero Image Illustration" }),
    ).toBeVisible();
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
  });
});
