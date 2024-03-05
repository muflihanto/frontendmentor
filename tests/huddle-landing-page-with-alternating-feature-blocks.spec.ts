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

  /** Test if the page has all cards */
  test.describe("has all key feature cards", () => {
    const features = [
      {
        name: "Grow Together",
        description:
          "Generate meaningful discussions with your audience and build a strong, loyal community. Think of the insightful conversations you miss out on with a feedback form.",
        location: 6,
      },
      {
        name: "Flowing Conversations",
        description:
          "You wouldn‘t paginate a conversation in real life, so why do it online? Our threads have just-in-time loading for a more natural flow.",
        location: 8,
      },
      {
        name: "Your Users",
        description:
          "It takes no time at all to integrate Huddle with your app‘s authentication solution. This means, once signed in to your app, your users can start chatting immediately.",
        location: 10,
      },
    ];
    for (const { description, location, name } of features) {
      test(`has a '${name}' card`, async ({ page }) => {
        const card = page.locator("div").nth(location);
        await card.scrollIntoViewIfNeeded();
        await expect(card.getByRole("img")).toBeVisible();
        await expect(card.getByRole("heading", { name })).toBeVisible();
        await expect(card.getByText(description)).toBeVisible();
      });
    }
  });

  /** Test if the page has a 'Ready To Build Your Community?' section */
  test("has a 'Ready To Build Your Community?' section", async ({ page }) => {
    const section = page.locator("div").nth(12);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Ready To Build Your Community?" }),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Started For Free" }),
    ).toBeVisible();
  });
});
