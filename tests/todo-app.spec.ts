import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Todo app Page", () => {
  /** Go to Todo app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/todo-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Todo app");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("heading", { name: "TODO" })).toBeVisible();
    await expect(header.getByRole("button")).toBeVisible();
  });

  /** Test if the page has a new todo input */
  test("has a new todo input", async ({ page }) => {
    await expect(page.getByPlaceholder("Create a new todo...")).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Drag and drop to reorder list")).toBeVisible();
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
