import { test, expect } from "@playwright/test";

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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
