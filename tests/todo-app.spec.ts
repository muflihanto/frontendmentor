import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    await expect(header.getByRole("switch")).toBeVisible();
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
      if (button === "Clear Completed") {
        await expect(
          form.getByRole("button", { name: button, exact: true }),
        ).toBeVisible();
      } else {
        await expect(
          form.getByRole("tab", { name: button, exact: true }),
        ).toBeVisible();
      }
    }
  });

  /** Test if the todo functionalities work */
  test.describe("todo works", () => {
    test.describe("Add New Item", () => {
      test("should add single todo item", async ({ page }) => {
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
        // Verify items count updated
        const items = await getTodoItems(page);
        expect(items).toHaveLength(7);
        const itemsLeftText = await page
          .locator("text=/[0-9]+ items left/")
          .first()
          .textContent();
        expect(itemsLeftText).toMatch(/6 items left/);
      });
      test("should add multiple todo items", async ({ page }) => {
        const itemsToAdd = ["Task 1", "Task 2", "Task 3"];
        for (const text of itemsToAdd) {
          await addTodoItem(page, text);
        }

        const items = await getTodoItems(page);
        expect(items).toHaveLength(6 + itemsToAdd.length); // Initial 6 + 3 new items

        // Verify all items were added correctly
        for (let i = 0; i < itemsToAdd.length; i++) {
          await expect(items[6 + i]).toContainText(itemsToAdd[i]);
        }
      });
      test("should trim whitespace from new items", async ({ page }) => {
        await addTodoItem(page, "   Meeting with team   ");
        const items = await getTodoItems(page);
        await expect(items[6]).toContainText("Meeting with team"); // 7th item (index 6)
      });
      test("should not add empty items", async ({ page }) => {
        const input = page.locator('input[placeholder="Create a new todo..."]');
        await input.fill("   ");
        await input.press("Enter");

        // Should still only have initial 6 items
        const items = await getTodoItems(page);
        expect(items).toHaveLength(6);
      });
    });
    test.describe("Toggle Completed", () => {
      test('should toggle item completion status in "All" tab', async ({
        page,
      }) => {
        const firstItem = getFirstTodoItem(page);

        // Verify it's completed
        await expect(firstItem.locator("p")).toHaveCSS(
          "text-decoration-line",
          "line-through",
        );

        const toggleButton = firstItem.locator('button[aria-label^="Mark as"]');
        await toggleButton.click();

        // Verify it's not completed
        await expect(firstItem.locator("p")).not.toHaveCSS(
          "text-decoration-line",
          "line-through",
        );

        // Check in all tabs
        await verifyTogglePersists(page, firstItem.locator("p"));
      });
      test('should toggle item completion status in "Active" tab', async ({
        page,
      }) => {
        await page.click('button[id="tab-active"]');
        const activeItems = await getTodoItems(page);
        const firstActiveItem = activeItems[0];

        const itemId =
          (await firstActiveItem.locator("p").getAttribute("id")) ?? "";

        await toggleTodoItem(firstActiveItem);

        // Item should disappear from Active tab
        await expect(page.locator(`p[id=${itemId}]`)).not.toBeVisible();

        // Check in other tabs
        await verifyTogglePersists(page, page.locator(`p[id=${itemId}]`));
      });
      test('should toggle item completion status in "Completed" tab', async ({
        page,
      }) => {
        // Add completed item
        const item = page.locator('[aria-labelledby^="activity-"]').nth(1);
        await toggleTodoItem(item);

        await page.click('button[id="tab-completed"]');
        const completedItems = await getTodoItems(page);
        const firstCompletedItem = completedItems[0];
        const itemId =
          (await firstCompletedItem.locator("p").getAttribute("id")) ?? "";

        await toggleTodoItem(firstCompletedItem);

        // Item should disappear from Completed tab
        await expect(page.locator(`p[id=${itemId}]`)).not.toBeVisible();

        // Check in other tabs
        await verifyTogglePersists(page, page.locator(`p[id=${itemId}]`));
      });
    });
    test.describe("Delete Item", () => {
      test('should delete item in "All" tab', async ({ page }) => {
        const initialItems = await getTodoItems(page);
        const initialCount = initialItems.length;

        const firstItem = initialItems[0];
        const firstItemId = await firstItem.locator("p").getAttribute("id");
        await deleteTodoItem(firstItem);

        const itemsAfterDelete = await getTodoItems(page);
        expect(itemsAfterDelete).toHaveLength(initialCount - 1);
        await expect(page.locator(`p[id=${firstItemId}]`)).not.toBeVisible();
      });
      test('should delete item in "Active" tab', async ({ page }) => {
        await page.click('button[id="tab-active"]');
        const initialItems = await getTodoItems(page);
        const initialCount = initialItems.length;

        const firstItem = initialItems[0];
        const firstItemId = await firstItem.locator("p").getAttribute("id");
        await deleteTodoItem(firstItem);

        const itemsAfterDelete = await getTodoItems(page);
        expect(itemsAfterDelete).toHaveLength(initialCount - 1);
        await expect(page.locator(`p[id=${firstItemId}]`)).not.toBeVisible();
      });
      test('should delete item in "Completed" tab', async ({ page }) => {
        await page.click('button[id="tab-completed"]');
        const completedItems = await getTodoItems(page);
        const firstCompletedItem = completedItems[0];
        const firstCompletedItemId = await firstCompletedItem
          .locator("p")
          .getAttribute("id");
        await deleteTodoItem(firstCompletedItem);

        await expect(
          page.locator(`p[id=${firstCompletedItemId}]`),
        ).not.toBeVisible();
      });
    });
    test("should persist todo items after page reload", async ({ page }) => {
      const newItemText = "Persistent todo";
      await addTodoItem(page, newItemText);

      let items = await getTodoItems(page);
      await expect(items[6]).toContainText(newItemText);

      await page.reload();

      // Verify the item still exists after reload
      items = await getTodoItems(page);
      await expect(items[6]).toContainText(newItemText);

      // Verify items count remains the same
      expect(items).toHaveLength(7);

      // Verify items left count persists
      const itemsLeftText = await page
        .locator("text=/[0-9]+ items left/")
        .first()
        .textContent();
      expect(itemsLeftText).toMatch(/6 items left/);
    });
    test("form footer buttons work", async ({ page }) => {
      const form = page.locator("form");
      for (const label of formFooterButtonLabels) {
        const tabButton = form.getByRole(
          label === "Clear Completed" ? "button" : "tab",
          { name: label, exact: true },
        );
        await tabButton.click();
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
            await form.getByRole("tab", { name: "All", exact: true }).click();
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

  /** Test if the theme switcher works */
  test("theme switcher works", async ({ page }) => {
    const button = page.getByRole("banner").getByRole("switch");
    const container = page.locator("div").nth(1);
    const getBgImage = async () =>
      await container.evaluate(
        (el) => window.getComputedStyle(el, "::before").backgroundImage,
      );
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-light.jpg")',
    );
    await expect(container).toHaveCSS("background-color", "rgb(250, 250, 250)");
    await expect(button).toHaveAttribute("aria-checked", "false");
    await button.click();
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-dark.jpg")',
    );
    await expect(container).toHaveCSS("background-color", "rgb(22, 23, 34)");
    await expect(button).toHaveAttribute("aria-checked", "true");
  });

  /** Test if dark mode preference persists after page reload */
  test("dark mode preference persists after reload", async ({ page }) => {
    const button = page.getByRole("banner").getByRole("switch");
    const container = page.locator("div").nth(1);
    const html = page.locator("html");
    const getBgImage = async () =>
      await container.evaluate(
        (el) => window.getComputedStyle(el, "::before").backgroundImage,
      );

    // Initial state (light mode)
    await expect(button).toHaveAttribute("aria-checked", "false");
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-light.jpg")',
    );

    // Switch to dark mode
    await button.click();
    await expect(button).toHaveAttribute("aria-checked", "true");
    await expect(html).toHaveClass("dark");
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-dark.jpg")',
    );

    // Reload and verify dark mode persists
    await page.reload();
    await page.waitForTimeout(1500);
    await expect(button).toHaveAttribute("aria-checked", "true");
    await expect(html).toHaveClass("dark");
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-dark.jpg")',
    );

    // Switch back to light mode
    await button.click();
    await expect(button).toHaveAttribute("aria-checked", "false");
    await expect(html).not.toHaveClass("dark");
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-light.jpg")',
    );

    // Reload and verify light mode persists
    await page.reload();
    await expect(button).toHaveAttribute("aria-checked", "false");
    await expect(html).not.toHaveClass("dark");
    expect(await getBgImage()).toStrictEqual(
      'url("http://localhost:3000/todo-app/images/bg-desktop-light.jpg")',
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Drag and drop to reorder list")).toBeVisible();
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the tab keyboard navigation works  */
  test.describe("tab keyboard navigation works", () => {
    const tabs = ["All", "Active", "Completed"];

    async function doKeyboardTest(page: Page) {
      const switcher = page.getByRole("tablist");
      const tabpanel = page.getByRole("tabpanel");
      for (const [idx, unit] of Object.entries(tabs)) {
        const index = Number.parseInt(idx);
        const button = switcher.getByRole("tab", { name: unit });
        const nextTabButton = switcher.getByRole("tab", {
          name: tabs[index === 2 ? 0 : index + 1],
        });
        const prevTabButton = switcher.getByRole("tab", {
          name: tabs[index === 0 ? 2 : index - 1],
        });
        const firstTabButton = switcher.getByRole("tab", { name: tabs[0] });
        const lastTabButton = switcher.getByRole("tab", { name: tabs[2] });
        await button.focus();
        await page.keyboard.press("ArrowRight");
        await expect(nextTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          tabs[index === 2 ? 0 : index + 1],
        );
        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("ArrowLeft");
        await expect(prevTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          tabs[index === 0 ? 2 : index - 1],
        );
        await page.keyboard.press("Home");
        await expect(firstTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(tabs[0]);
        await page.keyboard.press("End");
        await expect(lastTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(tabs[2]);
      }
    }

    test("works on desktop", async ({ page }) => {
      await doKeyboardTest(page);
    });

    test.describe("works on mobile", () => {
      test.use({ viewport: { width: 375, height: 667 } });
      test("works on mobile", async ({ page }) => {
        await doKeyboardTest(page);
      });
    });
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

async function getTodoItems(page: Page): Promise<Locator[]> {
  const count = await page.locator('[aria-labelledby^="activity-"]').count();
  return Array.from({ length: count }, (_, i) =>
    page.locator('[aria-labelledby^="activity-"]').nth(i),
  );
}

async function addTodoItem(page: Page, text: string): Promise<void> {
  const input = page.locator('input[placeholder="Create a new todo..."]');
  await input.fill(text);
  await input.press("Enter");
}

function getFirstTodoItem(page: Page): Locator {
  return page.locator('[aria-labelledby^="activity-"]').first();
}

async function verifyTogglePersists(page: Page, item: Locator): Promise<void> {
  // Check in All tab
  await page.click('button[id="tab-all"]');
  await expect(item).toBeVisible();

  const isCompleted = await item
    .evaluate((el) => {
      return window.getComputedStyle(el).textDecorationLine;
    })
    .then((c) => c === "line-through");

  // Check in Active tab
  await page.click('button[id="tab-active"]');
  if (isCompleted) {
    await expect(item).not.toBeVisible();
  } else {
    await expect(item).toBeVisible();
  }

  // Check in Completed tab
  await page.click('button[id="tab-completed"]');
  if (isCompleted) {
    await expect(item).toBeVisible();
  } else {
    await expect(item).not.toBeVisible();
  }
}

async function toggleTodoItem(item: Locator): Promise<void> {
  await item.locator('button[aria-label^="Mark as"]').click();
}

async function deleteTodoItem(item: Locator): Promise<void> {
  await item.hover();
  await item.getByRole("button", { name: "Delete activity" }).click();
}
