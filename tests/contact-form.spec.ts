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

  /** Test if user can submit valid inputs */
  test("can submit valid inputs", async ({ page }) => {
    const firstName = page.getByLabel("First Name*");
    await firstName.fill("John");
    const lastName = page.getByLabel("Last Name*");
    await lastName.fill("Doe");
    const email = page.getByLabel("Email Address*");
    await email.fill("mail@example.com");
    const generalEnquiry = page.getByLabel("General Enquiry");
    await generalEnquiry.click();
    const message = page.getByLabel("Message*");
    await message.fill(
      "Hello, I would like to know if you're able to build Shopify e-commerce sites. We're starting a business and we're going to use Shopify. But it would be great to work with an agency who specialises in working with it.",
    );
    const consent = page.getByLabel("I consent to being contacted");
    await consent.click();
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    await expect(
      page.getByRole("heading", { name: "Message Sent!" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
