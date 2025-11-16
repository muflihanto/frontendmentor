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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
