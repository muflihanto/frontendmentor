import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive pricing component Page", () => {
  /** Go to Interactive pricing component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-pricing-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive pricing component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Simple, traffic-based pricing",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Sign-up for our 30-day trial.No credit card required."),
    ).toBeVisible();
  });

  /** Test if the page has a correct main card */
  test.describe("has a main card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(3);
      await expect(card).toBeVisible();
    });
    test("all initial states visible", async ({ page }) => {
      const card = page.locator("div").nth(3);
      await expect(
        card.getByRole("heading", { name: "100K Pageviews" }),
      ).toBeVisible();
      await expect(card.getByText("$16.00/ month")).toBeVisible();
      const slider = card.getByRole("slider");
      await expect(slider).toBeVisible();
      expect(await slider.inputValue()).toEqual("3");
      await expect(card.getByText("Monthly Billing")).toBeVisible();
      const toggle = card
        .locator("div")
        .filter({ hasText: /^Monthly BillingYearly Billing-25% discount$/ });
      await expect(toggle.getByText("Monthly Billing")).toBeVisible();
      await expect(toggle.getByRole("button")).toBeVisible();
      await expect(
        toggle.getByText("Yearly Billing-25% discount"),
      ).toBeVisible();
      await expect(
        card.getByText("Unlimited websites100% data ownershipEmail reports"),
      ).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Start my trial" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
