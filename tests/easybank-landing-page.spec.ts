import { test, expect } from "@playwright/test";

const navs = ["Home", "About", "Contact", "Blog", "Careers"];

test.describe("FrontendMentor Challenge - Easybank landing Page", () => {
  /** Go to Easybank landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/easybank-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Easybank landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.locator("div").nth(2);
    await expect(header.getByRole("img")).toBeVisible();
    for (const nav of navs) {
      await expect(header.getByRole("link", { name: nav })).toBeVisible();
    }
    await expect(
      header.getByRole("button", { name: "Request Invite" }),
    ).toBeVisible();
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "Next generation digital banking",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Take your financial life online. Your Easybank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Request Invite" }),
    ).toBeVisible();
    await expect(section.getByRole("img", { name: "Mockup" })).toBeVisible();
  });

  /** Test if the page has a 'Why Easybank?' section */
  test("has a 'Why Easybank?' section", async ({ page }) => {
    const features = [
      {
        icon: "online",
        heading: "Online Banking",
        description:
          "Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.",
      },
      {
        icon: "budgeting",
        heading: "Simple Budgeting",
        description:
          "See exactly where your money goes each month. Receive notifications when you’re close to hitting your limits.",
      },
      {
        icon: "onboarding",
        heading: "Fast Onboarding",
        description:
          "We don’t do branches. Open your account in minutes online and start taking control of your finances right away.",
      },
      {
        icon: "api",
        heading: "Open API",
        description:
          "Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.",
      },
    ] as const;
    const section = page.locator("div").nth(9);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Why choose Easybank?" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "We leverage Open Banking to turn your bank account into your financial hub. Control your finances like never before.",
      ),
    ).toBeVisible();
    const featureLocators = await section.locator(">div>div").all();
    expect(featureLocators).toHaveLength(4);
    for (const [index, feature] of Object.entries(features)) {
      const indexNum = Number(index);
      const locator = featureLocators[indexNum];
      await expect(locator.locator("svg")).toBeVisible();
      await expect(
        locator.getByRole("heading", { name: feature.heading }),
      ).toBeVisible();
      await expect(locator.getByText(feature.description)).toBeVisible();
    }
  });
});
