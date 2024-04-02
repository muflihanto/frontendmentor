import { test, expect } from "@playwright/test";

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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
