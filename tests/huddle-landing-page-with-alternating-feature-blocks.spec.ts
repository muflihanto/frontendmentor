import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Huddle landing page with alternating feature blocks Page", () => {
  /** Go to Huddle landing page with alternating feature blocks page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/huddle-landing-page-with-alternating-feature-blocks");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Huddle landing page with alternating feature blocks",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Try it Free" }),
    ).toBeVisible();
  });

  /** Test if the page has a hero section */
  test("has a hero section", async ({ page }) => {
    const section = page.locator("div").nth(2);
    await expect(section.getByRole("img")).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Build The Community Your Fans Will Love",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Started For Free" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Grow Together' section */
  test("has a 'Grow Together' section", async ({ page }) => {
    const section = page.locator("div").nth(6);
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("img")).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Grow Together" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Generate meaningful discussions with your audience and build a strong, loyal community. Think of the insightful conversations you miss out on with a feedback form.",
      ),
    ).toBeVisible();
  });
});
