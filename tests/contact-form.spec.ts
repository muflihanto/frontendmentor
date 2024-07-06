import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Contact form", () => {
  /** Go to Contact form before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/contact-form");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Contact form");
  });

  /** Test if the page has all form fields */
  test("has all form fields", async ({ page }) => {
    await expect(page.getByLabel("First Name*")).toBeVisible();
    await expect(page.getByLabel("Last Name*")).toBeVisible();
    await expect(page.getByLabel("Email Address*")).toBeVisible();
    await expect(page.getByLabel("General Enquiry")).toBeVisible();
    await expect(page.getByLabel("Support Request")).toBeVisible();
    await expect(page.getByLabel("Message*")).toBeVisible();
    await expect(page.getByLabel("I consent to being contacted")).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
