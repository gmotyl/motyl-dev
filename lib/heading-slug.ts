import GithubSlugger from 'github-slugger'

/**
 * Derives the same element id `rehype-slug` assigns to a heading, so
 * `document.getElementById(headingToId(title))` resolves to the rendered `<h2>`.
 *
 * `rehype-slug` uses `github-slugger` under the hood. `github-slugger`'s `slug()`
 * mutates per-instance dedup state (appending `-1`, `-2`, ... to repeated slugs),
 * so we create a fresh slugger per call to keep `headingToId` pure and stateless —
 * it slugs a single title with no cross-heading dedup.
 */
export function headingToId(title: string): string {
  return new GithubSlugger().slug(title)
}
