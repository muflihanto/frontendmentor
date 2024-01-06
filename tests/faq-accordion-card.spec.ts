import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - FAQ Accordion Card Page", () => {
  /** Go to FAQ Accordion Card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/faq-accordion-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | FAQ Accordion Card");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "FAQ",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct illustration */
  test("has an illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Woman Online" }),
    ).toBeVisible();
  });

  /** Test if the page has all faqs */
  test("has faqs", async ({ page }) => {
    const faqs = await page.locator("main>div>div:not(:last-child)").all();
    expect(faqs).toHaveLength(5);
    for (const faq of faqs) {
      await expect(faq).toBeAttached();
    }
  });
});
