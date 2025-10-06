import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - IP Address Tracker Page", () => {
  /** Go to IP Address Tracker page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ip-address-tracker");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | IP Address Tracker");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "IP Address Tracker",
      }),
    ).toBeVisible();
  });

  /** Test if the page has an input group */
  test("has an input group", async ({ page }) => {
    const form = page.locator("form");
    await expect(
      form.getByPlaceholder("Search for any IP address or domain"),
    ).toBeVisible();
    await expect(form.getByRole("button")).toBeVisible();
  });

  /** Test if the page has an ip info card */
  test("has an ip info card", async ({ page }) => {
    const card = page.locator("div").nth(5);
    await expect(card.getByText("IP Address::ffff:127.0.0.1")).toBeVisible();
    await expect(card.getByText("Location-")).toBeVisible();
    await expect(card.getByText("Timezone-")).toBeVisible();
    await expect(card.getByText("ISP-")).toBeVisible();
  });

  /** Test if the page has a leaflet map */
  test("has a leaflet map", async ({ page }) => {
    await page.waitForTimeout(2000);
    const map = page
      .locator("div")
      .filter({ hasText: "Leaflet | © OpenStreetMap contributors" })
      .nth(2);
    await expect(map).toBeVisible();
    // Attribution
    await expect(
      map.getByText("Leaflet | © OpenStreetMap contributors"),
    ).toBeVisible();
  });

  /** Test if the map displays the correct initial position */
  test("map displays correct initial position", async ({ page }) => {
    await page.waitForTimeout(2000);
    const map = page.locator(".leaflet-map-pane");
    const style = await map.getAttribute("style");
    expect(style).toContain("translate3d");
  });

  /** Test if the marker icon is displayed on the map */
  test("displays marker icon on map", async ({ page }) => {
    await page.waitForTimeout(2000);
    const marker = page.locator(".leaflet-marker-icon");
    await expect(marker).toBeVisible();
    await expect(marker).toHaveAttribute(
      "src",
      "/ip-address-tracker/images/icon-location.svg",
    );
  });

  /** Test if the form works */
  test("form works", async ({ page }) => {
    await page.waitForTimeout(2000);
    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    const map = page
      .locator("div")
      .filter({ hasText: "Leaflet | © OpenStreetMap contributors" })
      .nth(2);
    const initialMapPosition = await map
      .locator(".leaflet-proxy")
      .getAttribute("style");
    expect(initialMapPosition).toContain(
      "translate3d(545886px, 382367px, 0px)",
    );
    await expect(map).toBeVisible();
    await input.fill("8.8.8.8");
    await form.getByRole("button").click();
    await page.waitForTimeout(1000);
    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).not.toBeVisible();
    await expect(input).toHaveValue("");
    expect(
      await map.locator(".leaflet-map-pane").getAttribute("style"),
    ).not.toContain("translate3d(545886px, 382367px, 0px)");
    const card = page.locator("div").nth(5);
    await expect(card.getByText("IP Address8.8.8.8")).toBeVisible();
    await expect(card.getByText("ISPGoogle LLC")).toBeVisible();
  });

  /** Test if the page handles API errors gracefully */
  test("handles API errors gracefully", async ({ page }) => {
    // Mock the API response
    await page.route("/api/getIpInfo*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Server error" }),
      });
    });

    const errorMessage = page.getByText("Failed to fetch IP information");
    await expect(errorMessage).not.toBeVisible();

    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    await input.fill("8.8.8.8");
    await form.getByRole("button").click();
    await page.waitForTimeout(1000);

    // Check if the UI shows appropriate error state
    await expect(errorMessage).toBeVisible();
  });

  /** Test form validation with invalid IP address */
  test("form validation rejects invalid IP address", async ({ page }) => {
    const initialAddress = page.getByText("IP Address::ffff:127.0.0.1");
    await expect(initialAddress).toBeVisible();

    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    await input.fill("invalid.ip.address");
    await form.getByRole("button").click();
    await page.waitForTimeout(500);

    await expect(input).toHaveValue("invalid.ip.address");
    await expect(initialAddress).toBeVisible();

    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).toBeVisible();
  });

  test("display error message for empty input", async ({ page }) => {
    // Find the input and submit button
    const input = page.locator('input[type="text"]');
    const submitButton = page.locator('button[type="submit"]');

    // Clear input and click submit
    await input.clear();
    await submitButton.click();

    // Wait for error state to appear
    await page.waitForTimeout(500);

    // Check input has error styling
    await expect(input).toHaveCSS("border-color", "rgb(239, 68, 68)");

    // Check error message is visible with enhanced styling
    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).toBeVisible();

    // Check error message container has enhanced styling
    const errorContainer = errorMessage.locator("..");
    await expect(errorContainer).toHaveCSS(
      "background-color",
      "rgb(239, 68, 68)",
    );
    await expect(errorContainer).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(errorContainer).toHaveCSS("border-radius", "8px");

    // Check error icon is visible
    const errorIcon = page.locator('svg[fill="currentColor"]').first();
    await expect(errorIcon).toBeVisible();
  });

  test("display error message for invalid IP format", async ({ page }) => {
    const input = page.locator('input[type="text"]');
    const submitButton = page.locator('button[type="submit"]');

    // Enter invalid IP format
    await input.fill("invalid-ip");
    await submitButton.click();

    // Wait for error state
    await page.waitForTimeout(500);

    // Check enhanced error styling
    await expect(input).toHaveCSS("border-color", "rgb(239, 68, 68)");

    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).toBeVisible();

    // Check error message container has enhanced styling
    const errorContainer = errorMessage.locator("..");
    await expect(errorContainer).toHaveCSS(
      "background-color",
      "rgb(239, 68, 68)",
    );
    await expect(errorContainer).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(errorContainer).toHaveCSS("border-radius", "8px");
  });

  test("clear error message when valid IP is entered", async ({ page }) => {
    const input = page.locator('input[type="text"]');
    const submitButton = page.locator('button[type="submit"]');

    // First, trigger error with invalid input
    await input.fill("invalid-ip");
    await submitButton.click();

    // Wait for error to appear
    await page.waitForTimeout(500);

    // Verify error is visible
    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).toBeVisible();

    // Enter valid IP
    await input.fill("8.8.8.8");

    // Error should disappear immediately (onChange validation)
    await expect(errorMessage).not.toBeVisible();

    // Input should lose error styling
    await expect(input).not.toHaveCSS("border-color", "rgb(239, 68, 68)");
  });

  test("maintain error state during rapid invalid submissions", async ({
    page,
  }) => {
    const input = page.locator('input[type="text"]');
    const submitButton = page.locator('button[type="submit"]');

    // Rapid invalid submissions
    for (let i = 0; i < 3; i++) {
      await input.fill(`invalid${i}`);
      await submitButton.click();
      await page.waitForTimeout(100);
    }

    // Error should persist and be visible
    const errorMessage = page.locator("text=Please enter a valid IP address");
    await expect(errorMessage).toBeVisible();
  });

  test("should have proper ARIA attributes for error state", async ({
    page,
  }) => {
    const input = page.locator('input[type="text"]');
    const submitButton = page.locator('button[type="submit"]');

    await input.fill("invalid-ip");
    await submitButton.click();

    await page.waitForTimeout(500);

    // Check input has proper ARIA attributes
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("aria-required", "true");

    // Error message should have proper role and live region
    const errorMessage = page.locator('div[role="alert"]');
    await expect(errorMessage).toHaveAttribute("id");

    // Input should be described by error message
    const errorId = await errorMessage.getAttribute("id");
    await expect(input).toHaveAttribute(
      "aria-describedby",
      errorId ?? "ip-address-error",
    );
  });

  test("should clear ARIA attributes when error is resolved", async ({
    page,
  }) => {
    const input = page.locator('input[type="text"]');

    // Trigger error
    await input.fill("invalid-ip");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    // Verify error state
    await expect(input).toHaveAttribute("aria-invalid", "true");

    // Fix the error
    await input.fill("8.8.8.8");

    // ARIA attributes should be cleared
    await expect(input).toHaveAttribute("aria-invalid", "false");
    await expect(input).not.toHaveAttribute("aria-describedby", /.*/);

    // Error message should be removed from DOM or hidden
    const errorMessage = page.locator('div[role="alert"]');
    await expect(errorMessage).not.toBeVisible();
  });

  test("should provide complete context for screen reader users", async ({
    page,
  }) => {
    // Check form has proper label
    const form = page.locator("form");
    await expect(form).toHaveAttribute("aria-labelledby", "main-heading");

    // Check placeholder is descriptive
    const input = page.locator('input[type="text"]');
    await expect(input).toHaveAttribute(
      "placeholder",
      "Search for any IP address or domain",
    );

    // Trigger error and check announcements
    await input.fill("invalid-ip");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    // Error should be properly associated
    const errorMessage = page.locator('div[role="alert"]');
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain("Please enter a valid IP address");
  });

  test("should maintain focus management during error state", async ({
    page,
  }) => {
    const input = page.locator('input[type="text"]');

    // Focus input and trigger error
    await input.focus();
    await input.fill("invalid-ip");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(500);

    // Focus should remain on input or move to error message for screen readers
    const activeElement = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(activeElement).toBe("INPUT");

    // Error message should be accessible to screen readers
    const errorMessage = page.locator('div[role="alert"]');
    const isVisibleToScreenReader = await errorMessage.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        el.getAttribute("aria-hidden") !== "true"
      );
    });

    expect(isVisibleToScreenReader).toBe(true);
  });

  /** Test responsive layout for mobile */
  test("has correct mobile layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("h1")).toHaveCSS("font-size", "26px");
    await expect(page.locator("form")).toHaveCSS("width", "327px");
  });

  /** Test responsive layout for desktop */
  test("has correct desktop layout", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    await expect(page.locator("h1")).toHaveCSS("font-size", "32px");
    await expect(page.locator("form")).toHaveCSS("width", "555px");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
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
