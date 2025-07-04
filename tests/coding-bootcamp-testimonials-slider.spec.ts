import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const data = [
  {
    img: {
      src: "/coding-bootcamp-testimonials-slider/images/image-tanya.jpg",
      alt: "Tanya's Avatar",
    },
    testimony:
      "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    name: "Tanya Sinclair",
    occupation: "UX Engineer",
  },
  {
    img: {
      src: "/coding-bootcamp-testimonials-slider/images/image-john.jpg",
      alt: "John's Avatar",
    },
    testimony:
      "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”",
    name: "John Tarkpor",
    occupation: "Junior Front-end Developer",
  },
];

test.describe("FrontendMentor Challenge - Coding Bootcamp Testimonials Slider Page", () => {
  /** Go to Coding Bootcamp Testimonials Slider page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/coding-bootcamp-testimonials-slider");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Coding Bootcamp Testimonials Slider",
    );
  });

  /** Test if the page has an initial testimonial */
  test("has an initial testimonial", async ({ page }) => {
    const { name, occupation, testimony, img } = data[0];
    await expect(page.getByText(`${name}${occupation}`)).toBeVisible();
    await expect(page.getByText(testimony)).toBeVisible();
    await expect(page.getByRole("img", { name: img.alt })).toBeVisible();
  });

  /** Test if the page has hover effects on interactive elements */
  test("has hover effects on interactive elements", async ({ page }) => {
    const prev = page.getByRole("button", { name: "Previous" });
    const next = page.getByRole("button", { name: "Next" });
    await expect(prev.locator("svg")).toHaveCSS("color", "rgb(133, 133, 172)");
    await prev.hover();
    await expect(prev.locator("svg")).toHaveCSS("color", "rgb(74, 63, 219)");
    await expect(next.locator("svg")).toHaveCSS("color", "rgb(133, 133, 172)");
    await next.hover();
    await expect(next.locator("svg")).toHaveCSS("color", "rgb(74, 63, 219)");
  });

  /** Test if the testimonial slider works */
  test("testimonial slider works", async ({ page }) => {
    const prev = page.getByRole("button", { name: "Previous" });
    const next = page.getByRole("button", { name: "Next" });
    const testData = async ({
      name,
      occupation,
      testimony,
      img,
    }: (typeof data)[0]) => {
      await expect(page.getByText(`${name}${occupation}`)).toBeVisible();
      await expect(page.getByText(testimony)).toBeVisible();
      await expect(page.getByRole("img", { name: img.alt })).toBeVisible();
    };
    await testData(data[0]);
    await next.click();
    await page.waitForTimeout(100);
    await testData(data[1]);
    await prev.click();
    await page.waitForTimeout(100);
    await testData(data[0]);
  });

  /** Test keyboard navigation */
  test("can navigate with keyboard arrows", async ({ page }) => {
    await expect(page.getByText(data[0].name)).toBeVisible();

    // Press right arrow
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    await expect(page.getByText(data[1].name)).toBeVisible();

    // Press left arrow
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(100);
    await expect(page.getByText(data[0].name)).toBeVisible();
  });

  /** Test ARIA attributes */
  test("has proper ARIA attributes", async ({ page }) => {
    const slider = page.locator("#testimonials-slider");
    await expect(slider).toHaveAttribute("aria-roledescription", "carousel");

    const slides = page.locator("[aria-roledescription='slide']");
    await expect(slides).toHaveCount(1); // Only one slide visible at a time
    await expect(slides.first()).toHaveAttribute("aria-label", /1 of 2/);

    const buttons = page.getByRole("button", { name: /Slide/ });
    await expect(buttons).toHaveCount(2);
    for (const button of await buttons.all()) {
      await expect(button).toHaveAttribute("aria-controls", "slider-items");
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
