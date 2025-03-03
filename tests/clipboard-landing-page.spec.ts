import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Clipboard landing Page", () => {
  /** Go to Clipboard landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/clipboard-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Clipboard landing page");
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main).toBeVisible();
    await expect(main).toBeInViewport();
    await expect(main.getByRole("img")).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "A history of everything you copy",
      }),
    ).toBeVisible();
    await expect(
      main.getByText(
        "Clipboard allows you to track and organize everything you copy. Instantly access your clipboard on all your devices.",
      ),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for iOS" }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for Mac" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Snippet' section */
  test("has a 'Snippet' section", async ({ page }) => {
    const section = page.locator("section").first();
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Keep track of your snippets" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Clipboard instantly stores any item you copy in the cloud, meaning you can access your snippets immediately on all your devices. Our Mac and iOS apps will help you organize everything.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Computer Illustration" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Quick Search" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Easily search your snippets by content, category, web address, application, and more.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "iCloud Sync" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Instantly saves and syncs snippets across all your devices.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Complete History" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Retrieve any snippets from the first moment you started using the app.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has an 'Access Anywhere' section */
  test("has an 'Access Anywhere' section", async ({ page }) => {
    const section = page.locator("section").nth(1);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Access Clipboard Anywhere" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        "Whether you’re on the go, or at your computer, you can access all your Clipboard snippets in a few simple clicks.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Devices Illustration" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Supercharge' section */
  test("has a 'Supercharge' section", async ({ page }) => {
    const section = page.locator("section").nth(2);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Supercharge your workflow" }),
    ).toBeVisible();
    await expect(
      section.getByText("We’ve got the tools to boost your productivity."),
    ).toBeVisible();
    const features = [
      {
        icon: "Icon Blacklist",
        heading: "Create blacklists",
        text: "Ensure sensitive information never makes its way to your clipboard by excluding certain sources.",
      },
      {
        icon: "Icon Text",
        heading: "Plain text snippets",
        text: "Remove unwanted formatting from copied text for a consistent look.",
      },
      {
        icon: "Icon Preview",
        heading: "Sneak preview",
        text: "Quick preview of all snippets on your Clipboard for easy access.",
      },
    ];
    for (const { icon, heading, text } of features) {
      await expect(section.getByRole("img", { name: icon })).toBeVisible();
      await expect(
        section.getByRole("heading", { name: heading }),
      ).toBeVisible();
      await expect(section.getByText(text)).toBeVisible();
    }
  });

  /** Test if the page has a 'Clients' section */
  test("has a 'Clients' section", async ({ page }) => {
    const section = page.locator("div").nth(12);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    const clients = ["Google", "IBM", "Microsoft", "HP", "Vector Graphics"];
    for (const client of clients) {
      await expect(
        section.getByRole("img", { name: `${client} Logo` }),
      ).toBeVisible();
    }
  });

  /** Test if the page has an 'Available on' section */
  test("has an 'Available on' section", async ({ page }) => {
    const section = page.locator("section").nth(3);
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("heading", { name: "Clipboard for iOS and Mac OS" }),
    ).toBeVisible();
    await expect(
      section.getByText(
        " Available for free on the App Store. Download for Mac or iOS, sync with iCloud and you’re ready to start adding to your clipboard.",
      ),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Download for iOS" }),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Download for Mac" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(
      footer.getByRole("img", { name: "Clipboard Company Logo" }),
    ).toBeVisible();
    const navLinks = [
      "FAQs",
      "Contact Us",
      "Privacy Policy",
      "Press Kit",
      "Install Guide",
    ];
    for (const link of navLinks) {
      await expect(footer.getByRole("link", { name: link })).toBeVisible();
    }
    const socials = await footer.locator("div").nth(1).getByRole("img").all();
    expect(socials).toHaveLength(3);
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
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
