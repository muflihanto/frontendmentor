import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    const container = page.locator("div").nth(4);
    await container.scrollIntoViewIfNeeded();
    await expect(container).toBeVisible();
    await expect(container.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Stats' section */
  test("has a 'Stats' section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.locator(">div").first().getByAltText("Icon Communities"),
    ).toBeVisible();
    await expect(
      section.locator(">div").first().getByText("1.4k+"),
    ).toBeVisible();
    await expect(
      section.locator(">div").first().getByText("Communities Formed"),
    ).toBeVisible();
    await expect(
      section.locator(">div").nth(1).getByAltText("Icon Messages"),
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

  /** Test if the page has a footer */
  test.describe("has a footer", () => {
    test("has all elements", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      const subgrid1 = footer.locator("div").nth(2);
      const subgrid1images = await subgrid1.getByRole("img").all();
      expect(subgrid1images).toHaveLength(4);
      for (const img of subgrid1images) {
        await expect(img).toBeVisible();
      }
      await expect(
        subgrid1.getByText(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla quam, hendrerit lacinia vestibulum a, ultrices quis sem.",
        ),
      ).toBeVisible();
      await expect(subgrid1.getByText("Phone: +1-543-123-4567")).toBeVisible();
      await expect(subgrid1.getByText("example@huddle.com")).toBeVisible();
      const subgrid2 = footer.locator("div").nth(4);
      await expect(
        subgrid2.getByRole("heading", { name: "Newsletter" }),
      ).toBeVisible();
      await expect(
        subgrid2.getByText(
          "To recieve tips on how to grow your community, sign up to our weekly newsletter. We’ll never send you spam or pass on your email address",
        ),
      ).toBeVisible();
      const form = subgrid2.locator("form");
      await expect(form.getByRole("textbox")).toBeVisible();
      await expect(
        form.getByRole("button", { name: "Subscribe" }),
      ).toBeVisible();
      await expect(
        footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
      ).toBeVisible();
    });
    test("form works", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      const form = footer.locator("form");
      const textbox = form.getByRole("textbox");
      const button = form.getByRole("button", { name: "Subscribe" });
      const emptyMessage = form.getByText("Email must not be empty");
      const invalidMessage = form.getByText("Check your email please");
      await button.click();
      await expect(emptyMessage).toBeVisible();
      await expect(invalidMessage).not.toBeVisible();
      await textbox.fill("invalidemail");
      await button.click();
      await expect(emptyMessage).not.toBeVisible();
      await expect(invalidMessage).toBeVisible();
      await expect(textbox).toHaveValue("invalidemail");
      await textbox.fill("email@example.com");
      await button.click();
      await expect(emptyMessage).not.toBeVisible();
      await expect(invalidMessage).not.toBeVisible();
      await expect(textbox).toHaveValue("");
    });
  });

  /** Test if all interactive elements have proper hover/focus states */
  test("interactive elements have hover states", async ({ page }) => {
    const tryItFreeButton = page.getByRole("button", { name: "Try it Free" });
    await expect(tryItFreeButton).toHaveCSS("color", "rgb(255, 82, 191)");
    await expect(tryItFreeButton).toHaveCSS(
      "border-color",
      "rgb(255, 82, 191)",
    );
    await tryItFreeButton.hover();
    await expect(tryItFreeButton).toHaveCSS("color", "rgb(255, 143, 216)");
    await expect(tryItFreeButton).toHaveCSS(
      "border-color",
      "rgb(255, 143, 216)",
    );

    const getStartedLink = page
      .getByRole("link", { name: "Get Started For Free" })
      .first();
    await expect(getStartedLink).toHaveCSS(
      "background-color",
      "rgb(255, 82, 191)",
    );
    await getStartedLink.hover();
    await expect(getStartedLink).toHaveCSS(
      "background-color",
      "rgb(255, 143, 216)",
    );
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
