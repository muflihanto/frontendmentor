import { test, expect, type Locator } from "@playwright/test";
import supportType from "../components/crowdfunding-product-page/supportType.json";

test.describe("FrontendMentor Challenge - Crowdfunding product Page", () => {
  /** Go to Crowdfunding product page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/crowdfunding-product-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Crowdfunding product page",
    );
  });

  /** Test if the page has a top navigation bar inside a header */
  test.describe("has a page header header", () => {
    test("header is visible and in viewport", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toBeVisible();
      await expect(header).toBeInViewport();
    });
    test("crowdfund logo is visible and in viewport", async ({ page }) => {
      const logo = page
        .locator("header")
        .getByRole("img", { name: "Crowdfunding Logo" });
      await expect(logo).toBeVisible();
      await expect(logo).toBeInViewport();
    });
    test("navigation is visible and in viewport", async ({ page }) => {
      const navbar = page.locator("header").getByRole("navigation");
      await expect(navbar).toBeVisible();
      await expect(navbar).toBeInViewport();
      const links = ["About", "Discover", "Get Started"];
      for (const link of links) {
        await expect(navbar.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  /** Test if the page has an 'Overview' card */
  test.describe("has an 'Overview' card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(6);
      await expect(card).toBeVisible();
    });
    test("card has all elements", async ({ page }) => {
      const card = page.locator("div").nth(6);
      await expect(
        card.getByRole("img", { name: "Mastercraft Brand Logo" }),
      ).toBeVisible();
      await expect(
        card.getByRole("heading", {
          level: 1,
          name: "Mastercraft Bamboo Monitor Riser",
        }),
      ).toBeVisible();
      await expect(
        card.getByText(
          "A beautifully & handcrafted monitor stand to reduce neck and eye strain.",
        ),
      ).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Back this project" }),
      ).toBeVisible();
      await expect(card.getByLabel("Toggle Bookmark")).toBeVisible();
    });
    test("'Back this project' button works", async ({ page }) => {
      const button = page.getByRole("button", { name: "Back this project" });
      await expect(button).toBeVisible();
      await button.click();
      await page.waitForTimeout(1000);
      const modal = page
        .locator("div")
        .filter({
          hasText: "Back this projectWant to",
        })
        .nth(1);
      await expect(modal).toBeVisible();
      await expect(modal).toBeInViewport();
    });
    test("focusTrap works", async ({ page }) => {
      const button = page.getByRole("button", { name: "Back this project" });
      await expect(button).toBeVisible();
      await button.click();
      await page.waitForTimeout(1000);
      await page.keyboard.press("Tab");
      const firstOption = page.locator("input").first();
      await expect(firstOption).toBeFocused();
      await page.locator("label").first().click();
      const continueButton = page.getByRole("button", { name: "Continue" });
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(1000);
      const thankYouCard = page.getByText("Thanks for your support!Your");
      await expect(thankYouCard).toBeVisible();
      const gotItButton = thankYouCard.getByRole("button", { name: "Got it!" });
      await page.keyboard.press("Tab");
      await expect(gotItButton).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(thankYouCard).not.toBeVisible();
      await expect(gotItButton).not.toBeVisible();
    });
    test("'Back this project' modal has all elements", async ({ page }) => {
      await page.getByRole("button", { name: "Back this project" }).click();
      const modal = page
        .locator("div")
        .filter({
          hasText: "Back this projectWant to",
        })
        .nth(1);
      await expect(modal).toBeVisible();
      await expect(modal).toBeInViewport();
      await expect(
        modal.getByRole("heading", { name: "Back this project" }),
      ).toBeVisible();
      await expect(modal.getByLabel("Close 'Back this project'")).toBeVisible();
      await expect(
        modal.getByText(
          "Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?",
        ),
      ).toBeVisible();
      const form = modal.locator("form");
      expect(await form.locator(">div").all()).toHaveLength(supportType.length);
    });
    test("Modal form works", async ({ page }) => {
      await page.getByRole("button", { name: "Back this project" }).click();
      const modal = page
        .locator("div")
        .filter({
          hasText: "Back this projectWant to",
        })
        .nth(1);
      const form = modal.locator("form");
      const optionElements = await form.locator(">div").all();
      for (const [idx, option] of Object.entries(supportType)) {
        const index = Number(idx);
        const elem = optionElements[index];
        await elem.scrollIntoViewIfNeeded();
        let heading: Locator;
        if (!Object.hasOwn(option, "stock") || option.stock === undefined) {
          heading = elem.getByRole("heading", {
            name: "Pledge with no reward",
          });
          await expect(heading).toBeVisible();
        } else {
          heading = elem.getByRole("heading", { name: option.name });
          await expect(heading).toBeVisible();
          await expect(elem.getByText(`${option.stock}left`)).toBeVisible();
        }
        if (option.stock === undefined || option.stock > 0) {
          const input = elem.locator(`input#reward${index}`);
          await expect(input).not.toBeChecked();
          await heading.click();
          await expect(input).toBeChecked();
          // pledge assertions
          const pledge = elem.locator("id=pledge");
          const newVal = option.startsFrom - 5;
          await expect(elem.getByText("Enter your pledge")).toBeVisible();
          await expect(pledge).toBeVisible();
          await expect(pledge).toHaveValue(
            `${option.startsFrom > 0 ? option.startsFrom : 1}`,
          );
          await pledge.fill(`${newVal}`);
          await expect(pledge).toHaveValue(`${newVal}`);
          const continueButton = elem.getByRole("button", { name: "Continue" });
          await expect(continueButton).toBeVisible();
          await continueButton.click();
          await expect(elem.locator("#pledge:invalid")).toBeVisible();
        }
        await expect(elem.getByText(option.details)).toBeVisible();
        if (option.startsFrom > 0) {
          await expect(
            elem.getByText(`Pledge $${option.startsFrom} or more`),
          ).toBeVisible();
        }
      }
    });
    test("Show 'Success Card' after submit", async ({ page }) => {
      await page.getByRole("button", { name: "Back this project" }).click();
      const modal = page
        .locator("div")
        .filter({
          hasText: "Back this projectWant to",
        })
        .nth(1);
      const form = modal.locator("form");
      const secondOption = form.locator(">div").nth(1);
      await secondOption.scrollIntoViewIfNeeded();
      await secondOption.getByRole("heading").click();
      const continueButton = secondOption.getByRole("button", {
        name: "Continue",
      });
      await continueButton.click();
      const thankYouCard = page.getByText("Thanks for your support!Your");
      const gotItButton = thankYouCard.getByRole("button", { name: "Got it!" });
      await expect(thankYouCard).toBeVisible();
      await expect(
        thankYouCard.getByRole("img", { name: "Check" }),
      ).toBeVisible();
      await expect(
        thankYouCard.getByRole("heading", { name: "Thanks for your support!" }),
      ).toBeVisible();
      await expect(
        thankYouCard.getByText("Your pledge brings us one"),
      ).toBeVisible();
      await expect(gotItButton).toBeVisible();
      await gotItButton.click();
      await expect(thankYouCard).not.toBeVisible();
    });
    test("'Bookmark' button works", async ({ page }) => {
      const card = page.locator("div").nth(6);
      const button = card.getByLabel("Toggle Bookmark");
      await page.waitForLoadState("load");
      const text = button.locator("span");
      const icon = button.locator("svg");
      // not pressed
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS(
        "background-color",
        "rgba(122, 122, 122, 0.1)",
      );
      await expect(text).toHaveCSS("color", "rgb(122, 122, 122)");
      await expect(icon).toHaveCSS("color", "rgb(177, 177, 177)");
      await expect(icon).toHaveCSS("fill", "rgb(47, 47, 47)");
      await button.click();
      // pressed
      await expect(button).toHaveCSS(
        "background-color",
        "rgba(60, 180, 172, 0.07)",
      );
      await expect(text).toHaveCSS("color", "rgb(60, 180, 172)");
      await expect(icon).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(icon).toHaveCSS("fill", "rgb(60, 180, 172)");
      await button.click();
      // not pressed
      await expect(button).toHaveCSS(
        "background-color",
        "rgba(122, 122, 122, 0.1)",
      );
      await expect(text).toHaveCSS("color", "rgb(122, 122, 122)");
      await expect(icon).toHaveCSS("color", "rgb(177, 177, 177)");
      await expect(icon).toHaveCSS("fill", "rgb(122, 122, 122)");
    });
  });

  /** Test if the page has a 'Statistic' card */
  test.describe("has a 'Statistic' card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(10);
      await expect(card).toBeVisible();
    });
    test("card has all elements", async ({ page }) => {
      const statisticData = [
        {
          h: "$89,914",
          p: "of $100,000 backed",
        },
        {
          h: "5,007",
          p: "total backers",
        },
        {
          h: "56",
          p: "days left",
        },
      ];
      const card = page.locator("div").nth(10);
      await card.scrollIntoViewIfNeeded();
      for (const stat of statisticData) {
        await expect(card.getByRole("heading", { name: stat.h })).toBeVisible();
        await expect(card.getByText(stat.p)).toBeVisible();
      }
    });
  });

  /** Test if the page has an 'About' card */
  test.describe("has an 'About' card", () => {
    test("card is visible", async ({ page }) => {
      const card = page.locator("div").nth(20);
      await expect(card).toBeVisible();
    });
    test("card has all elements", async ({ page }) => {
      const card = page.locator("div").nth(20);
      await card.scrollIntoViewIfNeeded();
      await expect(
        card.getByRole("heading", { name: "About this project" }),
      ).toBeVisible();
      await expect(
        card.getByText(
          "The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.",
        ),
      ).toBeVisible();
      await expect(
        card.getByText(
          "Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.",
        ),
      ).toBeVisible();
      for (const support of supportType) {
        if (!Object.hasOwn(support, "stock") || support.stock === undefined)
          continue;
        const { details, name, startsFrom, stock } = support;
        const container = card.getByText(
          `${name}Pledge $${startsFrom} or more${details}`,
        );
        await expect(container).toBeVisible();
        await expect(container.getByText(`${stock}left`)).toBeVisible();
        if (stock !== 0) {
          await expect(
            container.getByRole("button", { name: "Select Reward" }),
          ).toBeVisible();
        } else {
          const button = container.getByRole("button", {
            name: "Out of Stock",
          });
          await expect(button).toBeVisible();
          await expect(button).toBeDisabled();
        }
      }
    });
    test("'Select Reward' buttons work", async ({ page }) => {
      const card = page.locator("div").nth(20);
      await card.scrollIntoViewIfNeeded();
      const buttons = card.getByRole("button", { name: "Select Reward" });
      const closeModalButton = page.getByLabel("Close 'Back this project'");
      const modalHeading = page.getByRole("heading", {
        name: "Back this project",
      });
      // button 1
      await buttons.nth(0).click();
      await expect(modalHeading).toBeVisible();
      await expect(page.locator("#reward1")).toBeChecked();
      await expect(closeModalButton).toBeVisible();
      await closeModalButton.click();
      await expect(modalHeading).not.toBeVisible();
      // button 2
      await buttons.nth(1).click();
      await expect(modalHeading).toBeVisible();
      await expect(page.locator("#reward2")).toBeChecked();
      await closeModalButton.click();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
