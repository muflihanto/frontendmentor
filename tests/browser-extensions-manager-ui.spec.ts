import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Browser extensions manager UI page", () => {
  /** Go to Browser extensions manager UI page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/browser-extensions-manager-ui");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Browser extensions manager UI",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test theme toggle button is visible */
  test("has theme toggle button", async ({ page }) => {
    const themeButton = page.locator('[role="switch"][aria-checked]').first();
    await expect(themeButton).toBeVisible();
  });

  /** Test theme toggle switches between dark and light mode */
  test("theme toggle switches dark/light mode", async ({ page }) => {
    const themeButton = page.locator('header button[role="switch"]');

    await expect(themeButton).toBeVisible();

    const initialAriaChecked = await themeButton.getAttribute("aria-checked");

    await themeButton.click();

    await expect(themeButton).toHaveAttribute(
      "aria-checked",
      initialAriaChecked === "true" ? "false" : "true",
    );
  });

  /** Test extension cards are displayed */
  test("displays extension cards", async ({ page }) => {
    const extensionCards = page.locator('[role="tabpanel"] > div');
    await expect(extensionCards.first()).toBeVisible();
  });

  /** Test extension toggle switches have correct aria-checked */
  test("extension toggle switches toggle aria-checked on click", async ({
    page,
  }) => {
    const extensionCards = page.locator('[role="tabpanel"] > div');
    const count = await extensionCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = extensionCards.nth(i);
      const toggleButton = card.locator('[role="switch"]').first();

      await expect(toggleButton).toBeVisible();

      const initialChecked = await toggleButton.getAttribute("aria-checked");
      expect(initialChecked).not.toBeNull();

      await toggleButton.click();

      const toggledChecked = initialChecked === "true" ? "false" : "true";
      await expect(toggleButton).toHaveAttribute(
        "aria-checked",
        toggledChecked,
      );

      await toggleButton.click();

      await expect(toggleButton).toHaveAttribute(
        "aria-checked",
        // biome-ignore lint/style/noNonNullAssertion: TypeScript doesn't narrow after expect assertion, but we verified it's not null above
        initialChecked!,
      );
    }
  });

  /** Test tab filters work */
  test("tab filters filter extensions", async ({ page }) => {
    const allTab = page.getByRole("tab", { name: "All", exact: true });
    const activeTab = page.getByRole("tab", { name: "Active", exact: true });
    const inactiveTab = page.getByRole("tab", {
      name: "Inactive",
      exact: true,
    });

    await expect(allTab).toHaveAttribute("aria-selected", "true");

    await activeTab.click();
    await expect(activeTab).toHaveAttribute("aria-selected", "true");

    await inactiveTab.click();
    await expect(inactiveTab).toHaveAttribute("aria-selected", "true");
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

  test.describe("hover states", () => {
    test.describe("light mode", () => {
      test("theme toggle button shows hover styles", async ({ page }) => {
        const themeButton = page.locator('header button[role="switch"]');
        await expect(themeButton).toHaveCSS(
          "background-color",
          "rgb(237, 237, 237)",
        );
        await themeButton.hover();
        await expect(themeButton).toHaveCSS(
          "background-color",
          "rgb(199, 199, 199)",
        );
      });

      test("tab buttons show hover styles", async ({ page }) => {
        const activeTab = page.getByRole("tab", {
          name: "Active",
          exact: true,
        });
        await expect(activeTab).toHaveCSS("color", "rgb(9, 21, 62)");
        await activeTab.hover();
        await expect(activeTab).toHaveCSS("color", "rgb(84, 89, 105)");
      });

      test("remove button shows hover styles", async ({ page }) => {
        const removeButton = page
          .locator('[role="tabpanel"] button:has-text("Remove")')
          .first();
        await expect(removeButton).toHaveCSS(
          "background-color",
          "rgb(251, 253, 254)",
        );
        await removeButton.hover();
        await expect(removeButton).toHaveCSS(
          "background-color",
          "rgb(199, 34, 26)",
        );
      });
    });

    test.describe("dark mode", () => {
      test.use({ colorScheme: "dark" });

      test("theme toggle button shows dark hover styles", async ({ page }) => {
        const themeButton = page.locator('header button[role="switch"]');
        await expect(themeButton).toHaveCSS(
          "background-color",
          "rgb(47, 54, 75)",
        );
        await themeButton.hover();
        await expect(themeButton).toHaveCSS(
          "background-color",
          "rgb(84, 89, 105)",
        );
      });

      test("tab buttons show dark hover styles", async ({ page }) => {
        const activeTab = page.getByRole("tab", {
          name: "Active",
          exact: true,
        });
        await expect(activeTab).toHaveCSS(
          "background-color",
          "rgb(33, 38, 54)",
        );
        await activeTab.hover();
        await expect(activeTab).toHaveCSS(
          "background-color",
          "rgb(84, 89, 105)",
        );
      });

      test("remove button shows dark hover styles", async ({ page }) => {
        const removeButton = page
          .locator('[role="tabpanel"] button:has-text("Remove")')
          .first();
        await expect(removeButton).toHaveCSS(
          "background-color",
          "rgba(0, 0, 0, 0)",
        );
        await removeButton.hover();
        await expect(removeButton).toHaveCSS(
          "background-color",
          "rgb(242, 92, 84)",
        );
      });
    });
  });

  test.describe("focus states", () => {
    test.describe("light mode", () => {
      test("theme toggle button shows focus styles", async ({ page }) => {
        const themeButton = page.locator('header button[role="switch"]');
        await expect(themeButton).toHaveCSS("outline-style", "none");
        await expect(themeButton).toHaveCSS("box-shadow", "none");
        await themeButton.focus();
        await expect(themeButton).toHaveCSS("outline-style", "solid");
        await expect(themeButton).toHaveCSS("box-shadow", /rgb\(199, 34, 26\)/);
      });

      test("tab buttons show focus styles", async ({ page }) => {
        const activeTab = page.getByRole("tab", {
          name: "Active",
          exact: true,
        });
        await expect(activeTab).toHaveCSS("outline-style", "none");
        await activeTab.focus();
        await expect(activeTab).toHaveCSS("outline-style", "solid");
      });

      test("remove button shows focus styles", async ({ page }) => {
        const removeButton = page
          .locator('[role="tabpanel"] button:has-text("Remove")')
          .first();
        await expect(removeButton).toHaveCSS("outline-style", "none");
        await removeButton.focus();
        await expect(removeButton).toHaveCSS("outline-style", "solid");
      });

      test("extension toggle switch shows focus styles", async ({ page }) => {
        const toggleSwitch = page
          .locator('[role="tabpanel"] [role="switch"]')
          .first();
        await expect(toggleSwitch).toHaveCSS("outline-style", "none");
        await toggleSwitch.focus();
        await expect(toggleSwitch).toHaveCSS("outline-style", "solid");
      });
    });

    test.describe("dark mode", () => {
      test.use({ colorScheme: "dark" });

      test("theme toggle button shows dark focus styles", async ({ page }) => {
        const themeButton = page.locator('header button[role="switch"]');
        await expect(themeButton).toHaveCSS("outline-style", "none");
        await themeButton.focus();
        await expect(themeButton).toHaveCSS("outline-style", "solid");
        await expect(themeButton).toHaveCSS("box-shadow", /rgb\(242, 92, 84\)/);
      });

      test("tab buttons show dark focus styles", async ({ page }) => {
        const activeTab = page.getByRole("tab", {
          name: "Active",
          exact: true,
        });
        await expect(activeTab).toHaveCSS("outline-style", "none");
        await activeTab.focus();
        await expect(activeTab).toHaveCSS("outline-style", "solid");
      });

      test("remove button shows dark focus styles", async ({ page }) => {
        const removeButton = page
          .locator('[role="tabpanel"] button:has-text("Remove")')
          .first();
        await expect(removeButton).toHaveCSS("outline-style", "none");
        await removeButton.focus();
        await expect(removeButton).toHaveCSS("outline-style", "solid");
      });

      test("extension toggle switch shows dark focus styles", async ({
        page,
      }) => {
        const toggleSwitch = page
          .locator('[role="tabpanel"] [role="switch"]')
          .first();
        await expect(toggleSwitch).toHaveCSS("outline-style", "none");
        await toggleSwitch.focus();
        await expect(toggleSwitch).toHaveCSS("outline-style", "solid");
      });
    });
  });
});
