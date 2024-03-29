import { test, expect } from "@playwright/test";

const links = [
  {
    href: "",
    display: "Home",
  },
  {
    href: "",
    display: "Shop",
  },
  {
    href: "",
    display: "About",
  },
  {
    href: "",
    display: "Contact",
  },
];

test.describe("FrontendMentor Challenge - Room homepage Page", () => {
  /** Go to Room homepage page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/room-homepage");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Room homepage");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    for (const link of links) {
      await expect(
        header.getByRole("link", { name: link.display }),
      ).toBeVisible();
    }
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Discover innovative ways to decorate",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
