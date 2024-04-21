import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Bookmark landing Page", () => {
  /** Go to Bookmark landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/bookmark-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Bookmark landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img")).toBeVisible();
    const navLinks = ["Features", "Pricing", "Contact", "Login"] as const;
    for (const link of navLinks) {
      await expect(header.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has an Intro section */
  test("has an Intro section", async ({ page }) => {
    const section = page.locator("div").nth(4);
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: "Bookmark Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "A Simple Bookmark Manager",
      }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get it on Chrome" }),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get it on Firefox" }),
    ).toBeVisible();
  });

  /** Test if the page has a Features section */
  test.describe("has a Features section", () => {
    const features = [
      {
        name: "Simple Bookmarking",
        title: "Bookmark in one click",
        description:
          "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
      },
      {
        name: "Speedy Searching",
        title: "Intelligent search",
        description:
          "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
      },
      {
        name: "Easy Sharing",
        title: "Share your bookmarks",
        description:
          "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
      },
    ];
    test("has all initial elements", async ({ page }) => {
      const section = page.locator("div").nth(10);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
      await expect(
        section.getByRole("heading", { name: "Features" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go.",
        ),
      ).toBeVisible();
      const initialFeature = features[0];
      const tabs = section.locator("div").nth(1);
      for (const feature of features) {
        await expect(
          tabs.getByRole("button", { name: feature.name }),
        ).toBeVisible();
      }
      await expect(
        section.getByRole("img", { name: "Illustration Features Tab 1" }),
      ).toBeVisible();
      await expect(
        section.getByRole("heading", { name: initialFeature.title }),
      ).toBeVisible();
      await expect(section.getByText(initialFeature.description)).toBeVisible();
      await expect(
        section.getByRole("button", { name: "More Info" }),
      ).toBeVisible();
    });
    test("can change active feature tab", async ({ page }) => {
      const section = page.locator("div").nth(10);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
      const tabs = section.locator("div").nth(1);
      for (const [idx, tab] of Object.entries(
        await tabs.getByRole("button").all(),
      )) {
        const index = Number(idx);
        const activeFeature = features[index];
        await tab.click();
        await expect(
          section.getByRole("img", {
            name: `Illustration Features Tab ${index + 1}`,
          }),
        ).toBeVisible();
        await expect(
          section.getByRole("heading", { name: activeFeature.title }),
        ).toBeVisible();
        await expect(
          section.getByText(activeFeature.description),
        ).toBeVisible();
        await expect(
          section.getByRole("button", { name: "More Info" }),
        ).toBeVisible();
      }
    });
  });

  /** Test if the page has a 'Download the extension' section */
  test("has a 'Download the extension' section", async ({ page }) => {
    const section = page.locator("div").nth(19);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("heading", { name: "Download the extension" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize.",
      ),
    ).toBeVisible();
    const browsers = [
      {
        name: "Chrome",
        image: {
          size: "aspect-[102/100]",
          src: "/bookmark-landing-page/images/logo-chrome.svg",
        },
        minimum: "62",
      },
      {
        name: "Firefox",
        image: {
          size: "aspect-[105/100]",
          src: "/bookmark-landing-page/images/logo-firefox.svg",
        },
        minimum: "55",
      },
      {
        name: "Opera",
        image: {
          size: "aspect-[96/100]",
          src: "/bookmark-landing-page/images/logo-opera.svg",
        },
        minimum: "46",
      },
    ];
    const linksContainer = section.locator(">div");
    const links = await linksContainer.locator(">div").all();
    expect(links).toHaveLength(3);
    for (const [idx, browser] of Object.entries(browsers)) {
      const index = Number(idx);
      const link = links[index];
      await expect(link.getByRole("img", { name: browser.name })).toBeVisible();
      await expect(
        link.getByRole("heading", { name: `Add to ${browser.name}` }),
      ).toBeVisible();
      await expect(
        link.getByText(`Minimum version ${browser.minimum}`),
      ).toBeVisible();
      await expect(
        link.getByRole("button", { name: "Add & Install Extension" }),
      ).toBeVisible();
    }
  });

  /** Test if the page has a FAQs section */
  test.describe("has a FAQs section", () => {
    const faqs = [
      {
        question: "What is Bookmark?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
      },
      {
        question: "How can I request a new browser?",
        answer:
          "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.",
      },
      {
        question: "What about other Chromium browsers?",
        answer:
          "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
      },
    ];
    test("has all initial elements", async ({ page }) => {
      const section = page.locator("div").nth(27);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
      await expect(
        section.getByRole("heading", { name: "Frequently Asked Questions" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us.",
        ),
      ).toBeVisible();
      const accordion = section.locator("div").nth(0);
      for (const faq of faqs) {
        await expect(
          accordion.getByRole("button", { name: faq.question }),
        ).toBeVisible();
        await expect(accordion.getByText(faq.answer)).not.toBeVisible();
      }
      await expect(
        section.getByRole("button", { name: "More Info" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a 'Stay up-to-date' section */
  test("has a 'Stay up-to-date' section", async ({ page }) => {
    const section = page.getByText(
      "35,000+ already joinedStay up-to-date with what we’re doingContact Us",
    );
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("heading", { name: "35,000+ already joined" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Stay up-to-date with what we’re doing",
      }),
    ).toBeVisible();
    const form = section.locator("form");
    await expect(
      form.getByPlaceholder("Enter your email address"),
    ).toBeVisible();
    await expect(
      form.getByRole("button", { name: "Contact Us" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer).toBeInViewport();
    await expect(footer.locator(">svg")).toBeVisible();
    const navLinks = ["Features", "Pricing", "Contact"] as const;
    for (const link of navLinks) {
      await expect(footer.getByRole("link", { name: link })).toBeVisible();
    }
    const sns = await footer.locator("div").getByRole("link").all();
    expect(sns).toHaveLength(2);
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
