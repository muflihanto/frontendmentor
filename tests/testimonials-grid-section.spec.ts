import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const testimonials = [
  {
    avatar: "/testimonials-grid-section/images/image-daniel.jpg",
    name: "Daniel Clifford",
    title: "Verified Graduate",
    highlight:
      "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny’s worth.",
    testimony:
      "“ I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the  best - and most grueling - time of my life. Since completing the course, I’ve successfully switched careers, working as a Software Engineer at a VR startup. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-jonathan.jpg",
    name: "Jonathan Walters",
    title: "Verified Graduate",
    highlight: "The team was very supportive and kept me motivated",
    testimony:
      "“ I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I’ve made in myself. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-jeanette.jpg",
    name: "Jeanette Harmon",
    title: "Verified Graduate",
    highlight: "An overall wonderful and rewarding experience",
    testimony:
      "“ Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-patrick.jpg",
    name: "Patrick Abrams",
    title: "Verified Graduate",
    highlight:
      "Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.",
    testimony:
      "“ The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-kira.jpg",
    name: "Kira Whittle",
    title: "Verified Graduate",
    highlight: "Such a life-changing experience. Highly recommended!",
    testimony:
      "“ Before joining the bootcamp, I’ve never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I’ve often referred to it during interviews as an example of my developent experience. It certainly helped me land a job as a full-stack developer after receiving multiple offers. 100% recommend! ”",
  },
];

test.describe("FrontendMentor Challenge - Testimonials Grid Section Page", () => {
  /** Go to Testimonials Grid Section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/testimonials-grid-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Testimonials Grid Section",
    );
  });

  /** Test if the page has a main section */
  test.describe("has a main section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section")).toBeVisible();
      await expect(page.locator("section")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section");
      for (const { name, title, highlight, testimony } of testimonials) {
        const heading = page.getByRole("heading", { name });
        await expect(heading).toBeVisible();
        const article = section.getByRole("article").filter({ has: heading });
        await expect(article).toBeVisible();
        await expect(
          article.getByRole("img", { name: `${name}\'s Avatar` }),
        ).toBeVisible();
        await expect(article.getByText(title)).toBeVisible();
        await expect(article.getByText(highlight)).toBeVisible();
        await expect(article.getByText(testimony)).toBeVisible();
      }
    });
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
