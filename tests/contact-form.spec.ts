import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

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

  /** Test hover states for interactive elements */
  test("interactive elements have proper hover states", async ({ page }) => {
    const firstName = page.getByLabel("First Name*");
    const message = page.getByLabel("Message*");
    const consent = page.getByLabel("I consent to being contacted");
    const submit = page.getByRole("button", { name: "Submit" });

    // Test hover on text inputs
    await firstName.hover();
    await expect(firstName).toHaveCSS("border-color", "rgb(12, 125, 105)");

    await expect(message).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await message.hover();
    await expect(message).toHaveCSS("border-color", "rgb(12, 125, 105)");

    // Test hover on radio button
    // FIXME: no visual feedback on raido input element hover
    const generalEnquiryLabel = page.getByText("General Enquiry");
    await expect(generalEnquiryLabel).toHaveCSS(
      "border-color",
      "rgb(135, 163, 166)",
    );
    await generalEnquiryLabel.hover();
    await expect(generalEnquiryLabel).toHaveCSS(
      "border-color",
      "rgb(12, 125, 105)",
    );

    // Test hover on checkbox
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).toHaveCSS(
      "border-color",
      "rgba(135, 163, 166, 0.75)",
    );
    await consent.hover();
    await expect(checkbox).toHaveCSS("border-color", "rgb(135, 163, 166)");

    // Test hover on submit button
    await expect(submit).toHaveCSS("background-color", "rgb(12, 125, 105)");
    await submit.hover();
    await expect(submit).toHaveCSS("background-color", "rgb(6, 65, 56)");
  });

  /** Test focus states for form fields */
  test("form fields have proper focus states", async ({ page }) => {
    const firstName = page.getByLabel("First Name*");
    const lastName = page.getByLabel("Last Name*");
    const email = page.getByLabel("Email Address*");
    const message = page.getByLabel("Message*");
    const consent = page.getByLabel("I consent to being contacted");
    const submit = page.getByRole("button", { name: "Submit" });
    const generalEnquiry = page.getByLabel("General Enquiry");

    // Test focus on each field
    await firstName.focus();
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveCSS("border-color", "rgb(12, 125, 105)");

    await expect(lastName).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await lastName.focus();
    await expect(lastName).toBeFocused();
    await expect(lastName).toHaveCSS("border-color", "rgb(12, 125, 105)");

    await expect(email).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await email.focus();
    await expect(email).toBeFocused();
    await expect(email).toHaveCSS("border-color", "rgb(12, 125, 105)");

    await generalEnquiry.focus();
    await expect(generalEnquiry).toBeFocused();

    await expect(message).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await message.focus();
    await expect(message).toBeFocused();
    await expect(message).toHaveCSS("border-color", "rgb(12, 125, 105)");

    await consent.focus();
    await expect(consent).toBeFocused();

    await expect(submit).toHaveCSS("outline-width", "0px");
    await submit.focus();
    await expect(submit).toBeFocused();
    await expect(submit).toHaveCSS("outline-width", "3px");
  });

  test.describe("valid form submission", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto("/contact-form");
    });

    /** Test if user can submit valid inputs */
    test("can submit valid inputs", async () => {
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

    /** Test if the success toast appears and disappears automatically */
    test("success toast appears and disappears", async () => {
      const alertElement = page.locator("div").getByRole("alert");
      // Verify toast appears
      await expect(alertElement).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Message Sent!" }),
      ).toBeVisible();

      // Verify toast disappears after delay
      await expect(alertElement).not.toBeVisible({ timeout: 6000 });
    });

    /** Test if form resets after successful submission */
    test("form resets after submission", async () => {
      await expect(page.getByLabel("First Name*")).toHaveValue("");
      await expect(page.getByLabel("Last Name*")).toHaveValue("");
      await expect(page.getByLabel("Email Address*")).toHaveValue("");
      await expect(page.getByLabel("General Enquiry")).not.toBeChecked();
      await expect(page.getByLabel("Support Request")).not.toBeChecked();
      await expect(page.getByLabel("Message*")).toHaveValue("");
      await expect(
        page.getByLabel("I consent to being contacted"),
      ).not.toBeChecked();
    });
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
    const submit = page.getByRole("button", { name: "Submit" });
    await expect(firstNameError).not.toBeVisible();
    await expect(lastNameError).not.toBeVisible();
    await expect(emailError).not.toBeVisible();
    await expect(messageError).not.toBeVisible();
    const firstName = page.getByLabel("First Name*");
    await firstName.fill("Fi");
    const lastName = page.getByLabel("Last Name*");
    await lastName.fill("La");
    const email = page.getByLabel("Email Address*");
    await email.fill("mail@example");
    const supportRequest = page.getByLabel("Support Request");
    await supportRequest.click();
    const message = page.getByLabel("Message*");
    await message.fill("Hello");
    const consent = page.getByLabel("I consent to being contacted");
    await consent.click();
    await expect(firstName).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await expect(lastName).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await expect(email).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await expect(message).toHaveCSS("border-color", "rgb(135, 163, 166)");
    await submit.click();
    await expect(firstNameError).toBeVisible();
    await expect(firstName).toHaveCSS("border-color", "rgb(220, 38, 38)");
    await expect(lastNameError).toBeVisible();
    await expect(lastName).toHaveCSS("border-color", "rgb(220, 38, 38)");
    await expect(emailError).toBeVisible();
    await expect(email).toHaveCSS("border-color", "rgb(220, 38, 38)");
    await expect(messageError).toBeVisible();
    await expect(message).toHaveCSS("border-color", "rgb(220, 38, 38)");
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
