import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - FAQ Accordion Card Page", () => {
  /** Go to FAQ Accordion Card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/faq-accordion-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | FAQ Accordion Card");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "FAQ",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct illustration */
  test("has an illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Woman Online" }),
    ).toBeVisible();
  });

  /** Test if the page has all faqs */
  test("has faqs", async ({ page }) => {
    const faqs = await page.locator("main>div>div:not(:last-child)").all();
    expect(faqs).toHaveLength(5);
    for (const faq of faqs) {
      await expect(faq).toBeAttached();
    }
  });

  /** Test if the accordion works */
  test("accordion should works", async ({ page }) => {
    const faqs = await page.locator("main>div>div:not(:last-child)").all();
    for (const faq of faqs) {
      const toggle_button = faq.getByRole("button");
      const current_state = await faq.getAttribute("data-headlessui-state");
      await toggle_button.click();
      const next_state = await faq.getAttribute("data-headlessui-state");
      const controlledElem = faq.locator(
        `id=${await toggle_button.getAttribute("aria-controls")}`,
      );
      if (current_state === "") {
        expect(next_state).toStrictEqual("open");
        await expect(toggle_button).toHaveAttribute("aria-expanded", "true");
        await expect(toggle_button).toHaveAttribute(
          "data-headlessui-state",
          "open",
        );
        await expect(toggle_button).toHaveAttribute("aria-controls");
        await expect(controlledElem).toBeVisible();
      } else {
        expect(next_state).toStrictEqual("");
        await expect(toggle_button).toHaveAttribute("aria-expanded", "false");
        await expect(toggle_button).toHaveAttribute(
          "data-headlessui-state",
          "",
        );
        await expect(toggle_button).not.toHaveAttribute("aria-controls");
        await expect(controlledElem).not.toBeVisible();
      }
    }
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
