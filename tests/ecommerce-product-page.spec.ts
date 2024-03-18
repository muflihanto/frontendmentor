import { test, expect } from "@playwright/test";

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
    await expect(section.getByText(product.brand)).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: product.name,
      }),
    ).toBeVisible();
    await expect(section.getByText(product.description)).toBeVisible();
    await expect(section.getByText(`$${product.price}.00`)).toBeVisible();
    await expect(section.getByText("50%")).toBeVisible();
    await expect(
      section.getByText(`$${product.originalPrice}.00`),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Add to cart" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
