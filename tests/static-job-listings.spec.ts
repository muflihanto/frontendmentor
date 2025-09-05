import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

import jobs from "../public/static-job-listings/data.json";

const pageUrl = "/static-job-listings";

test.describe("FrontendMentor Challenge - Job Listings Page", () => {
  /** Go to Job Listings page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Job Listings");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header).toHaveCSS(
      "background-image",
      'url("http://localhost:3000/static-job-listings/images/bg-header-desktop.svg")',
    );
  });

  /** Test if the page has correct initial cards */
  test("has correct initial cards", async ({ page }) => {
    const heading = page.locator("h1#job-list");
    const headingClasses = (await heading.getAttribute("class"))?.split(" ");
    expect(headingClasses).toContain("sr-only");
    const container = page.getByRole("list", { name: "Static Job Listings" });
    await expect(container).toBeVisible();
    expect(await container.getByRole("listitem").all()).toHaveLength(10);
    for (const job of jobs) {
      const jobCard = container.getByLabel(job.company, { exact: true });
      await expect(
        jobCard.getByRole("img", { name: `${job.company} ${job.position}` }),
      ).toBeVisible();
      await expect(jobCard.getByText(job.company)).toBeVisible();
      if (job.new) {
        const newBadge = jobCard.getByText("new!");
        await expect(newBadge).toBeVisible();
        await expect(newBadge).toHaveCSS(
          "background-color",
          "rgb(91, 164, 164)",
        );
        await expect(newBadge).toHaveText("new!");
      }
      if (job.featured) {
        await expect(jobCard.getByText("featured").first()).toBeVisible();
        await expect(jobCard).toHaveCSS(
          "border-left",
          "5px solid rgb(91, 164, 164)",
        );
      }
      const jobPosition = jobCard.getByText(job.position, { exact: true });
      await expect(jobPosition).toBeVisible();
      await expect(jobPosition).toHaveCSS("color", "rgb(44, 58, 58)");
      await jobPosition.hover();
      await expect(jobPosition).toHaveCSS("color", "rgb(91, 164, 164)");
      const jobDetails = jobCard.getByRole("group");
      await expect(jobDetails).toHaveAccessibleName("Job Details");
      await expect(jobDetails.getByText(job.postedAt)).toBeVisible();
      await expect(jobDetails.getByText(job.contract)).toBeVisible();
      await expect(jobDetails.getByText(job.location)).toBeVisible();
      const role = jobCard.getByRole("button", { name: job.role });
      await expect(role).toBeVisible();
      await expect(role).toHaveAccessibleName(`Filter by role: ${job.role}`);
      await expect(role).toHaveCSS("color", "rgb(91, 164, 164)");
      await expect(role).toHaveCSS("background-color", "rgb(238, 246, 246)");
      await role.hover();
      await expect(role).toHaveCSS("color", "rgb(239, 250, 250)");
      await expect(role).toHaveCSS("background-color", "rgb(91, 164, 164)");
      const level = jobCard.getByRole("button", { name: job.level });
      await expect(level).toBeVisible();
      await expect(level).toHaveAccessibleName(`Filter by level: ${job.level}`);
      for (const filter of [...job.languages, ...job.tools]) {
        const element = jobCard.getByRole("button", { name: filter });
        await expect(element).toBeVisible();
        await expect(element).toHaveCSS("color", "rgb(91, 164, 164)");
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(238, 246, 246)",
        );
        await element.hover();
        await expect(element).toHaveCSS("color", "rgb(239, 250, 250)");
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(91, 164, 164)",
        );
        if (job.languages.includes(filter)) {
          await expect(element).toHaveAccessibleName(
            `Filter by language: ${filter}`,
          );
        } else {
          await expect(element).toHaveAccessibleName(
            `Filter by tool: ${filter}`,
          );
        }
      }
    }
  });

  /** Test if the job listings filtering works */
  test.describe("job listings filtering works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let sampleFilterButtons: Locator[] = [];
    let filtersContainer: Locator;
    let jobListContainer: Locator;
    let clearFilterButton: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test.afterAll(async () => {
      await page.close();
    });

    test("can add filter", async () => {
      sampleFilterButtons = [
        page.getByRole("button", { name: "Frontend" }).first(),
        page.getByRole("button", { name: "HTML" }).first(),
      ];
      for (const button of sampleFilterButtons) {
        await expect(button).toBeVisible();
        await button.click();
      }
      filtersContainer = page.getByLabel("Active Filters");
      await expect(filtersContainer).toBeVisible();
      expect(
        await filtersContainer.getByLabel("Remove filter").all(),
      ).toHaveLength(2);
      const legend = page.locator("legend#filters-legend");
      const legendClasses = (await legend.getAttribute("class"))?.split(" ");
      expect(legendClasses).toContain("sr-only");
      jobListContainer = page.getByRole("list", {
        name: "Static Job Listings",
      });
      await expect(jobListContainer).toBeVisible();
      expect(await jobListContainer.getByRole("listitem").all()).toHaveLength(
        jobs.filter(
          (job) => job.role === "Frontend" && job.languages.includes("HTML"),
        ).length,
      );
    });

    test("can remove filter", async () => {
      const removeHtmlFilterButton = filtersContainer.getByLabel(
        "Remove filter: HTML",
      );
      await expect(removeHtmlFilterButton).toBeVisible();
      await expect(removeHtmlFilterButton).toHaveCSS(
        "background-color",
        "rgb(91, 164, 164)",
      );
      await removeHtmlFilterButton.hover();
      await expect(removeHtmlFilterButton).toHaveCSS(
        "background-color",
        "rgb(44, 58, 58)",
      );
      await removeHtmlFilterButton.click();
      expect(
        await filtersContainer.getByLabel("Remove filter").all(),
      ).toHaveLength(1);
      expect(await jobListContainer.getByRole("listitem").all()).toHaveLength(
        jobs.filter((job) => job.role === "Frontend").length,
      );
    });

    test("can clear filter", async () => {
      clearFilterButton = filtersContainer.getByLabel("Clear all filters");
      await expect(clearFilterButton).toBeVisible();
      await clearFilterButton.click();
      await expect(jobListContainer).toBeVisible();
      expect(await jobListContainer.getByRole("listitem").all()).toHaveLength(
        10,
      );
    });

    /** Test if all filter categories work independently */
    test("all filter categories work independently", async () => {
      const testFilters = [
        { type: "role", value: "Backend" },
        { type: "level", value: "Senior" },
        { type: "language", value: "CSS" },
        { type: "tool", value: "React" },
      ];

      for (const filter of testFilters) {
        const filterButton = page
          .getByRole("button", { name: filter.value })
          .first();
        await filterButton.click();

        const filteredCount = jobs.filter((job) => {
          if (filter.type === "role") return job.role === filter.value;
          if (filter.type === "level") return job.level === filter.value;
          if (filter.type === "language")
            return job.languages.includes(filter.value);
          if (filter.type === "tool") return job.tools.includes(filter.value);
          return false;
        }).length;

        const jobListContainer = page.getByRole("list", {
          name: "Static Job Listings",
        });
        expect(await jobListContainer.getByRole("listitem").all()).toHaveLength(
          filteredCount,
        );

        // Clear filters for next test
        await page.getByLabel("Clear all filters").click();
      }
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test responsive layout */
  test("layout is correct", async ({ page }) => {
    const jobCards = page.getByRole("listitem");
    const header = page.getByRole("banner");
    await expect(header).toHaveCSS(
      "background-image",
      'url("http://localhost:3000/static-job-listings/images/bg-header-desktop.svg")',
    );
    await expect(jobCards.first()).toHaveCSS("display", "flex");
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(header).toHaveCSS(
      "background-image",
      'url("http://localhost:3000/static-job-listings/images/bg-header-mobile.svg")',
    );
    await expect(jobCards.first()).not.toHaveCSS("display", "flex");
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
