import { test, expect } from "@playwright/test";

import jobs from "../public/static-job-listings/data.json";

test.describe("FrontendMentor Challenge - Job Listings Page", () => {
  /** Go to Job Listings page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/static-job-listings");
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
    test("can add filter", async ({ page }) => {
      const sampleFilterButton = page
        .getByRole("button", { name: "Frontend" })
        .first();
      await sampleFilterButton.click();
      const filterContainer = page.locator("div").nth(3);
      await expect(filterContainer).toBeVisible();
      await expect(
        filterContainer.getByRole("button", { name: "Clear" }),
      ).toBeVisible();
      expect(await filterContainer.locator(">div").all()).toHaveLength(1);
      const jobListContainer = page.locator("div").nth(7);
      await expect(jobListContainer).toBeVisible();
      expect(await jobListContainer.locator(">div").all()).toHaveLength(
        jobs.filter((job) => job.role === "Frontend").length,
      );
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
