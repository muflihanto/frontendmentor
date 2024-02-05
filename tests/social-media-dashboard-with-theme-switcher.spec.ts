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

  /** Test if the page has a theme switcher button */
  test("has a theme switcher button", async ({ page }) => {
    const button = page
      .locator("div")
      .filter({ hasText: /^Dark Mode$/ })
      .getByRole("button");
    await expect(button).toBeVisible();
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      level: 1,
      name: "Social Media Dashboard",
    });
    const followers = page.getByText(`Total Followers: ${totalFollowers}`);
    const button = page
      .locator("div")
      .filter({ hasText: /^Dark Mode$/ })
      .getByRole("button");
    await expect(heading).toBeVisible();
    await expect(followers).toBeVisible();
    await expect(heading).toHaveCSS("color", "rgb(30, 32, 42)");
    await expect(followers).toHaveCSS("color", "rgb(99, 104, 126)");
    // switch theme
    await button.click();
    await expect(heading).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(followers).toHaveCSS("color", "rgb(139, 151, 198)");
  });

  /** Test if the page has a 'Followers' section */
  test("has a 'Followers' section", async ({ page }) => {
    const container = page.locator("div").nth(6);
    await expect(container).toBeVisible();
    const cards = await container.locator(">div").all();
    const dataArr = Object.entries(data);
    for (const [index, card] of Object.entries(cards)) {
      const followers =
        dataArr[Number(index)][1].followers < 10000
          ? dataArr[Number(index)][1].followers
          : String(Math.floor(dataArr[Number(index)][1].followers / 1000)) +
            "k";
      const folOrSubs =
        dataArr[Number(index)][0] === "youtube" ? "Subscribers" : "Followers";
      await expect(
        card.getByText(`${dataArr[Number(index)][1].username}`),
      ).toBeVisible();
      await expect(card.getByText(`${followers}`)).toBeVisible();
      await expect(card.getByText(folOrSubs)).toBeVisible();
      await expect(
        card.getByText(
          `${Math.abs(dataArr[Number(index)][1].statistics.followers)} Today`,
        ),
      ).toBeVisible();
    }
  });

  /** Test if the page has a 'Overview' section */
  test("has a 'Overview' section", async ({ page }) => {
    const container = page.locator("div").nth(36);
    await expect(container).toBeVisible();
    const cards = await container.locator(">div").all();
    const dataArr = Object.entries(data);
    for (const [index, card] of Object.entries(cards)) {
      const views =
        dataArr[Number(index)][1].views < 10000
          ? dataArr[Number(index)][1].views
          : String(Math.floor(dataArr[Number(index)][1].views / 1000)) + "k";
      const likes = dataArr[Number(index)][1].likes;
      await expect(card.getByText(`${views}`)).toBeVisible();
      await expect(
        card.getByText(`${dataArr[Number(index)][1].statistics.views.display}`),
      ).toBeVisible();
      await expect(
        card.getByText(
          `${Math.abs(dataArr[Number(index)][1].statistics.views.value)}%`,
        ),
      ).toBeVisible();
      await expect(card.getByText(`${likes}`)).toBeVisible();
      await expect(
        card.getByText(`${dataArr[Number(index)][1].statistics.likes.display}`),
      ).toBeVisible();
      await expect(
        card.getByText(
          `${Math.abs(dataArr[Number(index)][1].statistics.likes.value)}%`,
        ),
      ).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
