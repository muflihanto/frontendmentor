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

const formFooterButtonLabels = [
  "All",
  "Active",
  "Completed",
  "Clear Completed",
] as const;

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
    for (const item of data) {
      const listitem = form.locator("li").filter({ hasText: item.activity });
      await expect(listitem).toBeVisible();
      await listitem.hover();
      await expect(listitem.getByRole("button").nth(1)).toBeVisible();
      await expect(listitem.getByRole("button").first()).toBeVisible();
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
    for (const button of formFooterButtonLabels) {
      await expect(
        form.getByRole("button", { name: button, exact: true }),
      ).toBeVisible();
    }
  });

  /** Test if the todo functionalities work */
  test.describe("todo works", () => {
    test("can add todo", async ({ page }) => {
      const form = page.locator("form");
      const input = form.getByPlaceholder("Create a new todo...");
      await input.fill("new todo");
      await input.focus();
      await page.keyboard.press("Enter");
      const listitem = form.locator("li").filter({ hasText: "new todo" });
      await expect(listitem).toBeVisible();
      await expect(listitem.locator("p")).not.toHaveCSS(
        "text-decoration-line",
        "line-through",
      );
    });
    test("can mark todo as completed", async ({ page }) => {
      const form = page.locator("form");
      const listitem = form
        .locator("li")
        .filter({ hasText: "Read for 1 hour" });
      await expect(listitem).toBeVisible();
      await expect(listitem.locator("p")).not.toHaveCSS(
        "text-decoration-line",
        "line-through",
      );
      const button = listitem.getByRole("button").first();
      await button.click();
      await expect(listitem.locator("p")).toHaveCSS(
        "text-decoration-line",
        "line-through",
      );
      await button.click();
      await expect(listitem.locator("p")).not.toHaveCSS(
        "text-decoration-line",
        "line-through",
      );
    });
    test("can delete a todo", async ({ page }) => {
      const form = page.locator("form");
      const listitem = form
        .locator("li")
        .filter({ hasText: "Read for 1 hour" });
      await expect(listitem).toBeVisible();
      await expect(listitem.locator("p")).not.toHaveCSS(
        "text-decoration-line",
        "line-through",
      );
      await listitem.hover();
      const button = listitem.getByRole("button").nth(1);
      await button.click();
      await page.waitForTimeout(500);
      await expect(listitem).not.toBeVisible();
      await expect(listitem).not.toBeInViewport();
    });
    test("form footer buttons work", async ({ page }) => {
      const form = page.locator("form");
      for (const label of formFooterButtonLabels) {
        const button = form.getByRole("button", { name: label, exact: true });
        await button.click();
        switch (label) {
          case "All":
            for (const item of data) {
              const listitem = form
                .locator("li")
                .filter({ hasText: item.activity });
              await expect(listitem).toBeVisible();
            }
            break;
          case "Completed":
            for (const item of data.filter((item) => item.completed)) {
              const listitem = form
                .locator("li")
                .filter({ hasText: item.activity });
              await expect(listitem).toBeVisible();
            }
            break;
          case "Active":
            for (const item of data.filter((item) => !item.completed)) {
              const listitem = form
                .locator("li")
                .filter({ hasText: item.activity });
              await expect(listitem).toBeVisible();
            }
            break;
          default:
            await form
              .getByRole("button", { name: "All", exact: true })
              .click();
            for (const item of data.filter((item) => !item.completed)) {
              const listitem = form
                .locator("li")
                .filter({ hasText: item.activity });
              await expect(listitem).toBeVisible();
            }
            break;
        }
      }
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Drag and drop to reorder list")).toBeVisible();
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
