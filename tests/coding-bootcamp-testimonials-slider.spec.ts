import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Coding Bootcamp Testimonials Slider Page", () => {
  /** Go to Coding Bootcamp Testimonials Slider page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/coding-bootcamp-testimonials-slider");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Coding Bootcamp Testimonials Slider",
    );
  });

  /** Test if the page has a testimonial */
  test("has a testimonial", async ({ page }) => {
    await expect(page.getByText("Tanya SinclairUX Engineer")).toBeVisible();
  });
});
