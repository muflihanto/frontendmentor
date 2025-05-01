import { test, expect, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

const navlinks = ["Collections", "Men", "Women", "About", "Contact"];

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
    const nav = page.getByRole("navigation");
    for (const link of navlinks) {
      await expect(
        nav.getByRole("menuitem", { name: link, exact: true }),
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

  test.describe("Cart Controller", () => {
    test("should initialize with empty cart", async ({ page }) => {
      // Check that cart count indicator is not visible initially
      const cartCount = page.locator('[aria-label="Cart"] >> .absolute');
      await expect(cartCount).not.toBeVisible();
    });

    test("should show empty cart message when no items are added", async ({
      page,
    }) => {
      const cartButton = page.getByRole("button", {
        name: "Cart",
        exact: true,
      });

      // Open cart dropdown
      await cartButton.click();

      // Verify empty cart message
      const emptyMessage = page.locator("text=Your cart is empty.");
      await expect(emptyMessage).toBeVisible();
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

    test('should add items to cart when "Add to cart" is clicked', async ({
      page,
    }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });
      const cartButton = page.locator('button[id="cart-toggle"]');

      // Add 2 items to cart
      await increaseBtn.click();
      await increaseBtn.click();
      await addToCartBtn.click();

      // Cart count should show 1 (1 product added, not quantity)
      const cartCount = cartButton.locator(".absolute");
      await expect(cartCount).toBeVisible();
      await expect(cartCount).toHaveText("1");

      // Open cart dropdown
      await cartButton.click();

      // Verify cart contents
      const cartItems = page.locator('ul[id="cart-items"]  >> li');
      await expect(cartItems).toHaveCount(1);
      await expect(cartItems.first()).toContainText(
        "Fall Limited Edition Sneakers",
      );
      await expect(cartItems.first()).toContainText("$125.00 x 2");
      await expect(cartItems.first()).toContainText("$250.00");
    });
  });

  /** Test if the page has 'Product Details' section */
  test("has 'Product Details' section", async ({ page }) => {
    const section = page.locator("div").nth(11);
    await expect(section.getByLabel("Brand name")).toBeVisible();
    await expect(section.getByLabel("Product name")).toBeVisible();
    await expect(section.getByLabel("Product description")).toBeVisible();
    await expect(
      section.getByLabel("Product Price", { exact: true }),
    ).toBeVisible();
    await expect(section.getByLabel("Product Discount")).toBeVisible();
    await expect(section.getByLabel("Original Product Price")).toBeVisible();
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
    test("has mobile navigation menu", async ({ page }) => {
      const button = page.getByRole("button", { name: "Menu" });
      await expect(button).toBeVisible();
    });
    test("mobile navigation menu works", async ({ page }) => {
      const menuButton = page.getByRole("button", { name: "Menu" });
      const navContainer = page.locator("id=mobilenavmenu");
      const closeButton = navContainer.getByRole("button");
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-haspopup", "true");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).toHaveAttribute(
        "aria-controls",
        "mobilenavmenu",
      );
      await expect(navContainer).not.toBeVisible();
      for (const link of navlinks) {
        await expect(
          navContainer.getByRole("menuitem", { name: link, exact: true }),
        ).not.toBeVisible();
      }
      await expect(closeButton).not.toBeVisible();
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(navContainer).toBeVisible();
      for (const link of navlinks) {
        await expect(
          navContainer.getByRole("menuitem", { name: link, exact: true }),
        ).toBeVisible();
      }
      await closeButton.click();
      await expect(navContainer).not.toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      for (const link of navlinks) {
        await expect(
          navContainer.getByRole("menuitem", { name: link, exact: true }),
        ).not.toBeVisible();
      }
      await expect(closeButton).not.toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
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
