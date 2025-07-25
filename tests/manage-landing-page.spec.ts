import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pageUrl = "/manage-landing-page";
const headerNavs = ["Pricing", "Product", "About Us", "Careers", "Community"];

// Check if an element has a ::before pseude-element
const getHasBefore = async (locator: Locator) =>
  await locator.evaluate((el) => {
    const beforeStyle = window.getComputedStyle(el, "::before");
    return beforeStyle.content !== "none" && beforeStyle.content !== "";
  });

test.describe("FrontendMentor Challenge - Manage landing Page", () => {
  /** Go to Manage landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Manage landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    const navEl = header.getByRole("navigation");
    for (const nav of headerNavs) {
      const linkEl = navEl.getByRole("link", { name: nav });
      await expect(linkEl).toBeVisible();
      await expect(linkEl).toHaveCSS("color", "rgb(36, 45, 82)");
      await expect(linkEl).toHaveCSS("opacity", "1");
      await linkEl.hover();
      await expect(linkEl).toHaveCSS("opacity", "0.5");
    }
    const getStartedButton = header.getByRole("button", {
      name: "Get Started",
    });
    await expect(getStartedButton).toBeVisible();
    expect(await getHasBefore(getStartedButton)).toBeFalsy();
    await getStartedButton.hover();
    expect(await getHasBefore(getStartedButton)).toBeTruthy();
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(4);
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await expect(section).toBeVisible();
    await expect(
      grid1.getByRole("img", { name: "Intro Illustration" }),
    ).toBeVisible();
    await expect(
      grid2.getByRole("heading", {
        name: "Bring everyone together to build better products.",
      }),
    ).toBeVisible();
    await expect(
      grid2.getByText(
        "Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.",
      ),
    ).toBeVisible();
    const getStartedButton = grid2.getByRole("button", { name: "Get Started" });
    await expect(getStartedButton).toBeVisible();
    expect(await getHasBefore(getStartedButton)).toBeFalsy();
    await getStartedButton.hover();
    expect(await getHasBefore(getStartedButton)).toBeTruthy();
  });

  /** Test if the page has a 'Selling Point' section */
  test("has a 'Selling Point' section", async ({ page }) => {
    const sellingPoints = [
      {
        idx: "01",
        title: "Track company-wide progress",
        desc: "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
      },
      {
        idx: "02",
        title: "Advanced built-in reports",
        desc: "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
      },
      {
        idx: "03",
        title: "Everything you need in one place",
        desc: "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
      },
    ];
    const section = page.locator("div").nth(7);
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      grid1.getByRole("heading", { name: "What’s different about Manage?" }),
    ).toBeVisible();
    await expect(
      grid1.getByText(
        "Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.",
      ),
    ).toBeVisible();
    for (const point of sellingPoints) {
      await expect(grid2.getByText(point.idx)).toBeVisible();
      await expect(
        grid2.getByRole("heading", { name: point.title }),
      ).toBeVisible();
      await expect(grid2.getByText(point.desc)).toBeVisible();
    }
  });

  /** Test if the page has a 'What they’ve said' section */
  test("has a 'What they’ve said' section", async ({ page }) => {
    const section = page.locator("div").nth(13);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "What they’ve said" }),
    ).toBeVisible();
    const testimonialsContainer = section.locator(">div");
    expect(await testimonialsContainer.locator(">div>div").all()).toHaveLength(
      4,
    );
    const getStartedButton = section.getByRole("button", {
      name: "Get Started",
    });
    await expect(getStartedButton).toBeVisible();
    expect(await getHasBefore(getStartedButton)).toBeFalsy();
    await getStartedButton.hover();
    expect(await getHasBefore(getStartedButton)).toBeTruthy();
  });

  test.describe("Testimonials Carousel", () => {
    // Common variables
    const testimonialItems = 4; // Number of testimonials

    test.describe("Desktop Behavior (>=1024px)", () => {
      test.use({ viewport: { width: 1200, height: 800 } });

      test("should display all testimonials in a horizontal layout", async ({
        page,
      }) => {
        const carousel = page.locator("div").nth(15);
        await carousel.scrollIntoViewIfNeeded();
        const items = carousel.locator("> div");

        await expect(items).toHaveCount(testimonialItems);

        // Verify horizontal scroll container
        await expect(carousel).toHaveCSS("overflow-x", "auto");
        await expect(carousel).toHaveCSS("flex-direction", "row");

        // Check if all items are visible (some items are overflowed)
        for (let i = 0; i < testimonialItems; i++) {
          await expect(items.nth(i)).toBeVisible();
        }
      });

      test("should allow horizontal scrolling", async ({ page }) => {
        const carousel = page.locator("div").nth(15);
        await carousel.scrollIntoViewIfNeeded();
        const firstItem = carousel.locator("> div").first();
        const lastItem = carousel.locator("> div").last();

        // Scroll to end
        await lastItem.scrollIntoViewIfNeeded();
        await expect(lastItem).toBeInViewport();
        await expect(firstItem).not.toBeInViewport();

        // Scroll back to start
        await firstItem.scrollIntoViewIfNeeded();
        await expect(firstItem).toBeInViewport();
      });
    });

    test.describe("Mobile Behavior (<768px)", () => {
      test.use({ viewport: { width: 375, height: 667 } });

      test("should show navigation dots", async ({ page }) => {
        const dots = page
          .locator("div")
          .nth(14)
          .locator("> div")
          .nth(1)
          .getByRole("button");
        await expect(dots).toHaveCount(testimonialItems);
      });

      test("should snap to testimonial when dot clicked", async ({ page }) => {
        const dots = page
          .locator("div")
          .nth(14)
          .locator("> div")
          .nth(1)
          .getByRole("button");
        const carousel = page.locator("div").nth(15);
        await carousel.scrollIntoViewIfNeeded();

        // Click each dot and verify at least 95% of element intersects viewport.
        for (let i = 0; i < testimonialItems; i++) {
          await dots.nth(i).click();

          // Verify active dot
          await expect(dots.nth(i)).toHaveClass(/bg-manage-primary-red/);

          const activeItem = carousel.locator("> div").nth(i);
          await expect(activeItem).toBeInViewport({ ratio: 0.95 });
        }
      });

      test("should swipe between testimonials", async ({ page }) => {
        const carousel = page.locator("div").nth(15);
        const firstItem = carousel.locator("> div").first();
        await carousel.scrollIntoViewIfNeeded();

        // Get initial position
        const initialScroll = await carousel.evaluate((el) => el.scrollLeft);

        // Simulate swipe
        const boundingBox = await firstItem.boundingBox();
        // Move cursor to first item
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await page.mouse.move(boundingBox!.x + 10, boundingBox!.y + 10);
        await page.mouse.down();
        // Swipe left 100px
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        await page.mouse.move(boundingBox!.x - 100, boundingBox!.y + 10);
        await page.mouse.up();

        // Verify scroll changed
        const newScroll = await carousel.evaluate((el) => el.scrollLeft);
        expect(newScroll).toBeGreaterThan(initialScroll);
      });
    });

    test.describe("Responsive Behavior", () => {
      test("should change layout between breakpoints", async ({ page }) => {
        // Start at mobile size
        await page.setViewportSize({ width: 375, height: 667 });

        const carouselContainer = page.locator("div").nth(14);
        await carouselContainer.scrollIntoViewIfNeeded();

        // Verify dots appear on mobile
        const dotsContainer = page
          .locator("div")
          .nth(14)
          .locator("> div")
          .nth(1);
        await expect(dotsContainer).toBeVisible();
        await expect(dotsContainer.getByRole("button")).toHaveCount(
          testimonialItems,
        );

        // Resize to desktop
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.waitForTimeout(500); // Allow layout to adjust

        // Verify dots disappear on desktop
        await expect(dotsContainer).not.toBeVisible();
        await expect(dotsContainer.getByRole("button")).toHaveCount(0);
      });

      test("should maintain testimonial content across all sizes", async ({
        page,
      }) => {
        const testSizes = [
          { width: 375, height: 667 }, // Mobile
          { width: 768, height: 1024 }, // Tablet
          { width: 1200, height: 800 }, // Desktop
        ];

        for (const size of testSizes) {
          await page.setViewportSize(size);
          await page.goto(pageUrl);

          const carousel = page.locator("div").nth(15);
          const items = carousel.locator("> div");

          await carousel.scrollIntoViewIfNeeded();

          // Verify all testimonials have required content
          for (let i = 0; i < testimonialItems; i++) {
            const item = items.nth(i);
            await expect(item.locator("img")).toBeVisible();
            await expect(item.locator("h3")).not.toBeEmpty();
            await expect(item.locator("p")).not.toBeEmpty();
          }
        }
      });
    });
  });

  /** Test if the page has a 'Simplify' section */
  test("has a 'Simplify' section", async ({ page }) => {
    const section = page.locator("div").nth(25);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Simplify how your team works today.",
      }),
    ).toBeVisible();
    const getStartedButton = section.getByRole("button", {
      name: "Get Started",
    });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveCSS("color", "rgb(242, 95, 58)");
    await getStartedButton.hover();
    await expect(getStartedButton).toHaveCSS("color", "rgba(242, 95, 58, 0.5)");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const navLinks = [
      "Home",
      "Pricing",
      "Products",
      "About Us",
      "Careers",
      "Community",
      "Privacy Policy",
    ];
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.locator(">div>svg")).toBeVisible();
    const snsContainer = footer.locator("div").nth(1);
    const snsLinks = await snsContainer.getByRole("link").all();
    expect(snsLinks).toHaveLength(5);
    for (const link of snsLinks) {
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("color", "rgb(250, 250, 250)");
      await link.hover();
      await expect(link).toHaveCSS("color", "rgb(242, 95, 58)");
    }
    const nav = footer.locator("ul");
    for (const link of navLinks) {
      const linkEl = nav.getByRole("link", { name: link });
      await expect(linkEl).toBeVisible();
      await expect(linkEl).toHaveCSS("color", "rgb(255, 239, 235)");
      await linkEl.hover();
      await expect(linkEl).toHaveCSS("color", "rgb(242, 95, 58)");
    }
    const form = footer.locator("form");
    await expect(form.getByPlaceholder("Updates in your inbox…")).toBeVisible();
    await expect(form.getByRole("button", { name: "Go" })).toBeVisible();
    await expect(
      footer.getByText("Copyright 2020. All Rights Reserved"),
    ).toBeVisible();
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page footer form works */
  test.describe("footer form works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let footer: Locator;
    let form: Locator;
    let input: Locator;
    let button: Locator;
    let emptyError: Locator;
    let invalidError: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
      footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      form = footer.locator("form");
      input = form.getByPlaceholder("Updates in your inbox…");
      button = form.getByRole("button", { name: "Go" });
      emptyError = footer.getByText("Email should not be empty");
      invalidError = footer.getByText("Please insert a valid email");
    });

    test("can handle empty input", async () => {
      await expect(emptyError).not.toBeVisible();
      await button.click();
      await expect(emptyError).toBeVisible();
    });

    test("can handle invalid input", async () => {
      await page.reload();
      await footer.scrollIntoViewIfNeeded();
      await expect(invalidError).not.toBeVisible();
      await input.fill("invalid input");
      await button.click();
      await expect(invalidError).toBeVisible();
    });

    test("can handle valid input", async () => {
      await page.reload();
      await footer.scrollIntoViewIfNeeded();
      await expect(emptyError).not.toBeVisible();
      await expect(invalidError).not.toBeVisible();
      await input.fill("email@example.com");
      await button.click();
      await expect(emptyError).not.toBeVisible();
      await expect(invalidError).not.toBeVisible();
      expect(await input.inputValue()).toStrictEqual("");
    });
  });

  /** Test if the page displayed correctly on mobile */
  test.describe("displayed correctly on mobile", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let header: Locator;
    let menuButton: Locator;
    let navContainer: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage({ viewport: { height: 667, width: 375 } });
      await page.goto(pageUrl);
    });

    test.afterAll(async () => {
      await page.close();
    });

    test("mobile navigation menu is visible", async () => {
      header = page.getByRole("banner");
      await expect(header).toBeVisible();
      menuButton = header.getByRole("button");
      await expect(menuButton).toBeVisible();
    });

    test("mobile navigation menu works", async () => {
      await expect(menuButton).toHaveAttribute("aria-haspopup", "true");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).not.toHaveAttribute("aria-controls");
      await menuButton.click();
      await page.waitForTimeout(1000);
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(menuButton).toHaveAttribute("aria-controls", "menu");
      navContainer = header.getByRole("navigation", { name: "Main menu" });
      await expect(navContainer).toBeVisible();
      for (const nav of headerNavs) {
        await expect(
          navContainer.getByRole("link", { name: nav }),
        ).toBeVisible();
      }
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).not.toHaveAttribute("aria-controls");
      await expect(navContainer).not.toBeVisible();
      for (const nav of headerNavs) {
        await expect(
          navContainer.getByRole("link", { name: nav }),
        ).not.toBeVisible();
      }
    });
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
