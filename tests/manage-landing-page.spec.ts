import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Manage landing Page", () => {
  /** Go to Manage landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/manage-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Manage landing page");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img")).toBeVisible();
    const navs = ["Pricing", "Product", "About Us", "Careers", "Community"];
    const navEl = header.locator("div").first();
    for (const nav of navs) {
      await expect(navEl.getByRole("link", { name: nav })).toBeVisible();
    }
    await expect(
      header.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has an intro section */
  test("has an intro section", async ({ page }) => {
    const section = page.locator("div").nth(7);
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await expect(section).toBeVisible();
    await expect(
      grid1.getByRole("img", { name: "Intro Illustration" }),
    ).toBeVisible();
    await expect(
      grid2.getByRole("heading", {
        name: "Bring everyone together to build better products.",
      }),
    ).toBeVisible();
    await expect(
      grid2.getByText(
        "Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.",
      ),
    ).toBeVisible();
    await expect(
      grid2.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Selling Point' section */
  test("has a 'Selling Point' section", async ({ page }) => {
    const sellingPoints = [
      {
        idx: "01",
        title: "Track company-wide progress",
        desc: "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
      },
      {
        idx: "02",
        title: "Advanced built-in reports",
        desc: "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
      },
      {
        idx: "03",
        title: "Everything you need in one place",
        desc: "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
      },
    ];
    const section = page.locator("div").nth(10);
    const grid1 = section.locator(">div").first();
    const grid2 = section.locator(">div").nth(1);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      grid1.getByRole("heading", { name: "What’s different about Manage?" }),
    ).toBeVisible();
    await expect(
      grid1.getByText(
        "Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.",
      ),
    ).toBeVisible();
    for (const point of sellingPoints) {
      await expect(grid2.getByText(point.idx)).toBeVisible();
      await expect(
        grid2.getByRole("heading", { name: point.title }),
      ).toBeVisible();
      await expect(grid2.getByText(point.desc)).toBeVisible();
    }
  });

  /** Test if the page has a 'What they’ve said' section */
  test("has a 'What they’ve said' section", async ({ page }) => {
    const section = page.locator("div").nth(16);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "What they’ve said" }),
    ).toBeVisible();
    const testimonialsContainer = section.locator(">div");
    expect(await testimonialsContainer.locator(">div>div").all()).toHaveLength(
      4,
    );
    await expect(
      section.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has a 'Simplify' section */
  test("has a 'Simplify' section", async ({ page }) => {
    const section = page.locator("div").nth(28);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", {
        name: "Simplify how your team works today.",
      }),
    ).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get Started" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const navLinks = [
      "Home",
      "Pricing",
      "Products",
      "About Us",
      "Careers",
      "Community",
      "Privacy Policy",
    ];
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.locator(">div>svg")).toBeVisible();
    const snsContainer = footer.locator(">div").first();
    expect(await snsContainer.getByRole("link").all()).toHaveLength(5);
    const nav = footer.getByRole("navigation");
    for (const link of navLinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
    const form = footer.locator("form");
    await expect(form.getByPlaceholder("Updates in your inbox…")).toBeVisible();
    await expect(form.getByRole("button", { name: "Go" })).toBeVisible();
    await expect(
      footer.getByText("Copyright 2020. All Rights Reserved"),
    ).toBeVisible();
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
