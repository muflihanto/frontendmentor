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

  /** Test if user can handle empty input submit */
  test("can handle empty input submit", async ({ page }) => {
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    await page.waitForTimeout(1500);
    const required = await page.getByText("This field is required").all();
    const uncheckedQuery = page.getByText("Please select a query type");
    const uncheckedConsent = page.getByText("To submit this form, please");
    expect(required).toHaveLength(4);
    for (const req of required) {
      await expect(req).toBeVisible();
    }
    await expect(uncheckedQuery).toBeVisible();
    await expect(uncheckedConsent).toBeVisible();
  });

  /** Test if user can handle invalid input submit */
  test("can handle invalid input submit", async ({ page }) => {
    const firstNameError = page.getByText(
      "First name must be at least 3 characters",
    );
    const lastNameError = page.getByText(
      "Last name must be at least 3 characters",
    );
    const emailError = page.getByText("Please enter a valid email address");
    const messageError = page.getByText(
      "Message must be at least 50 characters",
    );
    await expect(firstNameError).not.toBeVisible();
    await expect(lastNameError).not.toBeVisible();
    await expect(emailError).not.toBeVisible();
    await expect(messageError).not.toBeVisible();
    const firstName = page.getByLabel("First Name*");
    await firstName.fill("Fi");
    await expect(firstNameError).toBeVisible();
    const lastName = page.getByLabel("Last Name*");
    await lastName.fill("La");
    await expect(lastNameError).toBeVisible();
    const email = page.getByLabel("Email Address*");
    await email.fill("mail@example");
    await expect(emailError).toBeVisible();
    const supportRequest = page.getByLabel("Support Request");
    await supportRequest.click();
    const message = page.getByLabel("Message*");
    await message.fill("Hello");
    await expect(messageError).toBeVisible();
    const consent = page.getByLabel("I consent to being contacted");
    await consent.click();
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    await expect(
      page.getByRole("heading", { name: "Message Sent!" }),
    ).not.toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
