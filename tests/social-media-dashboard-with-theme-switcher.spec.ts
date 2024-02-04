import { test, expect } from "@playwright/test";

const data = {
  facebook: {
    username: "@nathanf",
    followers: 1987,
    views: 87,
    likes: 52,
    statistics: {
      followers: 12,
      views: { display: "Page Views", value: 3 },
      likes: { display: "Likes", value: -2 },
    },
  },
  twitter: {
    username: "@nathanf",
    followers: 1044,
    views: 117,
    likes: 507,
    statistics: {
      followers: 99,
      views: { display: "Retweets", value: 303 },
      likes: { display: "Likes", value: 553 },
    },
  },
  instagram: {
    username: "@realnathanf",
    followers: 11734,
    views: 52000,
    likes: 5462,
    statistics: {
      followers: 1099,
      views: { display: "Profile Views", value: 1375 },
      likes: { display: "Likes", value: 2257 },
    },
  },
  youtube: {
    username: "Nathan F.",
    followers: 8239,
    likes: 107,
    views: 1407,
    statistics: {
      followers: -144,
      likes: { display: "Likes", value: -19 },
      views: { display: "Total Views", value: -12 },
    },
  },
};

const totalFollowers = Array.from(Object.values(data))
  .reduce((acc, curr) => acc + curr.followers, 0)
  .toLocaleString("en");

test.describe("FrontendMentor Challenge - Social media dashboard with theme switcher Page", () => {
  /** Go to Social media dashboard with theme switcher page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-media-dashboard-with-theme-switcher");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Social media dashboard with theme switcher",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Social Media Dashboard" }),
    ).toBeVisible();
    await expect(
      page.getByText(`Total Followers: ${totalFollowers}`),
    ).toBeVisible();
  });

  /** Test if the page has a theme switcher button */
  test("has a theme switcher button", async ({ page }) => {
    const button = page
      .locator("div")
      .filter({ hasText: /^Dark Mode$/ })
      .getByRole("button");
    await expect(button).toBeVisible();
  });
});
