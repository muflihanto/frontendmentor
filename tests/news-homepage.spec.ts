import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - News homepage Page", () => {
  /** Go to News homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/news-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | News homepage");
  });

  /** Test if the page has a correct header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByRole("banner").first()).toBeVisible();
      await expect(page.getByRole("banner").first()).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByRole("banner").first();
      // has a company logo
      await expect(
        header.getByRole("img", { name: "Company Logo" }),
      ).toBeVisible();
      // has all navlinks
      const links = ["Home", "New", "Popular", "Trending", "Categories"];
      for (const link of links) {
        await expect(header.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  /** Test if the page has a main news */
  test.describe("has a main news", () => {
    test("news is visible", async ({ page }) => {
      await expect(page.locator("div").nth(4)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const container = page.locator("div").nth(4);
      // has an illustration
      await expect(
        container.getByRole("img", { name: "Web 3.0 Illustration" }),
      ).toBeVisible();
      // has a heading
      await expect(
        container.getByRole("heading", {
          level: 1,
          name: "The Bright Future of Web 3.0?",
        }),
      ).toBeVisible();
      // has a summary
      await expect(
        container.getByText(
          "We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people. But is it really fulfilling its promise?",
        ),
      ).toBeVisible();
      // has a read more link
      await expect(
        container.getByRole("link", { name: "Read more" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a 'New' section */
  test.describe("has a 'New' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").first()).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").first();
      const posts = [
        {
          title: "Hydrogen VS Electric Cars",
          body: "Will hydrogen-fueled cars ever catch up to EVs?",
          href: "",
        },
        {
          title: "The Downsides of AI Artistry",
          body: "What are the possible adverse effects of on-demand AI image generation?",
          href: "",
        },
        {
          title: "Is VC Funding Drying Up?",
          body: "Private funding by VC firms is down 50% YOY. We take a look at what that means.",
          href: "",
        },
      ];
      // has a heading
      await expect(section.getByRole("heading", { name: "New" })).toBeVisible();
      // has all posts
      for (const post of posts) {
        await expect(
          section.getByRole("link", { name: post.title }),
        ).toBeVisible();
        await expect(section.getByText(post.body)).toBeVisible();
      }
    });
  });

  /** Test if the page has a 'Popular' section */
  test.describe("has a 'Popular' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").nth(1)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").nth(1);
      await section.scrollIntoViewIfNeeded();
      const posts = [
        {
          title: "Reviving Retro PCs",
          body: "What happens when old PCs are given modern upgrades?",
          href: "",
          image: {
            src: "image-retro-pcs.jpg",
            alt: "Retro PC Illustration",
          },
        },
        {
          title: "Top 10 Laptops of 2022",
          body: "Our best picks for various needs and budgets.",
          href: "",
          image: {
            src: "image-top-laptops.jpg",
            alt: "Top Laptops Illustration",
          },
        },
        {
          title: "The Growth of Gaming",
          body: "How the pandemic has sparked fresh opportunities.",
          href: "",
          image: {
            src: "image-gaming-growth.jpg",
            alt: "Gaming Controller",
          },
        },
      ];
      // has an sr-only heading
      await expect(
        section.getByRole("heading", { name: "Popular" }),
      ).toBeAttached();
      // has all posts
      for (const [index, post] of Object.entries(posts)) {
        const idx = Number(index);
        const postElem = section.locator("li").nth(idx);
        // has an image
        await expect(
          postElem.getByRole("img", { name: post.image.alt }),
        ).toBeVisible();
        // has a heading
        await expect(
          postElem.getByRole("heading", { name: `0${idx + 1}`, exact: true }),
        ).toBeVisible();
        // has a link
        await expect(
          postElem.getByRole("link", { name: post.title }),
        ).toBeVisible();
        // has a summary
        await expect(postElem.getByText(post.body)).toBeVisible();
      }
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page has a mobile menu*/
  test.describe("has a mobile menu", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("button is visible", async ({ page }) => {
      const button = page.getByRole("banner").getByRole("button");
      await expect(button).toBeVisible();
      await expect(button).toBeInViewport();
    });
    test("menu button works", async ({ page }) => {
      const header = page.getByRole("banner").first();
      const button = header.getByRole("button");
      await expect(button).toHaveAttribute("aria-haspopup", "true");
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(button).not.toHaveAttribute("aria-controls");
      await button.click();
      await page.waitForTimeout(500);
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(button).toHaveAttribute("aria-controls", "mobilemenu");
      const nav = page.getByRole("navigation");
      const links = ["Home", "New", "Popular", "Trending", "Categories"];
      await expect(nav).toBeVisible();
      await expect(nav).toBeInViewport();
      for (const link of links) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
        await expect(nav.getByRole("link", { name: link })).toBeInViewport();
      }
      const closeButton = page.getByRole("button").nth(1);
      await closeButton.click();
      await page.waitForTimeout(500);
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(button).not.toHaveAttribute("aria-controls");
      await expect(nav).not.toBeVisible();
      await expect(nav).not.toBeInViewport();
    });
  });
});
