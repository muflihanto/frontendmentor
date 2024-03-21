import { test, expect } from "@playwright/test";
import _data from "../components/space-tourism-website/data.json";

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

  testHeader();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const section = page.locator("div").nth(8);
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

  testHeader();

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "01Pick your destination" }),
    ).toBeVisible();
    const section = page.locator("div").nth(8);
    const firstDestination = destinations[0];
    await expect(section).toBeVisible();
    await expect(section).toBeInViewport();
    await expect(
      section.getByRole("img", { name: `Image ${firstDestination.name}` }),
    ).toBeVisible();
    for (const { name } of destinations) {
      await expect(section.getByRole("button", { name })).toBeVisible();
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
});

/** Test if the page has a header */
function testHeader() {
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(
      header.getByRole("img", { name: "Space Tourism Logo" }),
    ).toBeVisible();
    const nav = header.getByRole("navigation");
    for (const page of pages) {
      await expect(nav.getByRole("link", { name: page })).toBeVisible();
      await expect(nav.getByRole("link", { name: page })).toHaveAttribute(
        "href",
        new RegExp(
          page === "home"
            ? `.*/space-tourism-website`
            : `.*/space-tourism-website/${page}`,
        ),
      );
    }
  });
}
