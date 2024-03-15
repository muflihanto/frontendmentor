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

  /** Test if the page has a 'Grow Together' section */
  test("has a 'Grow Together' section", async ({ page }) => {
    const section = page.locator("section").first();
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Grow Together" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Generate meaningful discussions with your audience and build a strong, loyal community. Think of the insightful conversations you miss out on with a feedback form.",
      ),
    ).toBeVisible();
    await expect(section.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Flowing Conversations' section */
  test("has a 'Flowing Conversations' section", async ({ page }) => {
    const section = page.locator("section").nth(1);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Flowing Conversations" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "You wouldn‘t paginate a conversation in real life, so why do it online? Our threads have just-in-time loading for a more natural flow.",
      ),
    ).toBeVisible();
    await expect(section.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Your Users' section */
  test("has a 'Your Users' section", async ({ page }) => {
    const section = page.locator("section").nth(2);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Your Users" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "It takes no time at all to integrate Huddle with your app‘s authentication solution. This means, once signed in to your app, your users can start chatting immediately.",
      ),
    ).toBeVisible();
    await expect(section.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Ready to build' section */
  test("has a 'Ready to build' section", async ({ page }) => {
    const section = page.locator("section").nth(3);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Ready To Build Your Community?" }),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Started For Free" }),
    ).toBeVisible();
  });
});
