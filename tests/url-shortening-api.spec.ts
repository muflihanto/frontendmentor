import { test, expect, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const headerNavs = ["Features", "Pricing", "Resources", "Login", "Sign Up"];

test.describe("FrontendMentor Challenge - Shortly URL shortening API Challenge Page", () => {
  /** Go to Shortly URL shortening API Challenge page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/url-shortening-api");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Shortly URL shortening API Challenge",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    for (const nav of headerNavs) {
      await expect(header.getByRole("link", { name: nav })).toBeVisible();
    }

    const loginButton = header.getByRole("link", { name: "Login" });
    await expect(loginButton).toHaveCSS("color", "rgb(158, 154, 167)");
    await loginButton.hover();
    await expect(loginButton).toHaveCSS("color", "rgb(35, 33, 39)");

    const signUpButton = header.getByRole("link", { name: "Sign Up" });
    await expect(signUpButton).toHaveCSS(
      "background-color",
      "rgb(42, 207, 207)",
    );
    await signUpButton.hover();
    await expect(signUpButton).toHaveCSS(
      "background-color",
      "rgb(156, 227, 226)",
    );
  });

  /** Test if the page has an Intro section */
  test("has an Intro section", async ({ page }) => {
    const section = page.locator("div").nth(9);
    await expect(
      section.getByRole("heading", { name: "More than just shorter links" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Build your brand’s recognition and get detailed insights on how your links are performing.",
      ),
    ).toBeVisible();
    const getStartedButton = section.getByRole("button", {
      name: "Get Started",
    });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveCSS(
      "background-color",
      "rgb(42, 207, 207)",
    );
    await getStartedButton.hover();
    await expect(getStartedButton).toHaveCSS(
      "background-color",
      "rgb(156, 227, 226)",
    );
    await expect(
      section.getByRole("img", { name: "Illustration Working" }),
    ).toBeVisible();
  });

  /** Test if the page has a main form */
  test.describe("has a main form", () => {
    test.describe.configure({ mode: "serial" });
    let form: Locator;
    test("main form is visible", async ({ page }) => {
      form = page.locator("form");
      await form.scrollIntoViewIfNeeded();
      await expect(form).toBeVisible();
      await expect(
        form.getByPlaceholder("Shorten a link here..."),
      ).toBeVisible();

      const shortenButton = form.getByRole("button", { name: "Shorten It!" });
      await expect(shortenButton).toHaveCSS(
        "background-color",
        "rgb(42, 207, 207)",
      );
      await shortenButton.hover();
      await expect(shortenButton).toHaveCSS(
        "background-color",
        "rgb(156, 227, 226)",
      );
    });
    /** Test if the form validation works correctly */
    test("form validation works", async ({ page }) => {
      const form = page.locator("form");
      await form.scrollIntoViewIfNeeded();

      // Test empty submission
      await form.getByRole("button", { name: "Shorten It!" }).click();
      await expect(form.getByText("Please add a link")).toBeVisible();

      // Test invalid URL submission
      await form.getByPlaceholder("Shorten a link here...").fill("invalid-url");
      await form.getByRole("button", { name: "Shorten It!" }).click();
      await expect(form.getByText("Please add a link")).toBeVisible();

      // Test valid URL submission
      await form
        .getByPlaceholder("Shorten a link here...")
        .fill("https://example.com");
      await form.getByRole("button", { name: "Shorten It!" }).click();
      await expect(form.getByText("Please add a link")).not.toBeVisible();
    });
  });

  /** Test if the page has an 'Advanced Statistics' section */
  test("has an 'Advanced Statistics' section", async ({ page }) => {
    const section = page.locator("div").nth(14);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Advanced Statistics" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Track how your links are performing across the web with our advanced statistics dashboard.",
      ),
    ).toBeVisible();
    const statisticFeatures = [
      {
        icon: "/url-shortening-api/images/icon-brand-recognition.svg",
        name: "Brand Recognition",
        description:
          "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
      },
      {
        icon: "/url-shortening-api/images/icon-detailed-records.svg",
        name: "Detailed Records",
        description:
          "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
      },
      {
        icon: "/url-shortening-api/images/icon-fully-customizable.svg",
        name: "Fully Customizable",
        description:
          "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
      },
    ];
    const featuresContaier = section.locator(">div").nth(1);
    for (const feature of statisticFeatures) {
      await expect(
        featuresContaier.getByRole("img", { name: `${feature.name} icon` }),
      ).toBeVisible();
      await expect(
        featuresContaier.getByRole("heading", { name: feature.name }),
      ).toBeVisible();
      await expect(
        featuresContaier.getByText(feature.description),
      ).toBeVisible();
    }
  });

  /** Test if the page has a 'Boost' section */
  test("has a 'Boost' section", async ({ page }) => {
    const section = page.locator("div").nth(27);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Boost your links today" }),
    ).toBeVisible();
    const getStartedButton = section.getByRole("button", {
      name: "Get Started",
    });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveCSS(
      "background-color",
      "rgb(42, 207, 207)",
    );
    await getStartedButton.hover();
    await expect(getStartedButton).toHaveCSS(
      "background-color",
      "rgb(156, 227, 226)",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.locator(">svg")).toBeVisible();
    const footerNavs = [
      {
        name: "Features",
        links: ["Link Shortening", "Branded Links", "Analytics"],
      },
      {
        name: "Resources",
        links: ["Blog", "Developers", "Support"],
      },
      {
        name: "Company",
        links: ["About", "Our Team", "Careers", "Contact"],
      },
    ];
    for (const group of footerNavs) {
      await expect(
        footer.getByRole("heading", { name: group.name }),
      ).toBeVisible();
      for (const link of group.links) {
        const linkElem = footer.getByRole("link", { name: link });
        await expect(linkElem).toBeVisible();
        await expect(linkElem).toHaveCSS("color", "rgb(191, 191, 191)");
        await linkElem.hover();
        await expect(linkElem).toHaveCSS("color", "rgb(42, 207, 207)");
      }
    }
    const snsLinks = await footer.locator(">nav>a").all();
    expect(snsLinks).toHaveLength(4);
    for (const sns of snsLinks) {
      await expect(sns).toBeVisible();
      await expect(sns).toHaveCSS("color", "rgb(255, 255, 255)");
      await sns.hover();
      await expect(sns).toHaveCSS("color", "rgb(42, 207, 207)");
    }
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
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
      await page.goto("/url-shortening-api");
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
      navContainer = header.locator("div").nth(2);
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

  /** Test if the page has correct responsive layout on desktop */
  test("has correct desktop layout", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });

    // Header should show desktop navigation
    await expect(
      page.getByRole("button", { name: /Open Menu|Close Menu/ }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Main menu" }),
    ).toBeVisible();

    // Intro section should be in row layout
    const introSection = page.locator("div").nth(9);
    await introSection.scrollIntoViewIfNeeded();
    await expect(introSection).toHaveCSS("flex-direction", "row-reverse");

    // Features should be in row layout
    const featuresSection = page.locator("div").nth(14);
    await featuresSection.scrollIntoViewIfNeeded();
    await expect(featuresSection.locator(">div").nth(1)).toHaveCSS(
      "flex-direction",
      "row",
    );
  });

  /** Test if URL shortening and copy functionality works */
  test("URL shortening and copy works", async ({ page }) => {
    const form = page.locator("form");
    await form.scrollIntoViewIfNeeded();

    // Mock API response
    await page.route("/api/getShortenUrl", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "https://example.com",
          result_url: "https://shrt.co/abc123",
        }),
      });
    });

    await form
      .getByPlaceholder("Shorten a link here...")
      .fill("https://example.com");
    await form.getByRole("button", { name: "Shorten It!" }).click();

    // Verify shortened URL appears
    const shortenedLink = page.getByText("https://shrt.co/abc123");
    await expect(shortenedLink).toBeVisible();

    // Test copy functionality
    const copyButton = page.getByRole("button", { name: "Copy" }).first();
    await copyButton.click();
    await expect(copyButton).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
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
