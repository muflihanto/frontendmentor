import { test, expect } from "@playwright/test";

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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
