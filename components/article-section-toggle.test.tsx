import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArticleSectionToggle } from './article-section-toggle'
import type { SectionType } from '@/lib/section-filter'

function makeHiddenSections(...ids: SectionType[]): Set<SectionType> {
  return new Set(ids)
}

describe('ArticleSectionToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders customize sections button', () => {
    const onToggle = vi.fn()
    render(
      <ArticleSectionToggle
        hiddenSections={makeHiddenSections('summary', 'keyTakeaways', 'tradeoffs')}
        onToggle={onToggle}
      />
    )

    expect(screen.getByText('Customize Sections')).toBeInTheDocument()
  })

  it('opens modal when button clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <ArticleSectionToggle
        hiddenSections={makeHiddenSections('summary', 'keyTakeaways', 'tradeoffs')}
        onToggle={onToggle}
      />
    )

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('TLDR')).toBeInTheDocument()
      expect(screen.getByLabelText('Summary')).toBeInTheDocument()
    })
  })

  it('calls onToggle when toggling a section', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <ArticleSectionToggle
        hiddenSections={makeHiddenSections('summary', 'keyTakeaways', 'tradeoffs')}
        onToggle={onToggle}
      />
    )

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('TLDR')).toBeInTheDocument()
    })

    const tldrSwitch = screen.getByLabelText('TLDR')
    await user.click(tldrSwitch)

    expect(onToggle).toHaveBeenCalled()
    const [sectionId, visible] = onToggle.mock.calls[onToggle.mock.calls.length - 1]
    expect(sectionId).toBe('tldr')
    expect(typeof visible).toBe('boolean')
  })

  it('reflects hidden state via switch checked prop', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    // summary is hidden, tldr is visible
    render(
      <ArticleSectionToggle
        hiddenSections={makeHiddenSections('summary', 'keyTakeaways', 'tradeoffs')}
        onToggle={onToggle}
      />
    )

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('Summary')).toBeInTheDocument()
    })

    const summarySwitch = screen.getByLabelText('Summary')
    const tldrSwitch = screen.getByLabelText('TLDR')

    // summary is hidden → switch should be unchecked
    expect(summarySwitch).not.toBeChecked()
    // tldr is visible → switch should be checked
    expect(tldrSwitch).toBeChecked()
  })

  it('calls onToggle with correct args when enabling a hidden section', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <ArticleSectionToggle
        hiddenSections={makeHiddenSections('summary')}
        onToggle={onToggle}
      />
    )

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('Summary')).toBeInTheDocument()
    })

    const summarySwitch = screen.getByLabelText('Summary')
    await user.click(summarySwitch)

    expect(onToggle).toHaveBeenCalledWith('summary', true)
  })
})
