import { test, expect, type Page, type Locator } from "@playwright/test";

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
    const container = page.locator("div").nth(3);
    await expect(container).toBeVisible();
    expect(await container.locator(">div").all()).toHaveLength(10);
    for (const job of jobs) {
      const jobCard = container.locator(">div").nth(job.id - 1);
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
      await expect(jobCard.getByText(job.postedAt)).toBeVisible();
      await expect(jobCard.getByText(job.contract)).toBeVisible();
      await expect(jobCard.getByText(job.location)).toBeVisible();
      await expect(
        jobCard.getByRole("button", { name: job.role }),
      ).toBeVisible();
      await expect(
        jobCard.getByRole("button", { name: job.level }),
      ).toBeVisible();
      for (const filter of [...job.languages, ...job.tools]) {
        await expect(
          jobCard.getByRole("button", { name: filter }),
        ).toBeVisible();
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
      filtersContainer = page.locator("div").nth(3);
      await expect(filtersContainer).toBeVisible();
      expect(await filtersContainer.locator(">div>div").all()).toHaveLength(2);
      jobListContainer = page.locator("div:nth-child(2)").nth(2);
      await expect(jobListContainer).toBeVisible();
      expect(await jobListContainer.locator(">div").all()).toHaveLength(
        jobs.filter(
          (job) => job.role === "Frontend" && job.languages.includes("HTML"),
        ).length,
      );
    });

    test("can remove filter", async () => {
      const removeHtmlFilterButton = filtersContainer
        .locator(">div>div")
        .nth(0)
        .getByRole("button");
      await expect(removeHtmlFilterButton).toBeVisible();
      await removeHtmlFilterButton.click();
      expect(await filtersContainer.locator(">div>div").all()).toHaveLength(1);
      jobListContainer = page.locator("div:nth-child(2)").nth(1);
      expect(await jobListContainer.locator(">div").all()).toHaveLength(
        jobs.filter((job) => job.role === "Frontend").length,
      );
    });

    test("can clear filter", async () => {
      clearFilterButton = filtersContainer.getByRole("button", {
        name: "Clear",
      });
      await expect(clearFilterButton).toBeVisible();
      await clearFilterButton.click();
      jobListContainer = page.locator("div").nth(3);
      await expect(jobListContainer).toBeVisible();
      expect(await jobListContainer.locator(">div").all()).toHaveLength(10);
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
