import { describe, expect, it } from 'vitest'
import { MarkdownContent } from './markdown-content'

// Guards the performance contract: MarkdownContent must be wrapped in React.memo
// so that ~60fps progress ticks on the host reader component (which re-render the
// article subtree) no longer re-render the markdown + SectionPlayFromHere buttons.
// A non-memoized MarkdownContent re-renders on every parent tick, causing the
// "Play from here" hover flicker and dropped clicks during playback.
describe('MarkdownContent memoization', () => {
  it('is wrapped in React.memo', () => {
    expect((MarkdownContent as unknown as { $$typeof?: symbol }).$$typeof).toBe(
      Symbol.for('react.memo'),
    )
  })
})
