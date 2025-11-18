import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Conference ticket generator page", () => {
  /** Go to Conference ticket generator page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/conference-ticket-generator");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Conference ticket generator",
    );
  });

  /** Test if the page has a correct header */
  test("has header components", async ({ page }) => {
    const codingConf = page.getByRole("img", { name: "Coding Conf" });
    const heading = page.getByRole("heading", {
      name: "Your Journey to Coding Conf",
    });
    const tagline = page.getByText("Secure your spot at next year");
    await expect(codingConf).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(tagline).toBeVisible();
  });

  /** Test if the page has a form component */
  test("has form component", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    // Upload avatar field
    await expect(
      page.locator("label", { hasText: "Upload Avatar" }),
    ).toBeVisible();
    await expect(page.getByLabel("Upload Avatar")).toHaveCount(1);
    await expect(page.getByLabel("Upload Avatar")).toBeHidden();
    await expect(
      page.locator("label", { hasText: "Drag and drop or click to upload" }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toHaveCount(1);
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toBeHidden();
    // Full name field
    await expect(page.locator("label", { hasText: "Full Name" })).toBeVisible();
    await expect(page.getByLabel("Full Name")).toBeVisible();
    // Email Address field
    await expect(
      page.locator("label", { hasText: "Email Address" }),
    ).toBeVisible();
    await expect(page.getByLabel("Email Address")).toBeVisible();
    // GitHub Username field
    await expect(
      page.locator("label", { hasText: "GitHub Username" }),
    ).toBeVisible();
    await expect(page.getByLabel("GitHub Username")).toBeVisible();
    // Submit button
    await expect(
      page.getByRole("button", { name: "Generate My Ticket" }),
    ).toBeVisible();
  });

  /** Test if the page can handle form submission */
  test.describe("form submission", () => {
    /** Test if the form can handle valid input */
    test("should handle valid input correctly", async ({ page }) => {
      const form = page.locator("form");
      const fullName = page.getByLabel("Full Name");
      const email = page.getByLabel("Email Address");
      const username = page.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });
      // Fill inputs
      await fullName.fill("Jonatan Kristof");
      await email.fill("jonatan@email.com");
      await username.fill("@jonatankristof0101");
      // Submit
      await submit.click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });

    /** Test if the form can handle empty input */
    test("should handle empty input correctly", async ({ page }) => {
      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Please enter a valid email address.");
      const usernameError = page.getByText("Username cannot be empty.");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).not.toBeVisible();

      await submit.click();

      await expect(fullNameError).toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
