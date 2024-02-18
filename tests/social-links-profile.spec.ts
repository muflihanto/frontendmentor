import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Social links profile Page", () => {
  /** Go to Social links profile page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-links-profile");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Social links profile");
  });

  /** Test if the page has a main card */
  test("has a main card", async ({ page }) => {
    const card = page.getByRole("main");
    await expect(card).toBeVisible();
    await expect(
      card.getByRole("img", { name: "Jessica Randall's Avatar" }),
    ).toBeVisible();
    await expect(
      card.getByRole("heading", { level: 1, name: "Jessica Randall" }),
    ).toBeVisible();
    await expect(card.getByText("London, United Kingdom")).toBeVisible();
    await expect(
      card.getByText('"Front-end developer and avid reader."'),
    ).toBeVisible();
    // has social links
    const links = [
      {
        name: "GitHub",
        href: "",
      },
      {
        name: "Frontend Mentor",
        href: "",
      },
      {
        name: "LinkedIn",
        href: "",
      },
      {
        name: "Twitter",
        href: "",
      },
      {
        name: "Instagram",
        href: "",
      },
    ];
    const linkContainer = card.locator("ul");
    for (const { name } of links) {
      await expect(linkContainer.getByRole("link", { name })).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
