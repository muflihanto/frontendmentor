import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - FAQ Accordion Card Page", () => {
  /** Go to FAQ Accordion Card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/faq-accordion-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | FAQ Accordion Card");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "FAQ",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct illustration */
  test("has an illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Woman Online" }),
    ).toBeVisible();
  });

  /** Test if the page has all faqs */
  test("has faqs", async ({ page }) => {
    const faqs = await page.locator("main>div>div>div:not(:last-child)").all();
    expect(faqs).toHaveLength(5);
    for (const faq of faqs) {
      await expect(faq).toBeAttached();
    }
  });

  // Test for the box illustration visibility in desktop view
  test("has box illustration in desktop view", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(
      page.getByRole("img", { name: "Box Illustration" }),
    ).toBeVisible();
  });

  /** Test if the accordion works */
  test("accordion should works", async ({ page }) => {
    const faqs = await page.locator("main>div>div:not(:last-child)").all();
    for (const faq of faqs) {
      const toggle_button = faq.getByRole("button");
      const current_state = await faq.getAttribute("data-headlessui-state");
      await toggle_button.click();
      const next_state = await faq.getAttribute("data-headlessui-state");
      const controlledElem = faq.locator(
        `id=${await toggle_button.getAttribute("aria-controls")}`,
      );
      if (current_state === "") {
        expect(next_state).toStrictEqual("open");
        await expect(toggle_button).toHaveAttribute("aria-expanded", "true");
        await expect(toggle_button).toHaveAttribute(
          "data-headlessui-state",
          "open",
        );
        await expect(toggle_button).toHaveAttribute("aria-controls");
        await expect(controlledElem).toBeVisible();
      } else {
        expect(next_state).toStrictEqual("");
        await expect(toggle_button).toHaveAttribute("aria-expanded", "false");
        await expect(toggle_button).toHaveAttribute(
          "data-headlessui-state",
          "",
        );
        await expect(toggle_button).not.toHaveAttribute("aria-controls");
        await expect(controlledElem).not.toBeVisible();
      }
    }
  });

  // Test for hover state on FAQ items
  test("faq items change color on hover", async ({ page }) => {
    const firstFaqButton = page.getByRole("button").first();
    const initialColor = await firstFaqButton.evaluate(
      (el) => window.getComputedStyle(el).color,
    );

    await firstFaqButton.hover();

    const hoverColor = await firstFaqButton.evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    expect(hoverColor).not.toBe(initialColor);
  });

  // Test for mobile view illustration
  test("shows mobile illustration in mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify the illustration is visible
    const illustration = page.getByRole("img", {
      name: "Illustration Woman Online",
    });
    await expect(illustration).toBeVisible();

    // Verify it's using the mobile version by checking the rendered image dimensions
    // since we can't directly check the src with Next.js Image component
    const illustrationBox = await illustration.boundingBox();
    expect(illustrationBox?.width).toBeLessThanOrEqual(240);
    expect(illustrationBox?.height).toBeLessThanOrEqual(215);
  });

  // Alternative test for mobile view illustration checking the loader logic
  test("uses mobile image source in mobile view", async ({ page }) => {
    // Get all image requests and check if mobile version was requested
    const imageRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("illustration-woman-online")) {
        imageRequests.push(request.url());
      }
    });

    await page.setViewportSize({ width: 375, height: 667 });

    // Trigger image loading if needed
    await page
      .getByRole("img", { name: "Illustration Woman Online" })
      .isVisible();

    // Verify mobile image was requested
    expect(
      imageRequests.some((url) => url.includes("mobile.svg")),
    ).toBeTruthy();
  });

  // Test for footer content and links
  test("has correct footer content and links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toContainText("Challenge by Frontend Mentor");
    await expect(footer).toContainText("Coded by Muflihanto");

    const frontendMentorLink = footer.getByRole("link", {
      name: "Frontend Mentor",
    });
    await expect(frontendMentorLink).toHaveAttribute(
      "href",
      "https://www.frontendmentor.io?ref=challenge",
    );

    const githubLink = footer.getByRole("link", { name: "Muflihanto" });
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/muflihanto",
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
