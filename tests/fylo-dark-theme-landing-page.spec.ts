import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with dark theme and features grid Page", () => {
  /** Go to Fylo landing page with dark theme and features grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-dark-theme-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with dark theme and features grid",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img", { name: "Fylo Logo" })).toBeVisible();
    const nav = header.getByRole("navigation");
    const navlinks = ["Features", "Team", "Sign In"];
    for (const link of navlinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(2);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: "Hero Image Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Fylo stores all your most important files in one secure location. Access them wherever you need, share and collaborate with friends family, and co-workers.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Features' section */
  test("has a 'Features' section", async ({ page }) => {
    const section = page.locator("div").nth(8);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    const features = [
      {
        heading: "Access your files, anywhere",
        body: "The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.",
      },
      {
        heading: "Security you can trust",
        body: "2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.",
      },
      {
        heading: "Real-time collaboration",
        body: "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.",
      },
      {
        heading: "Store any type of file",
        body: "Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.",
      },
    ];
    const grids = await section.locator(">div").all();
    expect(grids).toHaveLength(4);
    for (const [index, grid] of Object.entries(grids)) {
      const indexNum = Number(index);
      await expect(grid.getByRole("img")).toBeVisible();
      await expect(
        grid.getByRole("heading", { name: features[indexNum].heading }),
      ).toBeVisible();
      await expect(grid.getByText(features[indexNum].body)).toBeVisible();
    }
  });

  /** Test if the page has a 'Productive' section */
  test("has a 'Productive' section", async ({ page }) => {
    const section = page.locator("div").nth(13);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Productive Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Stay productive, wherever you are",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Never let location be an issue when accessing your files. Fylo has you covered for all of your file storage needs.",
      ),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "See how Fylo works" }),
    ).toBeVisible();
  });
});
