import { test, expect, type Locator } from "@playwright/test";

test.describe("FrontendMentor Challenge - Shortly URL shortening API Challenge Page", () => {
  /** Go to Shortly URL shortening API Challenge page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/url-shortening-api");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Shortly URL shortening API Challenge",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    const navs = ["Features", "Pricing", "Resources"];
    for (const nav of navs) {
      await expect(header.getByRole("link", { name: nav })).toBeVisible();
    }
    await expect(header.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });

  /** Test if the page has an Intro section */
  test("has an Intro section", async ({ page }) => {
    const section = page.locator("div").nth(10);
    await expect(
      section.getByRole("heading", { name: "More than just shorter links" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Build your brand’s recognition and get detailed insights on how your links are performing.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Illustration Working" }),
    ).toBeVisible();
  });

  /** Test if the page has a main form */
  test.describe("has a main form", () => {
    test.describe.configure({ mode: "serial" });
    let form: Locator;
    test("main form is visible", async ({ page }) => {
      form = page.locator("form");
      await form.scrollIntoViewIfNeeded();
      await expect(form).toBeVisible();
      await expect(
        form.getByPlaceholder("Shorten a link here..."),
      ).toBeVisible();
      await expect(
        form.getByRole("button", { name: "Shorten It!" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has an 'Advanced Statistics' section */
  test("has an 'Advanced Statistics' section", async ({ page }) => {
    const section = page.locator("div").nth(15);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Advanced Statistics" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Track how your links are performing across the web with our advanced statistics dashboard.",
      ),
    ).toBeVisible();
    const statisticFeatures = [
      {
        icon: "/url-shortening-api/images/icon-brand-recognition.svg",
        name: "Brand Recognition",
        description:
          "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
      },
      {
        icon: "/url-shortening-api/images/icon-detailed-records.svg",
        name: "Detailed Records",
        description:
          "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
      },
      {
        icon: "/url-shortening-api/images/icon-fully-customizable.svg",
        name: "Fully Customizable",
        description:
          "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
      },
    ];
    const featuresContaier = section.locator(">div").nth(1);
    for (const feature of statisticFeatures) {
      await expect(
        featuresContaier.getByRole("img", { name: `${feature.name} icon` }),
      ).toBeVisible();
      await expect(
        featuresContaier.getByRole("heading", { name: feature.name }),
      ).toBeVisible();
      await expect(
        featuresContaier.getByText(feature.description),
      ).toBeVisible();
    }
  });
});
