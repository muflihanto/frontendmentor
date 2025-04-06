import { test, expect, type Page, type Locator } from "@playwright/test";

import jobs from "../public/static-job-listings/data.json";
import AxeBuilder from "@axe-core/playwright";

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
    const container = page.getByLabel("Static Job Listings");
    await expect(container).toBeVisible();
    expect(await container.getByRole("listitem").all()).toHaveLength(10);
    for (const job of jobs) {
      const jobCard = container.getByLabel(job.company, { exact: true });
      await expect(
        jobCard.getByRole("img", { name: `${job.company} ${job.position}` }),
      ).toBeVisible();
      await expect(jobCard.getByText(job.company)).toBeVisible();
      if (job.new) await expect(jobCard.getByText("new!")).toBeVisible();
      if (job.featured)
        await expect(jobCard.getByText("featured").first()).toBeVisible();
      await expect(
        jobCard.getByText(job.position, { exact: true }),
      ).toBeVisible();
      const jobDetails = jobCard.getByRole("group");
      await expect(jobDetails).toHaveAccessibleName("Job Details");
      await expect(jobDetails.getByText(job.postedAt)).toBeVisible();
      await expect(jobDetails.getByText(job.contract)).toBeVisible();
      await expect(jobDetails.getByText(job.location)).toBeVisible();
      const role = jobCard.getByRole("button", { name: job.role });
      await expect(role).toBeVisible();
      await expect(role).toHaveAccessibleName(`Filter by role: ${job.role}`);
      const level = jobCard.getByRole("button", { name: job.level });
      await expect(level).toBeVisible();
      await expect(level).toHaveAccessibleName(`Filter by level: ${job.level}`);
      for (const filter of [...job.languages, ...job.tools]) {
        const element = jobCard.getByRole("button", { name: filter });
        await expect(element).toBeVisible();
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
      jobListContainer = page.getByLabel("Static Job Listings");
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
