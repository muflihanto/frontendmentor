import { test, expect } from "@playwright/test";

const links = [
  {
    href: "",
    display: "Home",
  },
  {
    href: "",
    display: "Shop",
  },
  {
    href: "",
    display: "About",
  },
  {
    href: "",
    display: "Contact",
  },
];

const products = [
  {
    title: "Discover innovative ways to decorate",
    description:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    link: "",
    image: {
      mobile: "mobile-image-hero-1.jpg",
      desktop: "desktop-image-hero-1.jpg",
    },
  },
  {
    title: "We are available all across the globe",
    description:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    link: "",
    image: {
      mobile: "mobile-image-hero-2.jpg",
      desktop: "desktop-image-hero-2.jpg",
    },
  },
  {
    title: "Manufactured with the best materials",
    description:
      "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    link: "",
    image: {
      mobile: "mobile-image-hero-3.jpg",
      desktop: "desktop-image-hero-3.jpg",
    },
  },
] as const;

test.describe("FrontendMentor Challenge - Room homepage Page", () => {
  /** Go to Room homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/room-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Room homepage");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    for (const link of links) {
      await expect(
        header.getByRole("link", { name: link.display }),
      ).toBeVisible();
    }
  });

  /** Test if the page has a hero section */
  test("has a hero section", async ({ page }) => {
    const section = page.locator("div").nth(3);
    await expect(section.getByRole("button").first()).toBeVisible();
    await expect(section.getByRole("button").nth(1)).toBeVisible();
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await expect(
      grid1.getByRole("img", { name: "Product image 1 of 3" }),
    ).toBeVisible();
    await expect(
      grid2.getByRole("heading", { name: products[0].title }),
    ).toBeVisible();
    await expect(grid2.getByText(products[0].description)).toBeVisible();
    await expect(grid2.getByRole("link", { name: "Shop Now" })).toBeVisible();
  });

  /** Test if the hero slider works */
  test("hero slider works", async ({ page }) => {
    const section = page.locator("div").nth(3);
    const prevImage = section.getByRole("button", { name: "Previous slide" });
    const nextImage = section.getByRole("button", { name: "Next slide" });
    const heroImage = section.locator(">div").first();
    const textgrid = section.locator(">div").nth(1);
    for (const [index, product] of Object.entries(products)) {
      await expect(
        heroImage.getByRole("img", {
          name: `Product image ${Number(index) + 1} of ${products.length}`,
        }),
      ).toBeVisible();
      await expect(
        textgrid.getByRole("heading", { name: product.title }),
      ).toBeVisible();
      await expect(textgrid.getByText(product.description)).toBeVisible();
      await expect(
        textgrid.getByRole("link", { name: "Shop Now" }),
      ).toBeVisible();
      await nextImage.click();
    }
    for (const [index, product] of Object.entries([...products].reverse())) {
      await prevImage.click();
      await expect(
        heroImage.getByRole("img", {
          name: `Product image ${products.length - Number(index)} of ${
            products.length
          }`,
        }),
      ).toBeVisible();
      await expect(
        textgrid.getByRole("heading", { name: product.title }),
      ).toBeVisible();
      await expect(textgrid.getByText(product.description)).toBeVisible();
      await expect(
        textgrid.getByRole("link", { name: "Shop Now" }),
      ).toBeVisible();
    }
  });

  /** Test if the page has an about section */
  test("has an about section", async ({ page }) => {
    const section = page.locator("div").nth(7);
    await expect(
      section.getByRole("img", { name: "About Dark Image" }),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "About Light Image" }),
    ).toBeVisible();
    const textgrid = section.locator(">div").nth(1);
    await expect(
      textgrid.getByRole("heading", { name: "About our furniture" }),
    ).toBeVisible();
    await expect(
      textgrid.getByText(
        "Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page is responsive */
  test.describe("page is responsive", () => {
    test.use({
      viewport: { height: 667, width: 375 },
    });
    test("has a mobile navigation menu", async ({ page }) => {
      const header = page.getByRole("banner");
      await expect(header).toBeVisible();
      await expect(header).toBeInViewport();
      const menuButton = header.getByRole("button");
      await expect(menuButton).toBeVisible();
      for (const { display } of links) {
        await expect(
          header.getByRole("link", { name: display }),
        ).not.toBeVisible();
      }
      await menuButton.click();
      await page.waitForTimeout(250);
      for (const { display } of links) {
        await expect(header.getByRole("link", { name: display })).toBeVisible();
      }
      await menuButton.click();
      await page.waitForTimeout(250);
      for (const { display } of links) {
        await expect(
          header.getByRole("link", { name: display }),
        ).not.toBeVisible();
      }
    });
  });
});
