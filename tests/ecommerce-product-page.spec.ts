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

const hasBefore = async (element: Locator) =>
  await element.evaluate((el) => {
    const beforeStyle = window.getComputedStyle(el, "::before");
    return beforeStyle.content !== "none" && beforeStyle.content !== "";
  });

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
    // Header links
    const nav = page.getByRole("navigation");
    for (const link of navlinks) {
      const linkElement = nav.getByRole("menuitem", {
        name: link,
        exact: true,
      });
      await expect(linkElement).toBeVisible();
      expect(await hasBefore(linkElement.locator(".."))).toBeFalsy();
      await linkElement.hover();
      expect(await hasBefore(linkElement.locator(".."))).toBeTruthy();
    }
    // Header cart button
    const cartToggle = page.locator("#cart-toggle");
    const cartPopup = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Cart" }) })
      .nth(1);
    await expect(cartToggle).toBeVisible();
    await expect(cartToggle.locator("svg")).toHaveCSS(
      "fill",
      "rgb(105, 112, 125)",
    );
    await cartToggle.hover();
    await expect(cartToggle.locator("svg")).toHaveCSS("fill", "rgb(0, 0, 0)");
    await expect(cartPopup).not.toBeVisible();
    await cartToggle.click();
    await expect(cartPopup).toBeVisible();
    await cartToggle.click();
    await expect(cartPopup).not.toBeVisible();
    // Header avatar
    const avatar = page.getByRole("button", { name: "User's avatar" });
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveCSS("box-shadow", "none");
    await avatar.hover();
    await expect(avatar).not.toHaveCSS("box-shadow", "none");
  });

  test.describe("Cart Controller", () => {
    test("should initialize with empty cart", async ({ page }) => {
      // Check that cart count indicator is not visible initially
      const cartCount = page.locator(
        'button[id="cart-toggle"] >> span.absolute',
      );
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

      const checkout = page.getByRole("button", { name: "Checkout" });
      await expect(checkout).toBeVisible();
      await expect(checkout).toHaveCSS("background-color", "rgb(255, 125, 26)");
      await checkout.hover();
      await expect(checkout).toHaveCSS(
        "background-color",
        "rgba(255, 125, 26, 0.7)",
      );
    });

    test("should allow removing items from cart", async ({ page }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });
      const cartButton = page.locator('button[id="cart-toggle"]');

      // Add item to cart
      await increaseBtn.click();
      await addToCartBtn.click();

      // Open cart dropdown
      await cartButton.click();

      // Remove item
      const deleteButton = page.getByRole("button", { name: "Delete" }).first();
      await expect(deleteButton).toBeVisible();
      await expect(deleteButton.locator("svg")).toHaveCSS(
        "fill",
        "rgb(195, 202, 217)",
      );
      await deleteButton.hover();
      await expect(deleteButton.locator("svg")).toHaveCSS(
        "fill",
        "rgb(0, 0, 0)",
      );
      await deleteButton.click();

      // Verify cart is empty
      const emptyMessage = page.locator("text=Your cart is empty.");
      await expect(emptyMessage).toBeVisible();
      await expect(
        page.locator('button[id="cart-toggle"] >> span.absolute'),
      ).not.toBeVisible();
    });

    test("should close cart when clicking outside", async ({ page }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });
      const cartButton = page.locator('button[id="cart-toggle"]');

      // Add item to cart
      await increaseBtn.click();
      await addToCartBtn.click();

      // Open cart dropdown
      await cartButton.click();

      // Click outside
      await page.locator("#main-heading").click({ position: { x: 2, y: 2 } });

      // Verify cart is closed
      const cartPopup = page.getByRole("heading", { name: "Cart", level: 2 });
      await expect(cartPopup).not.toBeVisible();
    });

    test("should not add items to cart when quantity is zero", async ({
      page,
    }) => {
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });
      const cartButton = page.locator('button[id="cart-toggle"]');

      // Try to add with quantity 0
      await addToCartBtn.click();

      // Open cart dropdown
      await cartButton.click();

      // Verify cart is still empty
      const emptyMessage = page.locator("text=Your cart is empty.");
      await expect(emptyMessage).toBeVisible();
    });

    test("should display correct total price for cart items", async ({
      page,
    }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });
      const cartButton = page.locator('button[id="cart-toggle"]');

      // Add 3 items to cart (quantity 3)
      await increaseBtn.click();
      await increaseBtn.click();
      await increaseBtn.click();
      await addToCartBtn.click();

      // Open cart dropdown
      await cartButton.click();

      // Verify total price
      const cartItem = page.locator('ul[id="cart-items"]  >> li').first();
      await expect(cartItem).toContainText("$125.00 x 3");
      await expect(cartItem).toContainText("$375.00");
    });

    test("should persist cart items between page reloads", async ({ page }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const addToCartBtn = page.getByRole("button", { name: "Add to cart" });

      // Add item to cart
      await increaseBtn.click();
      await addToCartBtn.click();

      // Reload page
      await page.reload();

      // Verify cart count is still there
      const cartCount = page.locator(
        'button[id="cart-toggle"] >> span.absolute',
      );
      await expect(cartCount).toBeVisible();
      await expect(cartCount).toHaveText("1");
    });

    test("should have correct hover states behavior", async ({ page }) => {
      const increaseBtn = page.getByRole("button", { name: "Increase" });
      const decreaseBtn = page.getByRole("button", { name: "Decrease" });

      // Hover on increase button
      await expect(increaseBtn).toHaveCSS("opacity", "1");
      await increaseBtn.hover();
      await expect(increaseBtn).toHaveCSS("opacity", "0.5");

      // Hover on disabled decrease button
      await expect(decreaseBtn).toHaveCSS("opacity", "1");
      await decreaseBtn.hover();
      await expect(decreaseBtn).toHaveCSS("opacity", "1");

      await increaseBtn.click();

      // Hover on enabled decrease button
      await expect(decreaseBtn).toHaveCSS("opacity", "1");
      await decreaseBtn.hover();
      await expect(decreaseBtn).toHaveCSS("opacity", "0.5");
    });
  });

  /** Test if the page has 'Product Details' section */
  test("has 'Product Details' section", async ({ page }) => {
    const section = page.locator("div").nth(10);
    await expect(section.getByLabel("Brand name")).toBeVisible();
    await expect(section.getByLabel("Product name")).toBeVisible();
    await expect(section.getByLabel("Product description")).toBeVisible();
    await expect(
      section.getByLabel("Product Price", { exact: true }),
    ).toBeVisible();
    await expect(section.getByLabel("Product Discount")).toBeVisible();
    await expect(section.getByLabel("Original Product Price")).toBeVisible();
    const addToCart = section.getByRole("button", { name: "Add to cart" });
    await expect(addToCart).toBeVisible();
    await expect(addToCart).toHaveCSS("background-color", "rgb(255, 125, 26)");
    await addToCart.hover();
    await expect(addToCart).toHaveCSS(
      "background-color",
      "rgba(255, 125, 26, 0.7)",
    );
  });

  /** Test if the page has 'Photo slide' section */
  test("has 'Photo slide' section", async ({ page }) => {
    const section = page.locator("div").nth(2);
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
      if (btnIndex !== "0") expect(await hasBefore(button)).toBeFalsy();
      await button.hover();
      expect(await hasBefore(button)).toBeTruthy();
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
    await expect(closeButton.locator("svg")).toHaveCSS(
      "fill",
      "rgb(105, 112, 125)",
    );
    await closeButton.hover();
    await expect(closeButton.locator("svg")).toHaveCSS(
      "fill",
      "rgb(255, 125, 26)",
    );
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    expect(selectorButtons).toHaveLength(4);
    for (const [index, button] of Object.entries(selectorButtons)) {
      if (index !== "0") expect(await hasBefore(button)).toBeFalsy();
      await button.hover();
      expect(await hasBefore(button)).toBeTruthy();
    }
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
      const section = page.locator("div").nth(2);
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
