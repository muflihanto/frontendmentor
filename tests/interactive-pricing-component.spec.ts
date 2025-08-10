import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const priceList: { views: string; price: number }[] = [
  {
    views: "10K",
    price: 8,
  },
  {
    views: "50K",
    price: 12,
  },
  {
    views: "100K",
    price: 16,
  },
  {
    views: "500K",
    price: 24,
  },
  {
    views: "1M",
    price: 36,
  },
];

test.describe("FrontendMentor Challenge - Interactive pricing component Page", () => {
  /** Go to Interactive pricing component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-pricing-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive pricing component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Simple, traffic-based pricing",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Sign-up for our 30-day trial.No credit card required."),
    ).toBeVisible();
  });

  /** Test if the page has a correct main card */
  test.describe("has a main card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(3);
      await expect(card).toBeVisible();
    });
    test("all initial states visible", async ({ page }) => {
      const card = page.locator("div").nth(3);
      await expect(
        card.getByRole("heading", { name: "100K Pageviews" }),
      ).toBeVisible();
      await expect(card.getByText("$16.00/ month")).toBeVisible();
      const slider = card.getByRole("slider");
      await expect(slider).toBeVisible();
      await expect(slider).toHaveAccessibleName(
        "Adjust pageviews and cost per month",
      );
      await expect(slider).toHaveAttribute(
        "aria-valuetext",
        "Pageviews: 100K, Price: $16.00",
      );
      await expect(slider).toHaveAttribute("aria-valuemin", "10000");
      await expect(slider).toHaveAttribute("aria-valuemax", "1000000");
      await expect(slider).toHaveAttribute("aria-valuenow", "100000");
      expect(await slider.inputValue()).toEqual("3");
      const switchGroup = page.getByRole("group");
      await expect(switchGroup.getByText("Monthly Billing")).toBeVisible();
      await expect(
        switchGroup.getByLabel("Switch to yearly billing"),
      ).toBeVisible();
      await expect(
        switchGroup.getByLabel("Yearly Billing with 25 percent discount"),
      ).toBeVisible();
      await expect(
        card.getByText(
          "CheckUnlimited websitesCheck100% data ownershipCheckEmail reports",
        ),
      ).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Start my trial" }),
      ).toBeVisible();
    });
    test("monthly slider works", async ({ page }) => {
      const card = page.locator("div").nth(3);
      const slider = card.getByRole("slider");
      for (const [index, price] of Object.entries(priceList)) {
        await slider.fill(`${Number(index) + 1}`);
        await expect(
          card.getByRole("heading", { name: `${price.views} Pageviews` }),
        ).toBeVisible();
        await expect(card.getByText(`$${price.price}.00/ month`)).toBeVisible();
        await expect(slider).toHaveAttribute(
          "aria-valuenow",
          price.views.replace("K", "000").replace("M", "000000"),
        );
        await expect(slider).toHaveAttribute(
          "aria-valuetext",
          `Pageviews: ${price.views}, Price: $${price.price}.00`,
        );
      }
    });
    test("billing switch works", async ({ page }) => {
      const switchButton = page.getByRole("switch");
      await expect(switchButton).toBeVisible();
      await expect(switchButton).toHaveAttribute("aria-checked", "false");
      await expect(switchButton).toHaveAccessibleName(
        "Switch to yearly billing",
      );
      await switchButton.click();
      await expect(switchButton).toHaveAttribute("aria-checked", "true");
      await expect(switchButton).toHaveAccessibleName(
        "Switch to monthly billing",
      );
    });
    test("yearly slider works", async ({ page }) => {
      const card = page.locator("div").nth(3);
      const slider = card.getByRole("slider");
      const toggle = card.getByLabel("Switch to yearly billing");
      await toggle.click();
      for (const [index, price] of Object.entries(priceList)) {
        await slider.fill(`${Number(index) + 1}`);
        await expect(
          card.getByRole("heading", { name: `${price.views} Pageviews` }),
        ).toBeVisible();
        await expect(
          card.getByText(`$${0.75 * price.price}.00/ month`),
        ).toBeVisible();
        await expect(slider).toHaveAttribute(
          "aria-valuenow",
          price.views.replace("K", "000").replace("M", "000000"),
        );
        await expect(slider).toHaveAttribute(
          "aria-valuetext",
          `Pageviews: ${price.views}, Price: $${0.75 * price.price}.00`,
        );
      }
    });
    /** Test pointer interactions and other missing cases */
    test.describe("Pointer interactions and other tests", () => {
      test("toggle switch has hover state", async ({ page }) => {
        const toggle = page.getByRole("switch");
        await expect(toggle).toHaveCSS(
          "background-color",
          "rgb(205, 215, 238)",
        );
        await toggle.hover();
        await expect(toggle).toHaveCSS(
          "background-color",
          "rgb(165, 243, 235)",
        );
        // Switch to Yearly
        await toggle.click();
        await page.mouse.move(0, 0);
        await expect(toggle).toHaveCSS("background-color", "rgb(16, 213, 194)");
        await toggle.hover();
        await expect(toggle).toHaveCSS(
          "background-color",
          "rgb(165, 243, 235)",
        );
      });

      test("toggle switch has focus state", async ({ page }) => {
        const toggle = page.getByRole("switch");
        await expect(toggle).toHaveCSS("outline-style", "none");
        await toggle.focus();
        await expect(toggle).toHaveCSS("outline-style", "auto");
      });

      test("button has hover state", async ({ page }) => {
        const button = page.getByRole("button", { name: "Start my trial" });
        await expect(button).toHaveCSS("color", "rgba(205, 215, 238, 0.9)");
        await button.hover();
        await expect(button).toHaveCSS("color", "rgb(250, 251, 255)");
      });
    });
  });

  /** Test if the page has a correct footer */
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
