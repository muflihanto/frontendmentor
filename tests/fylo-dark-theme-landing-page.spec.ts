import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with dark theme and features grid Page", () => {
  /** Go to Fylo landing page with dark theme and features grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-dark-theme-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with dark theme and features grid",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img", { name: "Fylo Logo" })).toBeVisible();
    const nav = header.getByRole("navigation");
    const navlinks = ["Features", "Team", "Sign In"];
    for (const link of navlinks) {
      const linkElement = nav.getByRole("link", { name: link });
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveCSS("text-decoration-line", "none");
      await linkElement.hover();
      await expect(linkElement).toHaveCSS("text-decoration-line", "underline");
    }
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("header>div").nth(1);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: "Hero Image Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Fylo stores all your most important files in one secure location. Access them wherever you need, share and collaborate with friends family, and co-workers.",
      ),
    ).toBeVisible();
    const getStartedButton = section.getByRole("link", { name: "Get Started" });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveCSS(
      "background-image",
      "linear-gradient(to right bottom, rgb(101, 226, 217), rgb(51, 158, 204))",
    );
    await getStartedButton.hover();
    await expect(getStartedButton).toHaveCSS(
      "background-image",
      "linear-gradient(to right bottom, rgb(101, 226, 217), rgb(101, 226, 217))",
    );
  });

  /** Test if the page has a 'Features' section */
  test("has a 'Features' section", async ({ page }) => {
    const section = page.locator("main>div").nth(0);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    const features = [
      {
        heading: "Access your files, anywhere",
        body: "The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.",
      },
      {
        heading: "Security you can trust",
        body: "2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.",
      },
      {
        heading: "Real-time collaboration",
        body: "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.",
      },
      {
        heading: "Store any type of file",
        body: "Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.",
      },
    ];
    const grids = await section.locator(">div").all();
    expect(grids).toHaveLength(4);
    for (const [index, grid] of Object.entries(grids)) {
      const indexNum = Number(index);
      await expect(grid.getByRole("img")).toBeVisible();
      await expect(
        grid.getByRole("heading", { name: features[indexNum].heading }),
      ).toBeVisible();
      await expect(grid.getByText(features[indexNum].body)).toBeVisible();
    }
  });

  /** Test if the page has a 'Productive' section */
  test("has a 'Productive' section", async ({ page }) => {
    const section = page.locator("main>div").nth(1);
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
        "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "See how Fylo works" }),
    ).toBeVisible();
  });

  /** Test if 'See how Fylo works' link has correct hover state */
  test("'See how Fylo works' link hover state", async ({ page }) => {
    const section = page.locator("main>div").nth(1);
    await section.scrollIntoViewIfNeeded();

    const link = section.getByRole("link", { name: "See how Fylo works" });
    await link.hover();
    await expect(link).toHaveCSS("border-bottom-color", "rgb(255, 255, 255)"); // Should change to white on hover
    await expect(link.locator("span")).toHaveCSS("color", "rgb(255, 255, 255)"); // Text should change to white
  });

  /** Test if the page has a 'Testimonials' section */
  test("has a 'Testimonials' section", async ({ page }) => {
    const section = page.locator("main>div").nth(2);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Quote Background" }),
    ).toBeVisible();
    const testimonialContainers = await section.locator(">div>div").all();
    const testimonials = [
      {
        body: "Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.",
        author: "Satish Patel",
        title: "Founder & CEO, Huddle",
      },
      {
        body: "Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.",
        author: "Bruce McKenzie",
        title: "Founder & CEO, Huddle",
      },
      {
        body: "Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.",
        author: "Iva Boyd",
        title: "Founder & CEO, Huddle",
      },
    ];
    for (const [index, { body, author, title }] of Object.entries(
      testimonials,
    )) {
      const indexNum = Number(index);
      await expect(testimonialContainers[indexNum]).toBeVisible();
      await expect(
        testimonialContainers[indexNum].getByText(body),
      ).toBeVisible();
      await expect(
        testimonialContainers[indexNum].getByRole("img", {
          name: `${author} Avatar`,
        }),
      ).toBeVisible();
      await expect(
        testimonialContainers[indexNum].getByText(author),
      ).toBeVisible();
      await expect(
        testimonialContainers[indexNum].getByText(title),
      ).toBeVisible();
    }
  });

  /** Test if the page has a 'Get Early Access' section */
  test.describe("has a 'Get Early Access' section", () => {
    test("has all elements", async ({ page }) => {
      const section = page.locator("main>div").nth(3);
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
      const getStartedButton = section.getByRole("button", {
        name: "Get Started For Free",
      });
      await expect(getStartedButton).toBeVisible();
      await expect(getStartedButton).toHaveCSS(
        "background-image",
        "linear-gradient(to right bottom, rgb(101, 226, 217), rgb(51, 158, 204))",
      );
      await getStartedButton.hover();
      await expect(getStartedButton).toHaveCSS(
        "background-image",
        "linear-gradient(to right bottom, rgb(101, 226, 217), rgb(101, 226, 217))",
      );
    });
    test("form works", async ({ page }) => {
      const section = page.locator("main>div").nth(3);
      await section.scrollIntoViewIfNeeded();
      const input = section.getByPlaceholder("email@example.com");
      const submit = section.getByRole("button", {
        name: "Get Started For Free",
      });
      const errorMessage = section.getByText(
        "Please enter a valid email address",
      );
      await expect(errorMessage).not.toBeVisible();
      // Test empty input
      await submit.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveValue("");
      // Test valid input
      await input.fill("email@example.com");
      await submit.click();
      await expect(input).toHaveValue("");
      await expect(errorMessage).not.toBeVisible();
      // Test invalid input
      await input.fill("invalidinput");
      await submit.click();
      await expect(input).toHaveValue("invalidinput");
      await expect(errorMessage).toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(
      footer.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ),
    ).toBeVisible();
    await expect(footer.getByText("+1-543-123-4567")).toBeVisible();
    await expect(footer.getByText("example@fylo.com")).toBeVisible();
    const navlinks = [
      ["About Us", "Jobs", "Press", "Blog"],
      ["Contact Us", "Terms", "Privacy"],
    ];
    const lists = await footer.locator("ul").all();
    for (const [index, list] of Object.entries(lists)) {
      const indexNum = Number(index);
      for (const link of navlinks[indexNum]) {
        const linkElement = list.getByRole("link", { name: link });
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveCSS("font-weight", "400");
        await linkElement.hover();
        await expect(linkElement).toHaveCSS("font-weight", "700");
      }
    }
    const socials = await footer
      .getByLabel("Social Media Links")
      .getByRole("link")
      .all();
    expect(socials).toHaveLength(3);
    for (const social of socials) {
      await expect(social).toBeVisible();
      const svg = social.locator("svg");
      await expect(social).toHaveCSS(
        "border-bottom-color",
        "rgb(191, 191, 191)",
      );
      await expect(svg).toHaveCSS("color", "rgba(255, 255, 255, 0.8)");
      await social.hover();
      await expect(social).toHaveCSS(
        "border-bottom-color",
        "rgb(101, 226, 217)",
      );
      await expect(svg).toHaveCSS("color", "rgb(101, 226, 217)");
    }
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
