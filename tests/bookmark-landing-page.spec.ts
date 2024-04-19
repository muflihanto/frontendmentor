import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Bookmark landing Page", () => {
  /** Go to Bookmark landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/bookmark-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Bookmark landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    const navLinks = ["Features", "Pricing", "Contact", "Login"] as const;
    for (const link of navLinks) {
      await expect(header.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has an Intro section */
  test("has an Intro section", async ({ page }) => {
    const section = page.locator("div").nth(4);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: "Bookmark Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "A Simple Bookmark Manager",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get it on Chrome" }),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get it on Firefox" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Stay up-to-date' section */
  test("has a 'Stay up-to-date' section", async ({ page }) => {
    const section = page.getByText(
      "35,000+ already joinedStay up-to-date with what we’re doingContact Us",
    );
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("heading", { name: "35,000+ already joined" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Stay up-to-date with what we’re doing",
      }),
    ).toBeVisible();
    const form = section.locator("form");
    await expect(
      form.getByPlaceholder("Enter your email address"),
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: "Contact Us" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer).toBeInViewport();
    await expect(footer.locator(">svg")).toBeVisible();
    const navLinks = ["Features", "Pricing", "Contact"] as const;
    for (const link of navLinks) {
      await expect(footer.getByRole("link", { name: link })).toBeVisible();
    }
    const sns = await footer.locator("div").getByRole("link").all();
    expect(sns).toHaveLength(2);
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
