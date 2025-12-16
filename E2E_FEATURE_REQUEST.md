# E2E Test Setup and Initial Test Case Implementation

## Objective

To prevent future regressions and ensure the stability of the Motyl.dev application, we need to implement an End-to-End (E2E) testing framework. This task involves setting up the framework and creating an initial set of tests, starting with a critical user flow that was recently the source of a bug.

## 1. E2E Framework Setup

**Task:**

1.  **Choose and Integrate an E2E Framework:** Select a modern E2E testing framework that integrates well with a Next.js and Vitest-based project. The recommended choice is **Playwright** due to its robustness, speed, and excellent feature set (like auto-waits and tracing).

2.  **Configuration:**
    *   Add the necessary dependencies to `package.json` (e.g., `@playwright/test`).
    *   Initialize the Playwright configuration (`playwright.config.ts`).
    *   Configure the framework to work with the local development server (`pnpm dev`). The base URL should be `http://localhost:3000`.

3.  **CI/CD Integration:**
    *   Update the `package.json` scripts to include a new script for running E2E tests (e.g., `"test:e2e": "playwright test"`).
    *   Ensure that the setup is compatible with a CI/CD environment (like Vercel or GitHub Actions) for future integration, although implementing the full CI/CD pipeline is out of scope for this initial task.

## 2. Initial Test Case: Mark Article as Visited

This first test case is critical as it covers a regression that was recently introduced and fixed. It will ensure that the application correctly tracks when a user has visited an article.

**User Story:**

As a user, when I visit an article from the articles list, I expect the application to remember my visit, so that when I return to the list, the "unseen" article count is correctly updated.

**Test Implementation (`tests/e2e/mark-as-visited.spec.ts`):

**Scenario: Mark an article as visited and verify the unseen count**

1.  **Given** the user is on the articles page (`/articles`).
2.  **And** there is at least one article visible.
3.  **When** the user notes the initial count of "unseen" articles from a specific UI element (e.g., a badge or text).
4.  **And** the user clicks on the link of the first article in the list.
5.  **Then** the application navigates to the article's page (`/articles/[slug]`).
6.  **When** the user navigates back to the articles page (`/articles`).
7.  **Then** the count of "unseen" articles should be the initial count minus one.

**Implementation Details:**

*   Use clear and descriptive locators for all UI elements (e.g., `data-testid` attributes) to make the test resilient to style and layout changes. If such attributes do not exist, add them as part of this task.
*   The test should be self-contained and not rely on the state of other tests.
*   Ensure local storage is cleared before each test run to provide a clean state.

## Agent Instructions

-   Follow the project conventions for code style and structure.
-   Ensure all new dependencies are added via `pnpm install`.
-   After setting up Playwright and writing the first test, run the test suite to confirm that it passes successfully.
-   The final deliverable should be the new configuration files, the test script, and any necessary modifications to the application code (like adding `data-testid` attributes).
