import { test, expect, type Locator } from "@playwright/test";

const product = {
  discount: 50,
  images: [
    "/ecommerce-product-page/images/image-product-1.jpg",
    "/ecommerce-product-page/images/image-product-2.jpg",
    "/ecommerce-product-page/images/image-product-3.jpg",
    "/ecommerce-product-page/images/image-product-4.jpg",
  ],
  name: "Fall Limited Edition Sneakers",
  brand: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  originalPrice: 250,
  price: 125,
  thumbnails: [
    "/ecommerce-product-page/images/image-product-1-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-2-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-3-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-4-thumbnail.jpg",
  ],
};

test.describe("FrontendMentor Challenge - E-commerce product Page", () => {
  /** Go to E-commerce product page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ecommerce-product-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | E-commerce product page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img").first()).toBeVisible();
    const navlinks = ["Collections", "Men", "Women", "About", "Contact"];
    const nav = page.getByRole("navigation");
    for (const link of navlinks) {
      await expect(
        nav.getByRole("link", { name: link, exact: true }),
      ).toBeVisible();
    }
    const cartToggle = page.locator("#cart-toggle");
    const cartPopup = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Cart" }) })
      .nth(1);
    await expect(cartToggle).toBeVisible();
    await expect(cartPopup).not.toBeVisible();
    await cartToggle.click();
    await expect(cartPopup).toBeVisible();
    await cartToggle.click();
    await expect(cartPopup).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "User's avatar" }),
    ).toBeVisible();
  });

  /** Test if the page has 'Product Details' section */
  test("has 'Product Details' section", async ({ page }) => {
    const section = page.locator("div").nth(11);
    await expect(section.getByLabel("Brand name")).toBeVisible();
    await expect(section.getByLabel("Product name")).toBeVisible();
    await expect(section.getByLabel("Product description")).toBeVisible();
    await expect(section.getByLabel("Current Price")).toBeVisible();
    await expect(section.getByLabel("Discount Value")).toBeVisible();
    await expect(section.getByLabel("Original Price")).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Add to cart" }),
    ).toBeVisible();
  });

  /** Test if the page has 'Photo slide' section */
  test("has 'Photo slide' section", async ({ page }) => {
    const section = page.locator("div").nth(3);
    const display = section.locator(">div").first();
    const selector = section.locator(">div").nth(1);
    await expect(section).toBeVisible();
    await expect(display).toBeVisible();
    const displayImages = await display.getByRole("img").all();
    await expect(selector).toBeVisible();
    const selectorButtons = await selector.getByRole("button").all();
    expect(selectorButtons).toHaveLength(4);
    for (const [btnIndex, button] of Object.entries(selectorButtons)) {
      await expect(button).toBeVisible();
      await expect(displayImages[Number(btnIndex)]).toBeVisible();
      await button.click();
      for (const [imgIndex, image] of Object.entries(displayImages)) {
        if (imgIndex === btnIndex) {
          await expect(image).toBeInViewport();
        } else {
          await expect(image).not.toBeInViewport();
        }
      }
    }
  });

  /** Test if the page has 'Lightbox' section */
  test("has 'Lightbox' section", async ({ page }) => {
    const toggle = page.locator("div").nth(3).locator("button").nth(1);
    await toggle.click();
    await page.waitForTimeout(1000);
    const overlay = page.locator(".fixed");
    const closeButton = overlay.locator("button").first();
    const prevButton = overlay.getByRole("button", { name: "Prev" });
    const nextButton = overlay.getByRole("button", { name: "Next" });
    const selectorButtons = await overlay
      .locator("div")
      .nth(8)
      .getByRole("button")
      .all();
    await expect(overlay).toBeVisible();
    await expect(overlay.getByRole("img", { name: "Product 1" })).toBeVisible();
    await expect(closeButton).toBeVisible();
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    expect(selectorButtons).toHaveLength(4);
    await closeButton.click();
    await expect(overlay).not.toBeVisible();
  });

  /** Test if the page can navigate 'Lightbox' using product thumbnails */
  test("can navigate 'Lightbox' using product thumbnails", async ({ page }) => {
    const toggle = page.locator("div").nth(3).locator("button").nth(1);
    await toggle.click();
    await page.waitForTimeout(1000);
    const overlay = page.locator(".fixed");
    let currentImage: Locator;
    const selectorButtons = await overlay
      .locator("div")
      .nth(8)
      .getByRole("button")
      .all();
    for (const [idx, button] of Object.entries(selectorButtons)) {
      const index = Number(idx);
      currentImage = overlay.getByRole("img", { name: `Product ${index + 1}` });
      await button.click();
      await expect(currentImage).toBeVisible();
    }
  });

  /** Test if the page can navigate 'Lightbox' using prev & next button */
  test("can navigate 'Lightbox' using prev & next button", async ({ page }) => {
    const toggle = page.locator("div").nth(3).locator("button").nth(1);
    await toggle.click();
    await page.waitForTimeout(1000);
    const overlay = page.locator(".fixed");
    let currentImage: Locator;
    const prevButton = overlay.getByRole("button", { name: "Prev" });
    const nextButton = overlay.getByRole("button", { name: "Next" });
    const indexes = [1, 2, 3, 4];
    for (const index of indexes) {
      currentImage = overlay.getByRole("img", { name: `Product ${index}` });
      await expect(currentImage).toBeVisible();
      await nextButton.click();
    }
    for (const index of indexes.reverse()) {
      await prevButton.click();
      currentImage = overlay.getByRole("img", { name: `Product ${index}` });
      await expect(currentImage).toBeVisible();
    }
  });

  /** Test if the product quantity counter works */
  test("product quantity counter works", async ({ page }) => {
    const quantity = page.getByLabel("Quantity");
    const decrease = page.getByRole("button", { name: "Decrease" });
    const increase = page.getByRole("button", { name: "Increase" });
    await expect(quantity).toBeVisible();
    await expect(decrease).toBeVisible();
    await expect(decrease).toBeDisabled();
    await expect(increase).toBeVisible();
    await expect(quantity).toHaveText("0");
    await increase.click();
    await expect(quantity).toHaveText("1");
    await increase.click();
    await expect(quantity).toHaveText("2");
    await decrease.click();
    await expect(quantity).toHaveText("1");
    await decrease.click();
    await expect(quantity).toHaveText("0");
  });

  /** Test if the page is responsive */
  test.describe("page is responsive", () => {
    test.use({
      viewport: { width: 375, height: 667 },
    });
    test("'Photo slide' section works on mobile", async ({ page }) => {
      const section = page.locator("div").nth(3);
      const slideContainer = section.locator(">div>div").first();
      const prevButton = section.getByRole("button").first();
      const nextButton = section.getByRole("button").nth(1);
      await expect(section).toBeVisible();
      await expect(slideContainer).toBeVisible();
      await expect(prevButton).toBeVisible();
      await expect(nextButton).toBeVisible();
      const images = await section.getByRole("img").all();
      for (const imgIndex of [1, 2, 3, 4]) {
        await expect(images[imgIndex]).toBeVisible();
        // FIXME: fix pattern or fix dom
        await expect(slideContainer).toHaveAttribute(
          "style",
          /.* * -25%.*/i,
          // `--translate:calc(${imgIndex - 1} * -25%)`,
        );
        await nextButton.click();
      }
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
