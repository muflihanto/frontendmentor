import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Huddle landing page with curved sections Page", () => {
  /** Go to Huddle landing page with curved sections page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/huddle-landing-page-with-curved-sections");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Huddle landing page with curved sections",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    await expect(
      header.getByRole("button", { name: "Try it Free" }),
    ).toBeVisible();
  });

  /** Test if the page has an 'Intro' section */
  test("has an 'Intro' section", async ({ page }) => {
    const section = page.locator("div").nth(2);
    await expect(
      section.getByRole("heading", {
        level: 1,
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

  /** Test if the page has a Hero image */
  test("has a Hero image", async ({ page }) => {
    const container = page.locator("div").nth(3);
    await container.scrollIntoViewIfNeeded();
    await expect(container).toBeVisible();
    await expect(container.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Stats' section */
  test("has a 'Stats' section", async ({ page }) => {
    const section = page.locator("div").nth(4);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section
        .locator(">div")
        .first()
        .getByRole("img", { name: "Icon Communities" }),
    ).toBeVisible();
    await expect(
      section.locator(">div").first().getByText("1.4k+"),
    ).toBeVisible();
    await expect(
      section.locator(">div").first().getByText("Communities Formed"),
    ).toBeVisible();
    await expect(
      section
        .locator(">div")
        .nth(1)
        .getByRole("img", { name: "Icon Messages" }),
    ).toBeVisible();
    await expect(
      section.locator(">div").nth(1).getByText("2.7m+"),
    ).toBeVisible();
    await expect(
      section.locator(">div").nth(1).getByText("Messages Sent"),
    ).toBeVisible();
  });
});
