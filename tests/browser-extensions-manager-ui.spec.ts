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
      const activeTab = page.getByRole("tab", { name: "Active", exact: true });
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
});
