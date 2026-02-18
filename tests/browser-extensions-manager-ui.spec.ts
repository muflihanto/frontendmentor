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

  /** Test theme toggle can be operated with keyboard */
  test("theme toggle can be operated with keyboard", async ({ page }) => {
    const themeButton = page.locator('header button[role="switch"]');

    await themeButton.focus();
    await expect(themeButton).toBeFocused();

    const initialChecked = await themeButton.getAttribute("aria-checked");

    // Toggle with Space key
    await page.keyboard.press("Space");
    await expect(themeButton).toHaveAttribute(
      "aria-checked",
      initialChecked === "true" ? "false" : "true",
    );

    // Toggle with Enter key
    await page.keyboard.press("Enter");
    await expect(themeButton).toHaveAttribute(
      "aria-checked",
      initialChecked === "true" ? "true" : "false",
    );
  });

  /** Test theme preference persists after page reload */
  test("theme preference persists after page reload", async ({ page }) => {
    const themeButton = page.locator('header button[role="switch"]');
    await expect(themeButton).toBeVisible();

    // Get initial state and toggle to opposite
    const initialAriaChecked = await themeButton.getAttribute("aria-checked");
    await themeButton.click();

    // Verify toggle happened
    const toggledAriaChecked = initialAriaChecked === "true" ? "false" : "true";
    await expect(themeButton).toHaveAttribute(
      "aria-checked",
      toggledAriaChecked,
    );

    // Reload page
    await page.reload();

    // Verify theme persisted after reload
    const themeButtonAfterReload = page.locator('header button[role="switch"]');
    await expect(themeButtonAfterReload).toHaveAttribute(
      "aria-checked",
      toggledAriaChecked,
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

  test("displays correct initial extension counts in tabs", async ({
    page,
  }) => {
    const allExtensionsCount = await page
      .locator('[role="tabpanel"] > div')
      .count();
    expect(allExtensionsCount).toBe(12); // Based on data.json

    await page.getByRole("tab", { name: "Active", exact: true }).click();
    const activeCount = await page.locator('[role="tabpanel"] > div').count();

    await page.getByRole("tab", { name: "Inactive", exact: true }).click();
    const inactiveCount = await page.locator('[role="tabpanel"] > div').count();

    expect(activeCount + inactiveCount).toBe(allExtensionsCount);
  });

  /** Test extension card content is displayed correctly */
  test("extension card displays all required information", async ({ page }) => {
    const firstCard = page.locator('[role="tabpanel"] > div').first();

    // logo
    await expect(firstCard.locator("img")).toBeVisible();

    // name
    await expect(firstCard.locator("h2")).toBeVisible();

    // description
    await expect(firstCard.locator("p")).toBeVisible();

    // Remove button
    await expect(firstCard.locator("button:has-text('Remove')")).toBeVisible();

    // toggle switch
    await expect(firstCard.locator('[role="switch"]')).toBeVisible();
  });

  /** Test extension toggle affects tab filtering */
  test("toggling extension updates filtered tab view", async ({ page }) => {
    const activeTab = page.getByRole("tab", { name: "Active", exact: true });
    const inactiveTab = page.getByRole("tab", {
      name: "Inactive",
      exact: true,
    });

    // Go to Active tab and get first active extension
    await activeTab.click();
    const initialActiveCount = await page
      .locator('[role="tabpanel"] > div')
      .count();
    expect(initialActiveCount).toBeGreaterThan(0);

    const firstActiveCard = page.locator('[role="tabpanel"] > div').first();
    const toggleButton = firstActiveCard.locator('[role="switch"]').first();
    const extensionName = await firstActiveCard.locator("h2").textContent();
    expect(extensionName).not.toBeNull();

    // Toggle it off - should disappear from Active tab
    await toggleButton.click();
    await expect(
      page
        .locator('[role="tabpanel"] > div')
        .first(),
      // biome-ignore lint/style/noNonNullAssertion: TypeScript doesn't narrow after expect assertion, but we verified it's not null above
    ).not.toHaveText(extensionName!);

    // Go to Inactive tab and verify it appears there
    await inactiveTab.click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).toBeVisible();

    // Toggle it back on - should disappear from Inactive tab
    const inactiveCard = page
      .locator(`[role="tabpanel"] h2:has-text("${extensionName}")`)
      .locator("..")
      .locator("..")
      .locator("..");
    await inactiveCard.locator('[role="switch"]').first().click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Go back to Active tab and verify it appears there
    await activeTab.click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).toBeVisible();
  });

  /** Test remove button removes extension from list */
  test("remove button removes extension from list", async ({ page }) => {
    const extensionCards = page.locator('[role="tabpanel"] > div');
    const initialCount = await extensionCards.count();
    expect(initialCount).toBeGreaterThan(0);

    const firstCard = extensionCards.first();
    const extensionName = await firstCard.locator("h2").textContent();
    expect(extensionName).not.toBeNull();

    const removeButton = firstCard.locator("button:has-text('Remove')");
    await removeButton.click();

    // Verify card count decreased
    await expect(extensionCards).toHaveCount(initialCount - 1);

    // Verify the removed extension is no longer visible
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Switch to All tab and verify it's still gone
    const allTab = page.getByRole("tab", { name: "All", exact: true });
    await allTab.click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();
  });

  /** Test that removed extensions are removed from all tabs */
  test("removed extension disappears from all tabs", async ({ page }) => {
    // Get first extension name from All tab
    const firstCard = page.locator('[role="tabpanel"] > div').first();
    const extensionName = await firstCard.locator("h2").textContent();
    expect(extensionName).not.toBeNull();

    // Remove the extension
    await firstCard.locator("button:has-text('Remove')").click();

    // Check All tab - should be gone
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Check Active tab
    await page.getByRole("tab", { name: "Active", exact: true }).click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Check Inactive tab
    await page.getByRole("tab", { name: "Inactive", exact: true }).click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();
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
