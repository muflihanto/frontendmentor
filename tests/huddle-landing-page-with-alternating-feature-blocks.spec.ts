import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    const tryIt = header.getByRole("link", { name: "Try it Free" });
    await expect(tryIt).toBeVisible();
    await expect(tryIt).toHaveCSS("color", "rgb(0, 37, 46)");
    await expect(tryIt).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.15) 0px 0px 10px 0px",
    );
    await tryIt.hover();
    await expect(tryIt).toHaveCSS("color", "rgba(0, 37, 46, 0.5)");
    await expect(tryIt).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
    );
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
    const getStarted = section.getByRole("link", {
      name: "Get Started For Free",
    });
    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveCSS("background-color", "rgb(255, 82, 191)");
    await getStarted.hover();
    await expect(getStarted).toHaveCSS(
      "background-color",
      "rgb(255, 143, 216)",
    );
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
    const getStarted = section.getByRole("link", {
      name: "Get Started For Free",
    });
    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveCSS("background-color", "rgb(255, 82, 191)");
    await getStarted.hover();
    await expect(getStarted).toHaveCSS(
      "background-color",
      "rgb(255, 143, 216)",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByRole("img").first()).toBeVisible();
    // subgrid 1
    const subgrid1 = footer.locator("div").nth(1);
    await expect(
      subgrid1.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ),
    ).toBeVisible();
    await expect(subgrid1.getByText("+1-543-123-4567")).toBeVisible();
    await expect(subgrid1.getByText("example@huddle.com")).toBeVisible();
    // subgrid 2
    const subgrid2 = footer.locator("ul");
    const links = [
      "About Us",
      "What We Do",
      "FAQ",
      "Career",
      "Blog",
      "Contact Us",
    ];
    for (const link of links) {
      await expect(subgrid2.getByRole("link", { name: link })).toBeVisible();
    }
    // subgrid 3
    const subgrid3 = footer.locator("div").nth(2);
    const socials = await subgrid3.getByRole("link").all();
    expect(socials).toHaveLength(3);
    await expect(
      subgrid3.getByText("© Copyright 2018 Huddle. All rights reserved."),
    ).toBeVisible();
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
