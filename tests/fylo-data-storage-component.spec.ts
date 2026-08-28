import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo data storage component Page", () => {
  /** Go to Fylo data storage component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-data-storage-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo data storage component",
    );
  });

  /** Test if the page has a header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByTestId("fylo-header")).toBeVisible();
      await expect(page.getByTestId("fylo-header")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByTestId("fylo-header");
      await expect(page.getByTestId("fylo-logo")).toBeVisible();
      await expect(header).toBeVisible();
      const links = await page
        .getByTestId("fylo-nav-list")
        .getByRole("link")
        .all();
      expect(links).toHaveLength(3);
      for (const variant of ["document", "folder", "upload"] as const) {
        const link = page.getByTestId(`nav-link-${variant}`);
        await expect(link).toBeVisible();
        await expect(link.locator("svg")).toBeVisible();
      }
    });
  });

  /** Test if the page has a status section */
  test.describe("has a status section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.getByTestId("storage-status")).toBeVisible();
      await expect(page.getByTestId("storage-remaining")).toBeVisible();
      await expect(page.getByTestId("storage-remaining")).toContainText(
        "185 GB Left",
      );
    });
    test("has all elements", async ({ page }) => {
      const section = page.getByTestId("storage-status");
      await expect(
        section.getByText("You‘ve used 815 GB of your storage"),
      ).toBeVisible();
      // sr-only heading
      const heading = page.getByTestId("storage-heading");
      await expect(heading).toHaveText("Data Storage Status");
      await expect(heading).toHaveClass(/sr-only/);
      // other elements
      await expect(section.getByText("0 GB", { exact: true })).toBeVisible();
      await expect(section.getByText("1000 GB")).toBeVisible();
    });
    test("shows correct percentage filled", async ({ page }) => {
      const fill = page.getByTestId("storage-fill");
      await expect(fill).toBeVisible();
      const barLength = await fill.evaluate((el) =>
        el.style.getPropertyValue("--bar-length"),
      );
      expect(barLength.trim()).toBe("81.5%");
    });
    test("storage bar has accessible progressbar", async ({ page }) => {
      const progressbar = page.getByTestId("storage-progressbar");
      await expect(progressbar).toBeVisible();
      await expect(progressbar).toHaveAttribute("aria-valuenow", "815");
      await expect(progressbar).toHaveAttribute("aria-valuemin", "0");
      await expect(progressbar).toHaveAttribute("aria-valuemax", "1000");
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
