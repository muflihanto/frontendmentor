import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, type Page, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Browser extensions manager UI page", () => {
  // Common selectors to consolidate locators (DRY)
  const getThemeToggle = (page: Page) =>
    page.locator('header button[role="switch"]');
  const getExtensionCards = (page: Page) =>
    page.locator('[role="tabpanel"] > div');
  const getTab = (page: Page, name: "All" | "Active" | "Inactive") =>
    page.getByRole("tab", { name, exact: true });

  async function toggleAndVerify(element: Locator) {
    const checked = await element.getAttribute("aria-checked");
    await element.click();
    await expect(element).toHaveAttribute(
      "aria-checked",
      checked === "true" ? "false" : "true",
    );
  }

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
    const themeButton = getThemeToggle(page);
    await expect(themeButton).toBeVisible();
  });

  /** Test theme toggle switches between dark and light mode */
  test("theme toggle switches dark/light mode", async ({ page }) => {
    const themeButton = getThemeToggle(page);

    await expect(themeButton).toBeVisible();

    await toggleAndVerify(themeButton);
  });

  /** Test theme toggle can be operated with keyboard */
  test("theme toggle can be operated with keyboard", async ({ page }) => {
    const themeButton = getThemeToggle(page);

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
    const themeButton = getThemeToggle(page);
    await expect(themeButton).toBeVisible();

    // Get initial state and toggle to opposite
    const initialAriaChecked = await themeButton.getAttribute("aria-checked");
    await toggleAndVerify(themeButton);

    // Verify toggle happened
    const toggledAriaChecked = initialAriaChecked === "true" ? "false" : "true";

    // Reload page
    await page.reload();

    // Verify theme persisted after reload
    const themeButtonAfterReload = getThemeToggle(page);
    await expect(themeButtonAfterReload).toHaveAttribute(
      "aria-checked",
      toggledAriaChecked,
    );
  });

  /** Test extension cards are displayed */
  test("displays extension cards", async ({ page }) => {
    const extensionCards = getExtensionCards(page);
    await expect(extensionCards.first()).toBeVisible();
  });

  /** Test extension toggle switches have correct aria-checked */
  test("extension toggle switches toggle aria-checked on click", async ({
    page,
  }) => {
    const extensionCards = getExtensionCards(page);
    const count = await extensionCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = extensionCards.nth(i);
      const toggleButton = card.locator('[role="switch"]').first();

      await expect(toggleButton).toBeVisible();

      await toggleAndVerify(toggleButton);
      await toggleAndVerify(toggleButton);
    }
  });

  /** Test that extension state persists after page reload */
  test("extension active/inactive state persists after page reload", async ({
    page,
  }) => {
    const firstToggle = getExtensionCards(page)
      .locator('[role="switch"]')
      .first();
    const extensionName = await getExtensionCards(page)
      .locator("h2")
      .first()
      .textContent();

    // Toggle the extension
    const initialChecked = await firstToggle.getAttribute("aria-checked");
    await toggleAndVerify(firstToggle);

    // Reload page
    await page.reload();

    // Find the same extension and verify its state
    const extensionCard = getExtensionCards(page).filter({
      has: page.locator("h2", { hasText: extensionName ?? "" }),
    });
    const toggleAfterReload = extensionCard.locator('[role="switch"]').first();

    await expect(toggleAfterReload).toHaveAttribute(
      "aria-checked",
      initialChecked === "true" ? "false" : "true",
    );
  });

  /** Test tab filters work */
  test("tab filters filter extensions", async ({ page }) => {
    const allTab = getTab(page, "All");
    const activeTab = getTab(page, "Active");
    const inactiveTab = getTab(page, "Inactive");

    await expect(allTab).toHaveAttribute("aria-selected", "true");

    await activeTab.click();
    await expect(activeTab).toHaveAttribute("aria-selected", "true");

    await inactiveTab.click();
    await expect(inactiveTab).toHaveAttribute("aria-selected", "true");
  });

  /** Test keyboard navigation between tabs */
  test("keyboard navigation works for tabs", async ({ page }) => {
    const allTab = getTab(page, "All");
    const activeTab = getTab(page, "Active");
    const inactiveTab = getTab(page, "Inactive");

    // Focus first tab
    await allTab.focus();
    await expect(allTab).toBeFocused();

    // Navigate with arrow keys
    await page.keyboard.press("ArrowRight");
    await expect(activeTab).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(inactiveTab).toBeFocused();

    // Navigate back
    await page.keyboard.press("ArrowLeft");
    await expect(activeTab).toBeFocused();

    // Navigate first tab
    await page.keyboard.press("Home");
    await expect(allTab).toBeFocused();

    // Navigate last tab
    await page.keyboard.press("End");
    await expect(inactiveTab).toBeFocused();
  });

  /** Test that focus is managed appropriately */
  test("focus management works as expected", async ({ page }) => {
    // Test focus ring appears on tabbable elements
    const focusableElements = [
      getThemeToggle(page),
      getTab(page, "All"),
      getExtensionCards(page).locator('[role="switch"]').first(),
      page.locator('[role="tabpanel"] button:has-text("Remove")').first(),
    ];

    for (const element of focusableElements) {
      await element.focus();
      await expect(element).toHaveCSS("outline-style", "solid");
    }
  });

  test("displays correct initial extension counts in tabs", async ({
    page,
  }) => {
    const allExtensionsCount = await getExtensionCards(page).count();
    expect(allExtensionsCount).toBe(12); // Based on data.json

    await getTab(page, "Active").click();
    const activeCount = await getExtensionCards(page).count();

    await getTab(page, "Inactive").click();
    const inactiveCount = await getExtensionCards(page).count();

    expect(activeCount + inactiveCount).toBe(allExtensionsCount);
  });

  /** Test extension card content is displayed correctly */
  test("extension card displays all required information", async ({ page }) => {
    const firstCard = getExtensionCards(page).first();

    // logo
    await expect(firstCard.locator("img")).toBeVisible();

    // name
    await expect(firstCard.locator("h2")).toBeVisible();

    // description
    await expect(firstCard.locator("p")).toBeVisible();

    // Remove button
    const firstExtensionName = await firstCard.locator("h2").textContent();
    await expect(firstCard.locator("button:has-text('Remove')")).toBeVisible();
    await expect(
      firstCard.locator("button:has-text('Remove')"),
    ).toHaveAccessibleName(`Remove ${firstExtensionName} extension`);

    // toggle switch
    await expect(firstCard.locator('[role="switch"]')).toBeVisible();
  });

  /** Test extension toggle affects tab filtering */
  test("toggling extension updates filtered tab view", async ({ page }) => {
    const activeTab = getTab(page, "Active");
    const inactiveTab = getTab(page, "Inactive");

    // Go to Active tab and get first active extension
    await activeTab.click();
    const initialActiveCount = await getExtensionCards(page).count();
    expect(initialActiveCount).toBeGreaterThan(0);

    const firstActiveCard = getExtensionCards(page).first();
    const toggleButton = firstActiveCard.locator('[role="switch"]').first();
    const extensionName = await firstActiveCard.locator("h2").textContent();
    expect(extensionName).not.toBeNull();

    // Toggle it off - should disappear from Active tab
    await toggleButton.click();
    await expect(
      getExtensionCards(page).first(),
      // biome-ignore lint/style/noNonNullAssertion: TypeScript doesn't narrow after expect assertion, but we verified it's not null above
    ).not.toHaveText(extensionName!);

    // Go to Inactive tab and verify it appears there
    await inactiveTab.click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).toBeVisible();

    // Toggle it back on - should disappear from Inactive tab
    const inactiveCard = getExtensionCards(page).filter({
      has: page.locator("h2", { hasText: extensionName ?? "" }),
    });
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
    const extensionCards = getExtensionCards(page);
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
    const allTab = getTab(page, "All");
    await allTab.click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();
  });

  /** Test that removed extensions are removed from all tabs */
  test("removed extension disappears from all tabs", async ({ page }) => {
    // Get first extension name from All tab
    const firstCard = getExtensionCards(page).first();
    const extensionName = await firstCard.locator("h2").textContent();
    expect(extensionName).not.toBeNull();

    // Remove the extension
    await firstCard.locator("button:has-text('Remove')").click();

    // Check All tab - should be gone
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Check Active tab
    await getTab(page, "Active").click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();

    // Check Inactive tab
    await getTab(page, "Inactive").click();
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();
  });

  /** Test remove button can be activated with keyboard */
  test("remove buttons can be activated with keyboard", async ({ page }) => {
    const firstCard = getExtensionCards(page).first();
    const extensionName = await firstCard.locator("h2").textContent();
    const initialCount = await getExtensionCards(page).count();

    // Focus and activate remove button with Enter
    const removeButton = firstCard.locator("button:has-text('Remove')");
    await removeButton.focus();
    await expect(removeButton).toBeFocused();
    await page.keyboard.press("Enter");

    // Verify extension was removed
    await expect(getExtensionCards(page)).toHaveCount(initialCount - 1);
    await expect(
      page.locator(`[role="tabpanel"] h2:has-text("${extensionName}")`),
    ).not.toBeVisible();
  });

  /** Test that all images load correctly */
  test("all extension logos load successfully", async ({ page }) => {
    const images = page.locator('[role="tabpanel"] img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      // Check if image is visible and has valid src
      await expect(image).toBeVisible();
      const src = await image.getAttribute("src");
      expect(src).toBeTruthy();

      // Verify image loaded successfully (no broken images)
      const naturalWidth = await image.evaluate(
        (img: HTMLImageElement) => img.naturalWidth,
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test("recovers gracefully from corrupted localStorage data", async ({
    page,
  }) => {
    // Set corrupted JSON
    await page.addInitScript(() => {
      localStorage.setItem("browser-extensions-state", "{invalid json");
    });
    await page.goto("/browser-extensions-manager-ui");

    // Wait for UI to be stable
    await expect(getExtensionCards(page).first()).toBeVisible();

    // Verify that extensions are in default state (you may need to know initial active count)
    const activeTab = getTab(page, "Active");
    await activeTab.click();
    const activeCount = await getExtensionCards(page).count();
    // Compare with expected default active count from data.json
    expect(activeCount).toBe(8);

    // Check that localStorage now contains valid JSON
    const isValid = await page.evaluate(() => {
      const stored = localStorage.getItem("browser-extensions-state");
      if (!stored) return false;
      try {
        const parsed: unknown = JSON.parse(stored);
        // Ensure it's an object (not array or null) and has expected shape
        return (
          typeof parsed === "object" &&
          parsed !== null &&
          !Array.isArray(parsed)
        );
      } catch {
        return false;
      }
    });

    expect(isValid).toBe(true);
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

  test("theme toggle shows sun icon in dark mode and moon icon in light mode", async ({
    page,
  }) => {
    const themeButton = getThemeToggle(page);

    // Helper to check visibility of a group by its href content
    const isGroupVisible = async (hrefPattern: string) => {
      const group = page.locator(`svg g:has(use[href*="${hrefPattern}"])`);
      const classes = await group.getAttribute("class");
      return classes?.includes("block") ?? false;
    };

    // Start in light mode (moon visible)
    expect(await isGroupVisible("icon-moon")).toBe(true);
    expect(await isGroupVisible("icon-sun")).toBe(false);

    await themeButton.click();

    // After toggle, dark mode (sun visible)
    expect(await isGroupVisible("icon-sun")).toBe(true);
    expect(await isGroupVisible("icon-moon")).toBe(false);
  });

  const hoverTests = [
    {
      name: "theme toggle button",
      locator: getThemeToggle,
      lightCssProp: "background-color",
      lightDefault: "rgb(237, 237, 237)",
      lightHover: "rgb(199, 199, 199)",
      darkCssProp: "background-color",
      darkDefault: "rgb(47, 54, 75)",
      darkHover: "rgb(84, 89, 105)",
    },
    {
      name: "tab buttons",
      locator: (page: Page) => getTab(page, "Active"),
      lightCssProp: "color",
      lightDefault: "rgb(9, 21, 62)",
      lightHover: "rgb(84, 89, 105)",
      darkCssProp: "background-color",
      darkDefault: "rgb(33, 38, 54)",
      darkHover: "rgb(84, 89, 105)",
    },
    {
      name: "remove button",
      locator: (page: Page) =>
        page.locator('[role="tabpanel"] button:has-text("Remove")').first(),
      lightCssProp: "background-color",
      lightDefault: "rgb(251, 253, 254)",
      lightHover: "rgb(199, 34, 26)",
      darkCssProp: "background-color",
      darkDefault: "rgba(0, 0, 0, 0)",
      darkHover: "rgb(242, 92, 84)",
    },
  ];

  test.describe("hover states", () => {
    test.describe("light mode", () => {
      for (const t of hoverTests) {
        test(`${t.name} shows hover styles`, async ({ page }) => {
          const el = t.locator(page);
          await expect(el).toHaveCSS(t.lightCssProp, t.lightDefault);
          await el.hover();
          await expect(el).toHaveCSS(t.lightCssProp, t.lightHover);
        });
      }
    });

    test.describe("dark mode", () => {
      test.use({ colorScheme: "dark" });
      for (const t of hoverTests) {
        test(`${t.name} shows dark hover styles`, async ({ page }) => {
          const el = t.locator(page);
          await expect(el).toHaveCSS(t.darkCssProp, t.darkDefault);
          await el.hover();
          await expect(el).toHaveCSS(t.darkCssProp, t.darkHover);
        });
      }
    });
  });

  const focusTests = [
    {
      name: "theme toggle button",
      locator: getThemeToggle,
      lightShadow: /rgb\(199, 34, 26\)/,
      darkShadow: /rgb\(242, 92, 84\)/,
    },
    {
      name: "tab buttons",
      locator: (page: Page) => getTab(page, "Active"),
    },
    {
      name: "remove button",
      locator: (page: Page) =>
        page.locator('[role="tabpanel"] button:has-text("Remove")').first(),
    },
    {
      name: "extension toggle switch",
      locator: (page: Page) =>
        page.locator('[role="tabpanel"] [role="switch"]').first(),
    },
  ];

  test.describe("focus states", () => {
    test.describe("light mode", () => {
      for (const t of focusTests) {
        test(`${t.name} shows focus styles`, async ({ page }) => {
          const el = t.locator(page);
          await expect(el).toHaveCSS("outline-style", "none");
          if (t.lightShadow) {
            await expect(el).toHaveCSS("box-shadow", "none");
          }
          await el.focus();
          await expect(el).toHaveCSS("outline-style", "solid");
          if (t.lightShadow) {
            await expect(el).toHaveCSS("box-shadow", t.lightShadow);
          }
        });
      }
    });

    test.describe("dark mode", () => {
      test.use({ colorScheme: "dark" });
      for (const t of focusTests) {
        test(`${t.name} shows dark focus styles`, async ({ page }) => {
          const el = t.locator(page);
          await expect(el).toHaveCSS("outline-style", "none");
          await el.focus();
          await expect(el).toHaveCSS("outline-style", "solid");
          if (t.darkShadow) {
            await expect(el).toHaveCSS("box-shadow", t.darkShadow);
          }
        });
      }
    });
  });
});
