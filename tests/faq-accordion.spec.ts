import { test, expect } from "@playwright/test";

// TODO: add accordion toggle test case

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
});
