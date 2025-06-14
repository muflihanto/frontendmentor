import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Fylo landing page with two column layout Page", () => {
  /** Go to Fylo landing page with two column layout page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-landing-page-with-two-column-layout");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with two column layout",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    const nav = header.getByRole("navigation");
    const navLinks = ["Features", "Team", "Sign In"];
    for (const link of navLinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a hero section */
  test.describe("has a hero section", () => {
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(2);
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
      await expect(section.getByRole("img")).toBeVisible();
      await expect(
        section.getByRole("heading", {
          name: "All your files in one secure location, accessible anywhere.",
        }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Fylo stores your most important files in one secure location. Access them wherever you need, share and collaborate with friends, family, and co-workers.",
        ),
      ).toBeVisible();
      await expect(
        section.getByPlaceholder("Enter your email..."),
      ).toBeVisible();
      await expect(
        section.getByRole("button", { name: "Get Started", exact: true }),
      ).toBeVisible();
      await expect(
        section.getByRole("img", { name: "Hero Image Illustration" }),
      ).toBeVisible();
    });

    /** Test form validation in hero section */
    test.describe("Hero section form validation", () => {
      test("shows error for invalid email", async ({ page }) => {
        const heroSection = page.locator("div").nth(2);
        const input = heroSection.getByPlaceholder("Enter your email...");
        const button = heroSection.getByRole("button", { name: "Get Started" });
        const errorMessage = heroSection.getByText("Please check your email");

        await input.fill("invalid-email");
        await button.click();
        await expect(errorMessage).toBeVisible();
      });

      test("clears input after successful submission", async ({ page }) => {
        const heroSection = page.locator("div").nth(2);
        const input = heroSection.getByPlaceholder("Enter your email...");
        const button = heroSection.getByRole("button", { name: "Get Started" });

        await input.fill("valid@example.com");
        await button.click();
        await expect(input).toHaveValue("");
      });
    });
  });

  /** Test if the page has a 'Productive' section */
  test("has a 'Productive' section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Productive Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Stay productive, wherever you are",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Never let location be an issue when accessing your files. Fylo has you covered for all of your file storage needs.",
      ),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required!",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "See how Fylo works" }),
    ).toBeVisible();
    const card = section.locator("div").nth(4);
    await expect(
      card.getByText(
        "Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.",
      ),
    ).toBeVisible();
    await expect(
      card.getByRole("img", { name: "Kyle Burton Avatar" }),
    ).toBeVisible();
    await expect(card.getByText("Kyle Burton")).toBeVisible();
    await expect(card.getByText("Founder & CEO, Huddle")).toBeVisible();
  });

  /** Test if the page has a 'Get Early Access' section */
  test.describe("has a 'Get Early Access' section", () => {
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(14);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Get early access today" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "It only takes a minute to sign up and our free starter tier is extremely generous. If you have any questions, our support team would be happy to help you.",
        ),
      ).toBeVisible();
      await expect(section.getByPlaceholder("email@example.com")).toBeVisible();
      await expect(
        section.getByRole("button", { name: "Get Started For Free" }),
      ).toBeVisible();
    });
    test("form works", async ({ page }) => {
      const section = page.locator("div").nth(14);
      await section.scrollIntoViewIfNeeded();
      const input = section.getByPlaceholder("email@example.com");
      const button = section.getByRole("button", {
        name: "Get Started For Free",
      });
      const errorMessage = section.getByText("Please check your email");
      // Test empty input
      await button.click();
      await expect(errorMessage).toBeVisible();
      // Test valid input
      await input.fill("email@example.com");
      await button.click();
      await expect(errorMessage).not.toBeVisible();
      await expect(input).toHaveValue("");
      // Test invalid input
      await input.fill("invalidemail");
      await button.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveValue("invalidemail");
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("img").first()).toBeVisible();
    await expect(footer.getByText("Phone: +1-543-123-4567")).toBeVisible();
    await expect(footer.getByText("example@fylo.com")).toBeVisible();
    const navlinks = [
      ["About Us", "Jobs", "Press", "Blog"],
      ["Contact Us", "Terms", "Privacy"],
    ];
    const lists = await footer.getByRole("list").all();
    for (const [index, list] of Object.entries(lists)) {
      const indexNum = Number(index);
      for (const link of navlinks[indexNum]) {
        await expect(list.getByRole("link", { name: link })).toBeVisible();
      }
    }
    const socialsContainer = footer.locator("div").nth(4);
    const socials = await socialsContainer.getByRole("link").all();
    expect(socials).toHaveLength(3);
    const socialLinks = [
      "Fylo on Facebook",
      "Fylo on Twitter",
      "Fylo on Instagram",
    ];
    for (const link of socialLinks) {
      const socialLink = socialsContainer.getByRole("link", { name: link });
      await expect(socialLink).toBeVisible();
    }
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test hover states for interactive elements */
  test.describe("Hover states", () => {
    test("'Get Started' buttons have hover effect", async ({ page }) => {
      const heroButton = page.getByRole("button", {
        name: "Get Started",
        exact: true,
      });
      await expect(heroButton).toHaveCSS(
        "background-color",
        "rgb(48, 101, 248)",
      );
      await heroButton.hover();
      await expect(heroButton).toHaveCSS(
        "background-color",
        "rgb(107, 154, 255)",
      );

      const earlyAccessButton = page.getByRole("button", {
        name: "Get Started For Free",
      });
      await earlyAccessButton.scrollIntoViewIfNeeded();
      await expect(earlyAccessButton).toHaveCSS(
        "background-color",
        "rgb(48, 101, 248)",
      );
      await earlyAccessButton.hover();
      await expect(earlyAccessButton).toHaveCSS(
        "background-color",
        "rgb(107, 154, 255)",
      );
    });

    test("'See how Fylo works' link has hover effect", async ({ page }) => {
      const productiveSection = page.locator("div").nth(5);
      await productiveSection.scrollIntoViewIfNeeded();
      const fyloWorksLink = productiveSection.getByRole("link", {
        name: "See how Fylo works",
      });
      const arrowIcon = fyloWorksLink.locator("svg");

      await expect(fyloWorksLink).toHaveCSS("color", "rgb(60, 159, 143)");
      await expect(fyloWorksLink).toHaveCSS(
        "border-bottom-color",
        "rgb(60, 159, 143)",
      );
      await expect(arrowIcon).toHaveCSS("color", "rgb(61, 160, 143)");
      await fyloWorksLink.hover();
      await expect(fyloWorksLink).toHaveCSS("color", "rgb(120, 217, 197)");
      await expect(fyloWorksLink).toHaveCSS(
        "border-bottom-color",
        "rgb(120, 217, 197)",
      );
      await expect(arrowIcon).toHaveCSS("color", "rgb(120, 217, 197)");
    });
  });

  /** Test responsive behavior */
  test.describe("responsive behavior", () => {
    test("desktop view shows correct layout", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 800 });
      await expect(page.getByAltText("Curve Bg").nth(0)).not.toBeVisible();
      await expect(page.getByAltText("Curve Bg").nth(1)).toBeVisible();

      // Hero section
      const heroSection = page.locator("div").nth(2);
      await expect(heroSection).toHaveCSS(
        "grid-template-columns",
        "640px 640px",
      );
      await expect(heroSection.getByRole("heading")).toHaveCSS(
        "text-align",
        "left",
      );

      // Hero form
      const heroForm = page.locator("form").first();
      await expect(heroForm).toHaveCSS("grid-template-columns", "320px 200px");

      // Productive section
      const productiveSection = page.locator("div").nth(7);
      await productiveSection.scrollIntoViewIfNeeded();
      await expect(productiveSection).toHaveCSS("display", "grid");
      await expect(productiveSection.locator("div").first()).toHaveCSS(
        "grid-column-start",
        "2",
      );

      // Testimonial cards
      const testimonialCard = page.locator("div").nth(5).locator("div").nth(4);
      await expect(testimonialCard).toHaveCSS("width", "356px");
      await expect(testimonialCard).toHaveCSS("height", "216px");

      // Early access section
      const earlyAccessSection = page.locator("div").nth(14);
      await earlyAccessSection.scrollIntoViewIfNeeded();
      await expect(earlyAccessSection).toHaveCSS("display", "grid");
      await expect(earlyAccessSection).toHaveCSS(
        "grid-template-columns",
        "520px 520px",
      );
      await expect(earlyAccessSection).toHaveCSS("height", "322px");

      // Footer section
      const footer = page.getByRole("contentinfo");
      await expect(footer).toHaveCSS("height", "390.967px");
      await expect(footer.locator("div").nth(4)).toHaveCSS(
        "align-self",
        "flex-start",
      );
    });

    test("mobile view shows correct layout", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByAltText("Curve Bg").nth(0)).toBeVisible();
      await expect(page.getByAltText("Curve Bg").nth(1)).not.toBeVisible();

      // Hero section
      const heroSection = page.locator("div").nth(2);
      await expect(heroSection).toHaveCSS("grid-template-columns", "none");
      await expect(heroSection.getByRole("heading")).toHaveCSS(
        "text-align",
        "center",
      );

      // Hero form
      const heroForm = page.locator("form").first();
      await expect(heroForm).toHaveCSS("grid-template-columns", "304px");

      // Productive section
      const productiveSection = page.locator("div").nth(7);
      await productiveSection.scrollIntoViewIfNeeded();
      await expect(productiveSection).toHaveCSS("display", "flex");
      await expect(productiveSection.locator("div").first()).not.toHaveCSS(
        "grid-column-start",
        "2",
      );

      // Testimonial cards
      const testimonialCard = page.locator("div").nth(5).locator("div").nth(4);
      await expect(testimonialCard).toHaveCSS("width", "280px");
      await expect(testimonialCard).toHaveCSS("height", "170px");

      // Early access section
      const earlyAccessSection = page.locator("div").nth(14);
      await earlyAccessSection.scrollIntoViewIfNeeded();
      await expect(earlyAccessSection).toHaveCSS("display", "flex");
      await expect(earlyAccessSection).toHaveCSS("flex-direction", "column");
      await expect(earlyAccessSection).toHaveCSS("height", "345px");

      // Footer section
      const footer = page.getByRole("contentinfo");
      await expect(footer).toHaveCSS("height", "682.967px");
      await expect(footer.locator("div").nth(4)).toHaveCSS(
        "align-self",
        "center",
      );
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
