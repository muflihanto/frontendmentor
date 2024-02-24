import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Intro section with dropdown navigation Page", () => {
  /** Go to Intro section with dropdown navigation page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/intro-section-with-dropdown-navigation");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Intro section with dropdown navigation",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img").first()).toBeVisible();
    const nav = header.getByRole("navigation");
    const listItems = [
      {
        parent: "Features",
        children: ["Todo List", "Calendar", "Reminders", "Planning"],
      },
      { parent: "Company", children: ["History", "Our Team", "Blog"] },
      { parent: "Careers" },
      { parent: "About" },
    ];
    for (const listItem of listItems) {
      if (listItem.children !== undefined) {
        await expect(
          nav.locator("summary").filter({ hasText: listItem.parent }),
        ).toBeVisible();
      } else {
        await expect(
          nav.locator("li").filter({ hasText: listItem.parent }),
        ).toBeVisible();
      }
    }
    const links = ["Login", "Register"];
    for (const link of links) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Make remote work",
      }),
    ).toBeVisible();
  });
});
