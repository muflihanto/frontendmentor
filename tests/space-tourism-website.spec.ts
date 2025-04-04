import { test, expect } from "@playwright/test";
import _data from "../components/space-tourism-website/data.json";
import AxeBuilder from "@axe-core/playwright";

const pages = ["home", "destination", "crew", "technology"] as const;

test.describe("FrontendMentor Challenge - Space Tourism Website Home Page", () => {
  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Home");
  });

  testHeader("home");
  testA11y();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const section = page.locator("main");
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("heading", { name: "So, you want to travel to" }),
    ).toBeVisible();
    await expect(section.getByRole("heading", { name: "Space" })).toBeVisible();
    await expect(
      section.getByText(
        "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!",
      ),
    ).toBeVisible();
    await expect(section.getByRole("link", { name: "Explore" })).toBeVisible();
  });
});

test.describe("FrontendMentor Challenge - Space Tourism Website Destination Page", () => {
  const destinations = _data.destinations;

  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website/destination");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Destination");
  });

  testHeader("destination");
  testA11y();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "01Pick your destination" }),
    ).toBeVisible();
    const section = page.getByRole("tabpanel");
    const firstDestination = destinations[0];
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: `Image ${firstDestination.name}` }),
    ).toBeVisible();
    for (const { name } of destinations) {
      await expect(section.getByRole("tab", { name })).toBeVisible();
    }
    await expect(
      section.getByRole("heading", { name: firstDestination.name }),
    ).toBeVisible();
    await expect(section.getByText(firstDestination.description)).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Avg. distance" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: firstDestination.distance }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Est. travel time" }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: firstDestination.travel }),
    ).toBeVisible();
  });

  /** Test if the destination selector button works */
  test("destination selector button works", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "01Pick your destination" }),
    ).toBeVisible();
    const section = page.getByRole("tabpanel");
    const tabButtons = await section.getByRole("tab").all();
    for (const [index, tab] of Object.entries(tabButtons)) {
      const indexNum = Number(index);
      if (indexNum === 0) {
        await expect(section).toHaveAccessibleName(destinations[indexNum].name);
        await expect(tab).toHaveAttribute("aria-selected", "true");
      } else {
        await expect(section).not.toHaveAccessibleName(
          destinations[indexNum].name,
        );
        await expect(tab).toHaveAttribute("aria-selected", "false");
      }
      await tab.click();
      await expect(section).toHaveAccessibleName(destinations[indexNum].name);
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(
        section.getByRole("img", {
          name: `Image ${destinations[indexNum].name}`,
        }),
      ).toBeVisible();
      for (const { name } of destinations) {
        await expect(section.getByRole("tab", { name })).toBeVisible();
      }
      await expect(
        section.getByRole("heading", { name: destinations[indexNum].name }),
      ).toBeVisible();
      await expect(
        section.getByText(destinations[indexNum].description),
      ).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Avg. distance" }),
      ).toBeVisible();
      await expect(
        section.getByRole("heading", { name: destinations[indexNum].distance }),
      ).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Est. travel time" }),
      ).toBeVisible();
      await expect(
        section.getByRole("heading", { name: destinations[indexNum].travel }),
      ).toBeVisible();
    }
  });

  /** Test if the tab keyboard navigation works */
  test("tab keyboard navigation works", async ({ page }) => {
    const tabs = destinations.map((el) => el.name);
    const switcher = page.getByRole("tablist");
    const tabpanel = page.getByRole("tabpanel");
    console.log({ tabs });
    for (const [idx, name] of Object.entries(tabs)) {
      const index = Number.parseInt(idx);
      const button = switcher.getByRole("tab", { name });
      const nextTabButton = switcher.getByRole("tab", {
        name: tabs[index === 3 ? 0 : index + 1],
      });
      const prevTabButton = switcher.getByRole("tab", {
        name: tabs[index === 0 ? 3 : index - 1],
      });
      const firstTabButton = switcher.getByRole("tab", { name: tabs[0] });
      const lastTabButton = switcher.getByRole("tab", { name: tabs[3] });
      if (index === 0 || index === 3) {
        await expect(tabpanel).toHaveAccessibleName(destinations[index].name);
        await expect(button).toHaveAttribute("aria-selected", "true");
      } else {
        await expect(tabpanel).not.toHaveAccessibleName(
          destinations[index].name,
        );
        await expect(button).toHaveAttribute("aria-selected", "false");
      }
      await button.focus();
      await page.keyboard.press("ArrowRight");
      await expect(nextTabButton).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(tabpanel).toHaveAccessibleName(
        tabs[index === 3 ? 0 : index + 1],
      );
      await expect(nextTabButton).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await expect(prevTabButton).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(tabpanel).toHaveAccessibleName(
        tabs[index === 0 ? 3 : index - 1],
      );
      await expect(prevTabButton).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("Home");
      await expect(firstTabButton).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(tabpanel).toHaveAccessibleName(tabs[0]);
      await expect(firstTabButton).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("End");
      await expect(lastTabButton).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(tabpanel).toHaveAccessibleName(tabs[3]);
      await expect(lastTabButton).toHaveAttribute("aria-selected", "true");
    }
  });
});

test.describe("FrontendMentor Challenge - Space Tourism Website Crew Page", () => {
  const crews = _data.crew;

  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website/crew");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Crew");
  });

  testHeader("crew");
  testA11y();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "02Meet your crew" }),
    ).toBeVisible();
    const section = page.locator("div").nth(7);
    const selector = section.locator(">div").nth(1);
    expect(await selector.getByRole("button").all()).toHaveLength(4);
    const firstCrew = crews[0];
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: firstCrew.name }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: firstCrew.role }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: firstCrew.name }),
    ).toBeVisible();
    await expect(section.getByText(firstCrew.bio)).toBeVisible();
  });

  /** Test if the crew selector button works */
  test("crew selector button works", async ({ page }) => {
    const section = page.locator("div").nth(7);
    const buttons = await section
      .locator(">div")
      .nth(1)
      .getByRole("button")
      .all();
    for (const [index, button] of Object.entries(buttons)) {
      const indexNum = Number(index);
      const { bio, name, role } = crews[indexNum];
      await button.click();
      await page.waitForTimeout(500);
      await expect(section.getByRole("img", { name })).toBeVisible();
      await expect(section.getByRole("heading", { name: role })).toBeVisible();
      await expect(section.getByRole("heading", { name })).toBeVisible();
      await expect(section.getByText(bio)).toBeVisible();
    }
  });
});

test.describe("FrontendMentor Challenge - Space Tourism Website Technology Page", () => {
  const techs = _data.technology;

  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website/technology");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Technology");
  });

  testHeader("technology");
  testA11y();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "03Space launch 101" }),
    ).toBeVisible();
    const section = page.locator("div").nth(7);
    const selector = section.locator("ul");
    expect(await selector.getByRole("tab").all()).toHaveLength(3);
    const firstTech = techs[0];
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("heading", { name: "THE TERMINOLOGY…" }),
    ).toBeVisible();
    await expect(
      section.getByRole("img", { name: firstTech.name }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { name: firstTech.name }),
    ).toBeVisible();
    await expect(section.getByText(firstTech.description)).toBeVisible();
  });

  /** Test if the tech selector button works */
  test("tech selector button works", async ({ page }) => {
    const section = page.locator("div").nth(7);
    const tabpanel = page.getByRole("tabpanel");
    const tabs = await section.getByRole("tab").all();
    for (const [index, tab] of Object.entries(tabs)) {
      const indexNum = Number(index);
      const { description, name } = techs[indexNum];
      if (indexNum === 0) {
        await expect(tab).toHaveAttribute("aria-selected", "true");
      } else {
        await expect(tab).toHaveAttribute("aria-selected", "false");
      }
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(tabpanel).toHaveAccessibleName(`${indexNum + 1}`);
      await page.waitForTimeout(500);
      await expect(section.getByRole("img", { name })).toBeVisible();
      await expect(section.getByRole("heading", { name })).toBeVisible();
      await expect(section.getByText(description)).toBeVisible();
    }
  });

  /** Test if the tab keyboard navigation works  */
  test.describe("tab keyboard navigation works", () => {
    const tabs = ["1", "2", "3"];

    test("works on desktop", async ({ page }) => {
      const largestIndex = tabs.length - 1;
      const switcher = page.getByRole("tablist");
      const tabpanel = page.getByRole("tabpanel");
      for (const [idx, name] of Object.entries(tabs)) {
        const index = Number.parseInt(idx);
        const button = switcher.getByRole("tab", { name });
        const nextTabButton = switcher.getByRole("tab", {
          name: tabs[index === largestIndex ? 0 : index + 1],
        });
        const prevTabButton = switcher.getByRole("tab", {
          name: tabs[index === 0 ? largestIndex : index - 1],
        });
        const firstTabButton = switcher.getByRole("tab", { name: tabs[0] });
        const lastTabButton = switcher.getByRole("tab", {
          name: tabs[largestIndex],
        });
        if (index === 0 || index === largestIndex) {
          await expect(tabpanel).toHaveAccessibleName(name);
          await expect(button).toHaveAttribute("aria-selected", "true");
        } else {
          await expect(tabpanel).not.toHaveAccessibleName(name);
          await expect(button).toHaveAttribute("aria-selected", "false");
        }
        await button.focus();
        await page.keyboard.press("ArrowDown");
        await expect(nextTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          tabs[index === largestIndex ? 0 : index + 1],
        );
        await expect(nextTabButton).toHaveAttribute("aria-selected", "true");
        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("ArrowUp");
        await expect(prevTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          tabs[index === 0 ? largestIndex : index - 1],
        );
        await expect(prevTabButton).toHaveAttribute("aria-selected", "true");
        await page.keyboard.press("Home");
        await expect(firstTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(tabs[0]);
        await expect(firstTabButton).toHaveAttribute("aria-selected", "true");
        await page.keyboard.press("End");
        await expect(lastTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(tabs[largestIndex]);
        await expect(lastTabButton).toHaveAttribute("aria-selected", "true");
      }
    });

    test.describe("works on mobile", () => {
      test.use({ viewport: { width: 375, height: 667 } });

      test("works on mobile", async ({ page }) => {
        const largestIndex = tabs.length - 1;
        const switcher = page.getByRole("tablist");
        const tabpanel = page.getByRole("tabpanel");
        for (const [idx, name] of Object.entries(tabs)) {
          const index = Number.parseInt(idx);
          const button = switcher.getByRole("tab", { name });
          const nextTabButton = switcher.getByRole("tab", {
            name: tabs[index === largestIndex ? 0 : index + 1],
          });
          const prevTabButton = switcher.getByRole("tab", {
            name: tabs[index === 0 ? largestIndex : index - 1],
          });
          const firstTabButton = switcher.getByRole("tab", { name: tabs[0] });
          const lastTabButton = switcher.getByRole("tab", {
            name: tabs[largestIndex],
          });
          if (index === 0 || index === largestIndex) {
            await expect(tabpanel).toHaveAccessibleName(name);
            await expect(button).toHaveAttribute("aria-selected", "true");
          } else {
            await expect(tabpanel).not.toHaveAccessibleName(name);
            await expect(button).toHaveAttribute("aria-selected", "false");
          }
          await button.focus();
          await page.keyboard.press("ArrowRight");
          await expect(nextTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(
            tabs[index === largestIndex ? 0 : index + 1],
          );
          await expect(nextTabButton).toHaveAttribute("aria-selected", "true");
          await page.keyboard.press("ArrowLeft");
          await page.keyboard.press("ArrowLeft");
          await expect(prevTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(
            tabs[index === 0 ? largestIndex : index - 1],
          );
          await expect(prevTabButton).toHaveAttribute("aria-selected", "true");
          await page.keyboard.press("Home");
          await expect(firstTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(tabs[0]);
          await expect(firstTabButton).toHaveAttribute("aria-selected", "true");
          await page.keyboard.press("End");
          await expect(lastTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(tabs[largestIndex]);
          await expect(lastTabButton).toHaveAttribute("aria-selected", "true");
        }
      });
    });
  });
});

/** Test if the page has a header */
function testHeader(pageName: (typeof pages)[number]) {
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(
      header.getByRole("img", { name: "Space Tourism Logo" }),
    ).toBeVisible();
    const nav = header.getByRole("navigation");
    for (const link of pages) {
      await expect(
        nav.getByRole("link", { name: link[0].toUpperCase() + link.slice(1) }),
      ).toBeVisible();
      await expect(
        nav.getByRole("link", { name: link[0].toUpperCase() + link.slice(1) }),
      ).toHaveAttribute(
        "href",
        new RegExp(
          link === "home"
            ? ".*/space-tourism-website"
            : `.*/space-tourism-website/${link}`,
        ),
      );
      const indicator = nav
        .locator("li")
        .filter({
          has: page.getByRole("link", {
            name: link[0].toUpperCase() + link.slice(1),
            exact: true,
          }),
        })
        .locator("div");
      if (link === pageName) {
        await expect(indicator).toBeVisible();
      } else {
        await expect(indicator).not.toBeVisible();
      }
    }
  });

  /** Test if the page has a mobile menu*/
  test.describe("has a mobile menu", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("button is visible", async ({ page }) => {
      const button = page.getByLabel("Open Mobile Navigation Menu");
      await expect(button).toBeVisible();
      await expect(button).toBeInViewport();
    });

    test("mobile navigation menu works", async ({ page }) => {
      const menuButton = page.getByLabel("Open Mobile Navigation Menu");
      const navContainer = page.getByRole("dialog");
      const closeButton = navContainer.getByRole("button", {
        name: "Close Navigation Menu",
      });
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-haspopup", "true");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).not.toHaveAttribute("aria-controls");
      await expect(navContainer).not.toBeVisible();
      for (const link of pages) {
        await expect(
          navContainer.getByRole("link", { name: link, exact: true }),
        ).not.toBeVisible();
      }
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-controls");
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(navContainer).toBeVisible();
      for (const link of pages) {
        await expect(
          navContainer.getByRole("link", {
            name: link[0].toUpperCase() + link.slice(1),
            exact: true,
          }),
        ).toBeVisible();
        const indicator = navContainer
          .locator("li")
          .filter({
            has: page.getByRole("link", {
              name: link[0].toUpperCase() + link.slice(1),
              exact: true,
            }),
          })
          .locator("div");
        if (link === pageName) {
          await expect(indicator).toBeVisible();
        } else {
          await expect(indicator).not.toBeVisible();
        }
      }
      await closeButton.click();
      await expect(navContainer).not.toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      for (const link of pages) {
        await expect(
          navContainer.getByRole("link", {
            name: link[0].toUpperCase() + link.slice(1),
            exact: true,
          }),
        ).not.toBeVisible();
      }
      await expect(closeButton).not.toBeVisible();
    });
  });
}

/** Test if the page has detectable accessibility issues */
function testA11y() {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
