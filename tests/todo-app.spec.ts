import { test, expect } from "@playwright/test";

const data = [
  {
    activity: "Complete online JavaScript course",
    completed: true,
  },
  {
    activity: "Jog around the park 3x",
    completed: false,
  },
  {
    activity: "10 minutes meditation",
    completed: false,
  },
  {
    activity: "Read for 1 hour",
    completed: false,
  },
  {
    activity: "Pick up groceries",
    completed: false,
  },
  {
    activity: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

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

  /** Test if the page has a form */
  test("has a form", async ({ page }) => {
    const form = page.locator("form");
    await expect(form.getByPlaceholder("Create a new todo...")).toBeVisible();
    await page.waitForTimeout(2000);
    for (const item of data) {
      const listitem = form.locator("li").filter({ hasText: item.activity });
      await expect(listitem).toBeVisible();
      for (const button of await listitem.getByRole("button").all()) {
        await expect(button).toBeVisible();
      }
      if (item.completed) {
        await expect(listitem.locator("p")).toHaveCSS(
          "text-decoration-line",
          "line-through",
        );
      } else {
        await expect(listitem.locator("p")).not.toHaveCSS(
          "text-decoration-line",
          "line-through",
        );
      }
    }
    await expect(form.getByText("5 items left")).toBeVisible();
    const formFooterButtonLabels = [
      "All",
      "Active",
      "Completed",
      "Clear Completed",
    ];
    for (const button of formFooterButtonLabels) {
      await expect(
        form.getByRole("button", { name: button, exact: true }),
      ).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Drag and drop to reorder list")).toBeVisible();
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
