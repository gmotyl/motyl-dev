# Plan: Advanced Performance Optimization for Article Pages

## 1. The Problem

The current implementation fetches all article metadata at build time and passes it to a client-side component. While this avoids runtime API calls, it results in a large initial page load, as the data for *all* articles is sent to the browser, even though only a fraction is displayed on the first page. This negatively impacts Core Web Vitals like LCP (Largest Contentful Paint) and increases memory usage.

## 2. The Solution: Hybrid Server-Side Pagination & Static-First Load

We will implement a more sophisticated hybrid strategy that leverages the best of both server-side rendering (SSR) and static site generation (SSG). The initial page view will be statically generated and served instantly, while subsequent filtering and pagination will be handled dynamically by the server, ensuring only the necessary data is transferred for each request.

### Step 1: Implement Server-Side Data Logic

-   **Action:** Create a new, comprehensive data-fetching function in `lib/articles.ts`, e.g., `getArticlePageData({ page, filters })`.
-   **Purpose:** To centralize all filtering and pagination logic on the server.
-   **Details:**
    -   This function will accept parameters for the current `page` number, `limit`, and a `filters` object containing `hashtags`, `mode` (`AND`/`OR`), and `unseen` status.
    -   It will perform all filtering and slicing of the article list on the server.
    -   It will return a data structure containing only the articles for the requested page, along with pagination metadata like `totalPages` and `currentPage`.

### Step 2: Refactor Page Components for Dynamic Rendering

-   **Action:** Modify `app/articles/page.tsx` and `app/news/page.tsx`.
-   **Purpose:** To make these pages handle dynamic requests based on URL search parameters.
-   **Details:**
    -   The pages will be `async` components that receive `searchParams` as a prop.
    -   They will parse `page`, `hashtags`, etc., from the `searchParams`.
    -   They will call the new `getArticlePageData` function with these parsed parameters.
    -   The initial, filter-less view (`/articles`) will still be pre-rendered at build time, providing an instant static shell.
    -   The fetched page-specific data (`initialArticles`, `totalPages`, `currentPage`) will be passed as props to the `<ArticlesListing>` component.

### Step 3: Simplify the Client Component (`ArticlesListing`)

-   **Action:** Refactor `components/articles-listing.tsx`.
-   **Purpose:** To make it a "dumb" component that primarily handles UI and user interaction, not data logic.
-   **Details:**
    -   It will no longer contain any data-filtering logic itself.
    -   It will receive `initialArticles`, `totalPages`, and `currentPage` as props and simply render them.

### Step 4: Refactor the `useHashtagFilter` Hook for Navigation

-   **Action:** Overhaul the `app/articles/useHashtagFilter.ts` hook.
-   **Purpose:** To manage filter state and trigger navigation instead of performing client-side filtering.
-   **Details:**
    -   The hook will still use `useState` to track the user's selected `hashtags`, `filterMode`, etc.
    -   When a filter is changed (e.g., `handleHashtagToggle`), the hook will **not** filter any data. Instead, it will construct a new URL with the appropriate search parameters.
    -   It will use the `useRouter` hook from `next/navigation` to push the new URL (e.g., `router.push('/articles?hashtags=react&page=1')`).
    -   This navigation will trigger a new server-side render of the page with the new `searchParams`, causing the updated, filtered data to be fetched and sent to the client.

## 3. Benefits

-   **Optimal Initial Load:** The first page visit is to a lightweight, static page, ensuring the fastest possible LCP and TTI (Time to Interactive).
-   **Efficient Data Transfer:** Only one page of data is sent from the server at a time. No more sending the entire article database to the client.
-   **Fully Interactive UI:** From the user's perspective, the filtering and pagination will feel seamless and instant, as if it were happening on the client.
-   **Scalable:** The application performance will not degrade as the number of articles grows.
-   **Robust:** The application state is encoded in the URL, making it shareable and refresh-proof.