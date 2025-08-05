import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Chat app CSS illustration Page", () => {
  /** Go to Chat app CSS illustration page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/chat-app-css-illustration");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Chat app CSS illustration",
    );
  });

  /** Test if the page has a gradient background image */
  test("has a gradient background image", async ({ page }) => {
    await expect(page.locator(".absolute").first()).toHaveCSS(
      "background-image",
      "linear-gradient(200deg, rgb(233, 66, 255) -40%, rgb(136, 56, 255))",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Simple booking",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a description text */
  test("has a description text", async ({ page }) => {
    await expect(
      page.getByText(
        "Stay in touch with our dog walkers through the chat interface. This makes it easy to discuss arrangements and make bookings. Once the walk has been completed you can rate your walker and book again all through the chat.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has non animated screen section elements */
  test("has non animated screen section elements", async ({ page }) => {
    const container = page.locator("div").nth(6);
    await expect(
      container.getByRole("img", { name: "Samuel Green Avatar" }),
    ).toBeVisible();
    await expect(
      container.getByRole("heading", { name: "Samuel Green" }),
    ).toBeVisible();
    await expect(container.getByText("Available to Walk")).toBeVisible();
    await expect(container.getByText("Type a message…")).toBeVisible();
  });

  /** Test if the page has animated screen section elements */
  test("has animated screen section elements", async ({ page }) => {
    const container = page.locator("div").nth(6);
    const firstChat = container.getByText(
      "That sounds great. I’d be happy with that.",
    );
    await expect(firstChat).toBeVisible();
    const lastChat = container.getByText(
      "She looks so happy! The time we discussed works. How long",
    );
    await expect(lastChat).not.toBeVisible({ timeout: 1000 });
    await page.waitForTimeout(12000);
    await expect(lastChat).toBeVisible();
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
