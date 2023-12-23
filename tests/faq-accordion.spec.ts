import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - FAQ Accordion Page", () => {
  /** Go to FAQ Accordion page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/faq-accordion");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | FAQ Accordion");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "FAQs" }),
    ).toBeVisible();
  });
});
