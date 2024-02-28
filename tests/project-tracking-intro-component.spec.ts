import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Project tracking intro component Page", () => {
  /** Go to Project tracking intro component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/project-tracking-intro-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Project tracking intro component",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    // has a logo
    await expect(header.getByRole("img")).toBeVisible();
    // has a navigation
    const nav = header.getByRole("navigation");
    const navLinks = ["Product", "Features", "Pricing", "Login"];
    for (const link of navLinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await expect(section.getByText("NewMonograph Dashboard")).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "Powerful insights into your team",
      }),
    ).toBeVisible();
    await expect(
      section.getByText("Project planning and time tracking for agile teams"),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Schedule a demo" }),
    ).toBeVisible();
    await expect(section.getByText("to see a preview")).toBeVisible();
  });
});
