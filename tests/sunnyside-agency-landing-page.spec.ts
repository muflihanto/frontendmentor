import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Sunnyside agency landing Page", () => {
  /** Go to Sunnyside agency landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/sunnyside-agency-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Sunnyside agency landing page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We are creatives",
      }),
    ).toBeVisible();
  });

  /** Test if the page has top navigation links */
  test.describe("has top navbar", () => {
    test("has sunnyside logo", async ({ page }) => {
      const nav = page.getByRole("navigation");
      await expect(nav).toBeVisible();
      await expect(nav).toBeInViewport();
      await expect(nav.getByRole("img")).toBeVisible();
    });

    test("has navigation links", async ({ page }) => {
      const nav = page.getByRole("navigation");
      const links = await nav.getByRole("link").all();
      for (const link of links) {
        await expect(link).toBeVisible();
      }
    });
  });

  /** Test if the page has a bouncing arrow */
  test("has a bouncing arrow", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Arrow Down" })).toBeVisible();
  });

  /** Test if the page has 'Transform your brand' section */
  test.describe("has 'Transform your brand' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").first()).toBeVisible();
    });
    test("has all section elements", async ({ page }) => {
      const section = page.locator("section").first();
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator("header")).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Transform your brand" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "We are a full-service creative agency specializing in helping brands grow fast. Engage your clients through compelling visuals that do most of the marketing for you.",
        ),
      ).toBeVisible();
      await expect(
        section.getByRole("link", { name: "Learn more" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has 'Stand out to the right audience' section */
  test.describe("has 'Stand out to the right audience' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").nth(1)).toBeVisible();
    });
    test("has all section elements", async ({ page }) => {
      const section = page.locator("section").nth(1);
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator("header")).toBeVisible();
      await expect(
        section.getByRole("heading", {
          name: "Stand out to the right audience",
        }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Using a collaborative formula of designers, researchers, photographers, videographers, and copywriters, we’ll build and extend your brand in digital places.",
        ),
      ).toBeVisible();
      await expect(
        section.getByRole("link", { name: "Learn more" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has 'Graphic Design' section */
  test.describe("has 'Graphic Design' section", () => {
    test("has all section elements", async ({ page }) => {
      const heading = page.getByRole("heading", { name: "Graphic Design" });
      const section = page.locator("div", { has: heading }).nth(3);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", {
          name: "Graphic Design",
          level: 3,
        }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Great design makes you memorable. We deliver artwork that underscores your brand message and captures potential clients’ attention.",
        ),
      ).toBeVisible();
    });
  });

  /** Test if the page has 'Photography' section */
  test.describe("has 'Photography' section", () => {
    test("has all section elements", async ({ page }) => {
      const heading = page.getByRole("heading", { name: "Photography" });
      const section = page.locator("div", { has: heading }).nth(3);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", {
          name: "Photography",
          level: 3,
        }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Increase your credibility by getting the most stunning, high-quality photos that improve your business image.",
        ),
      ).toBeVisible();
    });
  });

  /** Test if the page has 'Client testimonials' section */
  test.describe("has 'Client testimonials' section", () => {
    const testimonyData = [
      {
        avatar: "/sunnyside-agency-landing-page/images/image-emily.jpg",
        name: "Emily R.",
        title: "Marketing Director",
        testimony:
          "We put our trust in Sunnyside and they delivered, making sure our needs were met and deadlines were always hit.",
      },
      {
        avatar: "/sunnyside-agency-landing-page/images/image-thomas.jpg",
        name: "Thomas S.",
        title: "Chief Operating Officer",
        testimony:
          "Sunnyside’s enthusiasm coupled with their keen interest in our brand’s success made it a satisfying and enjoyable experience.",
      },
      {
        avatar: "/sunnyside-agency-landing-page/images/image-jennie.jpg",
        name: "Jennie F.",
        title: "Business Owner",
        testimony:
          "Incredible end result! Our sales increased over 400% when we worked with Sunnyside. Highly recommended!",
      },
    ];
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").nth(2)).toBeVisible();
    });
    test("has all section elements", async ({ page }) => {
      const section = page.locator("section").nth(2);
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", {
          name: "Client testimonials",
          level: 3,
        }),
      ).toBeVisible();
      const testimonies = await section.locator("div>div").all();
      for (const [index, testimony] of Object.entries(testimonies)) {
        await expect(testimony).toBeVisible();
        await expect(
          testimony.getByAltText(
            `${testimonyData[Number(index)].name}'s Avatar`,
          ),
        ).toBeVisible();
        await expect(
          testimony.getByText(testimonyData[Number(index)].testimony),
        ).toBeVisible();
        await expect(
          testimony.getByRole("heading", {
            name: testimonyData[Number(index)].name,
          }),
        ).toBeVisible();
        await expect(
          testimony.getByText(testimonyData[Number(index)].title),
        ).toBeVisible();
      }
    });
  });

  /** Test if the page has 'Gallery' section */
  test.describe("has 'Gallery' section", () => {
    test("has all images", async ({ page }) => {
      const images = [
        {
          src: "milkbottles.jpg",
          alt: "Milk Bottles",
        },
        {
          src: "orange.jpg",
          alt: "Orange",
        },
        {
          src: "cone.jpg",
          alt: "Cone",
        },
        {
          src: "sugar-cubes.jpg",
          alt: "Sugar Cubes",
        },
      ];
      for (const image of images) {
        const img = page.getByAltText(image.alt);
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
      }
    });
  });

  /** Test if the page has footer */
  test("has footer", async ({ page }) => {
    const links = ["About", "Services", "Projects"];
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    // has sunnyside logo
    await expect(footer.locator(">svg")).toBeVisible();
    // has bottom navigation links
    const navlinks = await footer.locator("ul").getByRole("link").all();
    for (const [index, link] of Object.entries(navlinks)) {
      await expect(link.getByText(links[Number(index)])).toBeVisible();
    }
    // has social media links
    const snss = await footer.locator("a>svg").all();
    expect(snss).toHaveLength(4);
    for (const sns of snss) {
      await expect(sns).toBeVisible();
    }
    // has attribution
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
