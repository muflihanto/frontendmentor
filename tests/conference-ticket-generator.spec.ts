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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
