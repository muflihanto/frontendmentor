import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Clipboard landing Page", () => {
  /** Go to Clipboard landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/clipboard-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Clipboard landing page");
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main).toBeVisible();
    await expect(main).toBeInViewport();
    await expect(main.getByRole("img")).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "A history of everything you copy",
      }),
    ).toBeVisible();
    await expect(
      main.getByText(
        "Clipboard allows you to track and organize everything you copy. Instantly access your clipboard on all your devices.",
      ),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for iOS" }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for Mac" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Snippet' section */
  test("has a 'Snippet' section", async ({ page }) => {
    const section = page.locator("section").first();
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Keep track of your snippets" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Clipboard instantly stores any item you copy in the cloud, meaning you can access your snippets immediately on all your devices. Our Mac and iOS apps will help you organize everything.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Computer Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Quick Search" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Easily search your snippets by content, category, web address, application, and more.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "iCloud Sync" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Instantly saves and syncs snippets across all your devices.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Complete History" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Retrieve any snippets from the first moment you started using the app.",
      ),
    ).toBeVisible();
  });
});
