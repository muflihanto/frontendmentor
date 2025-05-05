import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
const themes = ["light", "dark"] as const;

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
    const button = page.getByRole("switch", { name: "Dark Mode" });
    await expect(button).toBeVisible();
  });

  /** Test theme switching functionality */
  test("theme switcher toggles between light and dark modes", async ({
    page,
  }) => {
    const button = page.getByRole("switch", { name: "Dark Mode" });

    // Initial state should be light (justify-end)
    await expect(button).toHaveAttribute("aria-checked", "false");
    await expect(button).toHaveCSS("justify-content", "flex-end");

    // Toggle to dark (should switch to justify-start)
    await button.click();
    await expect(button).toHaveAttribute("aria-checked", "true");
    await expect(button).toHaveCSS("justify-content", "flex-start");

    // Toggle back to light (should return to justify-end)
    await button.click();
    await expect(button).toHaveAttribute("aria-checked", "false");
    await expect(button).toHaveCSS("justify-content", "flex-end");
  });

  /** Test theme respects system preference */
  test("theme respects system preference", async ({ page }) => {
    const button = page.getByRole("switch", { name: "Dark Mode" });

    // Set system preference to dark
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    // Should automatically switch to dark mode
    await expect(button).toHaveAttribute("aria-checked", "true");

    // Set system preference back to light
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    // Should automatically switch to light mode
    await expect(button).toHaveAttribute("aria-checked", "false");
  });

  /** Test theme persistence */
  test("theme preference persists after page reload", async ({ page }) => {
    const button = page.getByRole("switch", { name: "Dark Mode" });

    // Toggle to dark and reload
    await button.click();
    await page.reload();
    await expect(button).toHaveAttribute("aria-checked", "true");

    // Toggle back to light and reload
    await button.click();
    await page.reload();
    await expect(button).toHaveAttribute("aria-checked", "false");
  });

  test("theme preference is stored in localStorage", async ({ page }) => {
    const button = page.getByRole("switch", { name: "Dark Mode" });

    // Check initial state
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();

    // Set to dark and verify storage
    await button.click();
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
      "dark",
    );

    // Set to light and verify storage
    await button.click();
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
      "light",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      level: 1,
      name: "Social Media Dashboard",
    });
    const followers = page.getByText(`Total Followers: ${totalFollowers}`);
    const button = page.getByRole("switch", { name: "Dark Mode" });
    await expect(heading).toBeVisible();
    await expect(followers).toBeVisible();
    await expect(heading).toHaveCSS("color", "rgb(30, 32, 42)");
    await expect(followers).toHaveCSS("color", "rgb(99, 104, 126)");
    await expect(button).toHaveAttribute("aria-checked", "false");
    // switch theme
    await button.click();
    await expect(heading).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(followers).toHaveCSS("color", "rgb(139, 151, 198)");
    await expect(button).toHaveAttribute("aria-checked", "true");
  });

  /** Test if the page has a 'Followers' section */
  test("has a 'Followers' section", async ({ page }) => {
    const container = page.getByLabel("Total Followers/Subsibers");
    await expect(container).toBeVisible();
    const cards = await container.locator(">div").all();
    const dataArr = Object.entries(data);
    const button = page.getByRole("switch", { name: "Dark Mode" });
    for (const theme of themes) {
      if (theme === "dark") await button.click();
      for (const [index, card] of Object.entries(cards)) {
        const followers =
          dataArr[Number(index)][1].followers < 10000
            ? dataArr[Number(index)][1].followers
            : `${Math.floor(dataArr[Number(index)][1].followers / 1000)}k`;
        const folOrSubs =
          dataArr[Number(index)][0] === "youtube" ? "Subscribers" : "Followers";
        const value = dataArr[Number(index)][1].statistics.followers;
        if (theme === "light") {
          await expect(
            card.getByText(`${dataArr[Number(index)][1].username}`),
          ).toBeVisible();
          await expect(card.getByText(`${followers}`)).toBeVisible();
          await expect(card.getByText(folOrSubs)).toBeVisible();
          await expect(
            card.getByText(`${Math.abs(value)} Today`),
          ).toBeVisible();
          await expect(card).toHaveCSS(
            "background-color",
            "rgb(240, 242, 250)",
          );
        } else {
          await expect(card).toHaveCSS("background-color", "rgb(37, 42, 65)");
        }
        await expect(card.getByText(`${Math.abs(value)} Today`)).toHaveCSS(
          "color",
          value > 0 ? "rgb(29, 180, 137)" : "rgb(220, 65, 76)",
        );
      }
    }
  });

  /** Test if the page has a 'Overview' section */
  test("has a 'Overview' section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Overview - Today" });
    const container = page.getByLabel("Overview - Today").locator(">div");
    await expect(heading).toBeVisible();
    await expect(container).toBeVisible();
    const cards = await container.locator(">div").all();
    const dataArr = Object.entries(data);
    const button = page.getByRole("switch", { name: "Dark Mode" });
    for (const theme of themes) {
      if (theme === "dark") {
        await button.click();
        await expect(heading).toHaveCSS("color", "rgb(255, 255, 255)");
      } else {
        await expect(heading).toHaveCSS("color", "rgb(99, 104, 126)");
      }
      for (const [index, card] of Object.entries(cards)) {
        const views =
          dataArr[Number(index)][1].views < 10000
            ? dataArr[Number(index)][1].views
            : `${Math.floor(dataArr[Number(index)][1].views / 1000)}k`;
        const likes = dataArr[Number(index)][1].likes;
        const viewstat = dataArr[Number(index)][1].statistics.views.value;
        const likestat = dataArr[Number(index)][1].statistics.likes.value;
        if (theme === "light") {
          await expect(card.getByText(`${views}`)).toBeVisible();
          await expect(
            card.getByText(
              `${dataArr[Number(index)][1].statistics.views.display}`,
            ),
          ).toBeVisible();
          await expect(card.getByText(`${Math.abs(viewstat)}%`)).toBeVisible();
          await expect(card.getByText(`${likes}`)).toBeVisible();
          await expect(
            card.getByText(
              `${dataArr[Number(index)][1].statistics.likes.display}`,
            ),
          ).toBeVisible();
          await expect(card.getByText(`${Math.abs(likestat)}%`)).toBeVisible();
          for (const c of await card.locator(">div").all()) {
            await expect(c).toHaveCSS("background-color", "rgb(240, 242, 250)");
          }
        } else {
          for (const c of await card.locator(">div").all()) {
            await expect(c).toHaveCSS("background-color", "rgb(37, 42, 65)");
          }
        }
        await expect(card.getByText(`${Math.abs(viewstat)}%`)).toHaveCSS(
          "color",
          viewstat > 0 ? "rgb(29, 180, 137)" : "rgb(220, 65, 76)",
        );
        await expect(card.getByText(`${Math.abs(likestat)}%`)).toHaveCSS(
          "color",
          likestat > 0 ? "rgb(29, 180, 137)" : "rgb(220, 65, 76)",
        );
      }
    }
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
