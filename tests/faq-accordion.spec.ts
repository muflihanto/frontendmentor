import { test, expect, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// TODO: add keyboard accessibility test case

const faqs = [
  {
    question: "What is Frontend Mentor, and how will it help me?",
    answer:
      "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
  },
  {
    question: "Is Frontend Mentor free?",
    answer:
      "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
  },
  {
    question: "Can I use Frontend Mentor projects in my portfolio?",
    answer:
      "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
  },
  {
    question: "How can I get help if I'm stuck on a Frontend Mentor challenge?",
    answer:
      "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.",
  },
];

test.describe("FrontendMentor Challenge - FAQ Accordion Page", () => {
  /** Go to FAQ Accordion page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/faq-accordion");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | FAQ Accordion");
  });

  /** Test if the page has a banner */
  test("has a banner", async ({ page }) => {
    await expect(page.getByRole("banner")).toBeVisible();
  });

  /** Test if the page has a correct faqs */
  test("has correct faqs", async ({ page }) => {
    for (const [index, faq] of Object.entries(faqs)) {
      const question = page
        .locator("details")
        .filter({ hasText: faq.question });
      const parent = page
        .locator("div:has(>details)")
        .filter({ has: question });
      const answer = parent.getByRole("region");
      await expect(question).toBeVisible();
      if (index === "0") {
        await expect(answer).toBeVisible();
      } else {
        await expect(answer).toBeHidden();
      }
    }
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "FAQs" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the accordion works */
  test("accordion should works", async ({ page }) => {
    const faqs = await page.locator("details").all();
    for (const [index, faq] of Object.entries(faqs)) {
      const id = await faq.getAttribute("id");
      const summary = faq.locator("summary");
      const answerId = id?.replace("question", "answer");
      const answer = page.locator(`id=${answerId}`);
      if (index === "0") {
        await expect(faq).toHaveAttribute("open", "");
        await expect(summary).toHaveAttribute("aria-expanded", "true");
        await expect(answer).toBeVisible();
        await faq.click();
        await expect(faq).not.toHaveAttribute("open");
        await expect(summary).toHaveAttribute("aria-expanded", "false");
        await expect(answer).not.toBeVisible();
      } else {
        await expect(faq).not.toHaveAttribute("open");
        await expect(summary).toHaveAttribute("aria-expanded", "false");
        await expect(answer).not.toBeVisible();
        await faq.click();
        await expect(faq).toHaveAttribute("open", "");
        await expect(summary).toHaveAttribute("aria-expanded", "true");
        await expect(answer).toBeVisible();
        await faq.click();
      }
    }
  });

  /** Test if the accordion keyboard navigation works */
  test("accordion keyboard navigation works", async ({ page }) => {
    // Test for initial focus state
    await page.keyboard.press("Tab");
    const firstFaq = page.locator("summary").first();
    await expect(firstFaq).toBeFocused();

    const faqs = await page.locator("summary").all();
    let faq: Locator;
    let nextFaq: Locator;
    let id: string | null;
    let answerId: string | undefined;
    let answer: Locator;
    for (let i = 0; i < faqs.length; i++) {
      faq = faqs[i];
      nextFaq = i !== faqs.length - 1 ? faqs[i + 1] : faqs[0];
      id = await page.locator("details").nth(i).getAttribute("id");
      answerId = id?.replace("question", "answer");
      answer = page.locator(`id=${answerId}`);
      // test arrows
      await faq.focus();
      await expect(faq).toBeFocused();
      await page.keyboard.press("ArrowDown");
      await expect(nextFaq).toBeFocused();
      await page.keyboard.press("ArrowUp");
      await expect(faq).toBeFocused();
      // test space and enter to toggle
      if (i === 0) {
        await expect(answer).toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "true");
        await page.keyboard.press("Space");
        await expect(answer).not.toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "false");
        await page.keyboard.press("Enter");
        await expect(answer).toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "true");
      } else {
        await expect(answer).not.toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "false");
        await page.keyboard.press("Space");
        await expect(answer).toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "true");
        await page.keyboard.press("Enter");
        await expect(answer).not.toBeVisible();
        await expect(faq).toHaveAttribute("aria-expanded", "false");
      }
      // test home/pageup and end/pagedown
      await faqs[2].focus();
      await expect(faqs[2]).toBeFocused();
      await page.keyboard.press("Home");
      await expect(faqs[0]).toBeFocused();
      await page.keyboard.press("End");
      await expect(faqs[faqs.length - 1]).toBeFocused();
      await page.keyboard.press("PageUp");
      await expect(faqs[0]).toBeFocused();
      await page.keyboard.press("PageDown");
      await expect(faqs[faqs.length - 1]).toBeFocused();
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
