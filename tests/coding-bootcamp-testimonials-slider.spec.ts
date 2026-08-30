import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
    await expect(page.getByTestId("author-name")).toHaveText(name);
    await expect(page.getByTestId("author-occupation")).toHaveText(occupation);
    await expect(page.getByTestId("testimony-text")).toHaveText(testimony);
    await expect(page.getByRole("img", { name: img.alt })).toBeVisible();
    await expect(page.getByTestId("avatar-container")).toBeVisible();
    await expect(page.getByTestId("testimony-container")).toBeVisible();
  });

  /** Test if the page has hover effects on interactive elements */
  test("has hover effects on interactive elements", async ({ page }) => {
    const prev = page.getByTestId("prev-button");
    const next = page.getByTestId("next-button");
    const prevSvg = prev.locator("svg");
    const nextSvg = next.locator("svg");
    const defaultPrevColor = await prevSvg.evaluate(
      (el) => getComputedStyle(el).color,
    );
    const defaultNextColor = await nextSvg.evaluate(
      (el) => getComputedStyle(el).color,
    );
    await prev.hover();
    await expect
      .poll(async () => prevSvg.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultPrevColor);
    await next.hover();
    await expect
      .poll(async () => nextSvg.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultNextColor);
  });

  /** Test if the testimonial slider works */
  test("testimonial slider works", async ({ page }) => {
    const prev = page.getByTestId("prev-button");
    const next = page.getByTestId("next-button");
    const testData = async ({
      name,
      occupation,
      testimony,
      img,
    }: (typeof data)[0]) => {
      await expect(page.getByTestId("author-name")).toHaveText(name);
      await expect(page.getByTestId("author-occupation")).toHaveText(
        occupation,
      );
      await expect(page.getByTestId("testimony-text")).toHaveText(testimony);
      await expect(page.getByRole("img", { name: img.alt })).toBeVisible();
    };
    await testData(data[0]);
    await next.click();
    await testData(data[1]);
    await prev.click();
    await testData(data[0]);
  });

  /** Test keyboard navigation */
  test("can navigate with keyboard arrows", async ({ page }) => {
    await expect(page.getByTestId("author-name")).toHaveText(data[0].name);

    // Press right arrow – ensure body has focus for key listener on document.body
    await page.getByTestId("slider-container").click();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("author-name")).toHaveText(data[1].name);

    // Press left arrow
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByTestId("author-name")).toHaveText(data[0].name);
  });

  /** Test ARIA attributes */
  test("has proper ARIA attributes", async ({ page }) => {
    const slider = page.getByTestId("slider-container");
    await expect(slider).toHaveAttribute("aria-roledescription", "carousel");

    const slides = page.getByTestId("testimony-container");
    await expect(slides).toHaveCount(1); // Only one slide visible at a time
    await expect(slides.first()).toHaveAttribute("aria-label", "1 of 2");

    // Verify aria-label updates when slide changes
    const next = page.getByTestId("next-button");
    await next.click();
    await expect(slides.first()).toHaveAttribute("aria-label", "2 of 2");

    const prev = page.getByTestId("prev-button");
    await prev.click();
    await expect(slides.first()).toHaveAttribute("aria-label", "1 of 2");

    const sliderButtons = page.getByTestId("slider-buttons");
    await expect(sliderButtons).toBeVisible();
    const buttons = page.getByTestId("slider-container").getByRole("button");
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
