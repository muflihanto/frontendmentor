import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const prices = {
  basic: {
    storage: "500 GB",
    users: 2,
    bandwith: "3 GB",
    price: {
      annually: 199.99,
      monthly: 19.99,
    },
  },
  professional: {
    storage: "1 TB",
    users: 5,
    bandwith: "10 GB",
    price: {
      annually: 249.99,
      monthly: 24.99,
    },
  },
  master: {
    storage: "2 TB",
    users: 10,
    bandwith: "20 GB",
    price: {
      annually: 399.99,
      monthly: 39.99,
    },
  },
};

test.describe("FrontendMentor Challenge - Pricing component with toggle Page", () => {
  /** Go to Pricing component with toggle page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/pricing-component-with-toggle");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor - Pricing component with toggle",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Our Pricing" }),
    ).toBeVisible();
  });

  /** Test if the page has a toggle group */
  test("has a toggle group", async ({ page }) => {
    const container = page.getByText("AnnuallyMonthly");
    await expect(container.getByText("Annually")).toBeVisible();
    const toggle = container.getByRole("button");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveCSS("opacity", "1");
    await toggle.hover();
    await expect(toggle).toHaveCSS("opacity", "0.5");
    await expect(container.getByText("Monthly")).toBeVisible();
  });

  /** Test if the page has all cards */
  test.describe("has all cards", () => {
    const payments = ["annually", "monthly"] as const;
    for (const payment of payments) {
      for (const [plan, detail] of Object.entries(prices)) {
        test(`has a ${payment} ${plan} card`, async ({ page }) => {
          const toggle = page.getByRole("button", {
            name: /Switch to (monthly|annually) billing/i,
          });
          await expect(toggle).toHaveAttribute("aria-pressed", "false");
          if (payment === "monthly") {
            await toggle.click();
            await expect(toggle).toHaveAttribute("aria-pressed", "true");
          }
          const card = page.getByLabel(plan, { exact: true });
          await expect(card).toBeVisible();
          await expect(card.getByText(plan, { exact: true })).toBeVisible();
          await expect(
            card.getByText(`$${detail.price[payment]}`),
          ).toBeVisible();
          await expect(
            card.getByText(`${detail.storage} Storage`),
          ).toBeVisible();
          await expect(
            card.getByText(`${detail.users} Users Allowed`),
          ).toBeVisible();
          await expect(
            card.getByText(`Send up to ${detail.bandwith}`),
          ).toBeVisible();

          const learnMoreLink = card.getByRole("link", {
            name: /Learn more about the .* plan/i,
          });
          await expect(learnMoreLink).toBeVisible();
          await expect(learnMoreLink).toHaveText("Learn More");
          // Hover states
          if (plan === "professional") {
            await expect(learnMoreLink).toHaveCSS(
              "background-color",
              "rgb(255, 255, 255)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "border-color",
              "rgb(229, 231, 235)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "color",
              "rgb(105, 111, 221)",
            );
          } else {
            await expect(learnMoreLink).toHaveCSS(
              "background-image",
              "linear-gradient(to right, rgb(163, 168, 240), rgb(105, 111, 221))",
            );
            await expect(learnMoreLink).toHaveCSS("border-width", "0px");
            await expect(learnMoreLink).toHaveCSS(
              "border-color",
              "rgb(229, 231, 235)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "color",
              "rgb(246, 246, 254)",
            );
          }
          await learnMoreLink.hover();
          if (plan === "professional") {
            await expect(learnMoreLink).toHaveCSS(
              "background-color",
              "rgba(0, 0, 0, 0)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "border-color",
              "rgba(246, 246, 254, 0.5)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "color",
              "rgb(246, 246, 254)",
            );
          } else {
            await expect(learnMoreLink).toHaveCSS(
              "background-image",
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
            );
            await expect(learnMoreLink).toHaveCSS("border-width", "2px");
            await expect(learnMoreLink).toHaveCSS(
              "border-color",
              "rgb(163, 168, 240)",
            );
            await expect(learnMoreLink).toHaveCSS(
              "color",
              "rgb(105, 111, 221)",
            );
          }
        });
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
