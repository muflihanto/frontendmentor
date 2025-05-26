import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import raw_data from "../public/interactive-comments-section/data.json";

interface User {
  image: { png: string; webp: string };
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}

function flattenComments(rootComment: Comment[]): Comment[] {
  let stack: Comment[] = [...rootComment];
  const flattened: Comment[] = [];

  while (stack.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const comment = stack.pop()!;
    flattened.push({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      score: comment.score,
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp,
        },
        username: comment.user.username,
      },
      replies: [],
    });

    if (comment.replies !== undefined) {
      for (let i = comment.replies.length - 1; i >= 0; i--) {
        stack.push(comment.replies[i]);
      }
    }
  }

  stack = [];
  return flattened;
}

const comments = flattenComments(raw_data.comments as unknown as Comment[]);

test.describe("FrontendMentor Challenge - Interactive comments section Page", () => {
  /** Go to Interactive comments section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-comments-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive comments section",
    );
  });

  /** Test if the page has an 'Add a comment' form */
  test.describe("has an 'Add a comment' form", () => {
    test("has all elements", async ({ page }) => {
      const form = page.locator("form");
      await expect(
        form.getByRole("img", { name: "juliusomo Avatar" }),
      ).toBeVisible();
      await expect(form.getByPlaceholder("Add a comment...")).toBeVisible();
      await expect(form.getByRole("button", { name: "Send" })).toBeVisible();
    });
  });

  /** Test if the page has comments */
  test("has all comments", async ({ page }) => {
    const currentUser = raw_data.currentUser.username;
    for (const comment of comments) {
      const article = page.getByRole("article", {
        name: `Comment by ${comment.user.username}`,
      });
      await expect(article).toBeVisible();
      await expect(
        article.getByRole("img", { name: `${comment.user.username}'s avatar` }),
      ).toBeVisible();
      await expect(
        article.getByRole("heading", {
          name: `Comment by ${comment.user.username}`,
        }),
      ).toBeVisible();
      await expect(
        article.locator(`id=comment${comment.id}-author`),
      ).toBeVisible();
      await expect(
        article.locator(`id=comment${comment.id}-time`),
      ).toBeVisible();
      await expect(article.getByText(comment.content)).toBeVisible();
      if (comment.user.username === currentUser) {
        await expect(article.getByLabel("Delete my comment")).toBeVisible();
        await expect(
          article.getByRole("button", { name: "Edit" }),
        ).toBeVisible();
      } else {
        await expect(
          article.getByRole("button", { name: "Reply to comment" }),
        ).toBeVisible();
      }
      await expect(
        article.getByRole("button", { name: "Upvote comment" }),
      ).toBeVisible();
      await expect(article.getByLabel(`${comment.score} votes`)).toBeVisible();
      await expect(
        article.getByRole("button", { name: "Downvote comment" }),
      ).toBeVisible();
    }
  });

  /** Test comment voting functionality */
  test.describe("comment voting", () => {
    test("can upvote a comment", async ({ page }) => {
      const comment = comments[0];
      const voteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Upvote comment" });

      await voteButton.click();
      const scoreElement = page.locator(`id=comment${comment.id}-votes`);
      await expect(scoreElement).toHaveText(String(comment.score + 1));
    });

    test("can downvote a comment", async ({ page }) => {
      const comment = comments[0];
      const voteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Downvote comment" });

      await voteButton.click();
      const scoreElement = page.locator(`id=comment${comment.id}-votes`);
      await expect(scoreElement).toHaveText(String(comment.score - 1));
    });
  });

  /** Test comment submission */
  test.describe("comment submission", () => {
    test("can submit a new comment", async ({ page }) => {
      const form = page.locator("form");
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      await textarea.fill("This is a test comment");
      await submitButton.click();

      await expect(
        page.getByText("This is a test comment").first(),
      ).toBeVisible();
    });
  });

  /** Test reply functionality */
  test.describe("reply functionality", () => {
    test("can open reply form", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();
      await expect(
        page.getByPlaceholder("Add a comment...").nth(1),
      ).toBeVisible();
    });

    test("can submit a reply", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();

      const replyForm = page.locator("form").filter({ hasText: "Reply" });
      const textarea = replyForm.getByPlaceholder("Add a comment...");
      const submitButton = replyForm.getByRole("button", {
        name: "Reply",
        exact: true,
      });

      await textarea.fill(`@${comment.user.username} This is a test reply`);
      await submitButton.click();

      await expect(
        page.getByText(`@${comment.user.username} This is a test reply`),
      ).toBeVisible();
    });
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
