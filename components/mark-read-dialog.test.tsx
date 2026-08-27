import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MarkReadDialog } from './mark-read-dialog'

const items = [
  { slug: 'first', title: 'First article' },
  { slug: 'second', title: 'Second article' },
]

describe('MarkReadDialog', () => {
  const onOpenChange = vi.fn()
  const onConfirm = vi.fn()
  const onCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('captures the item list on open and ignores later prop changes while open', () => {
    const { rerender } = render(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    expect(screen.getByText('First article')).toBeInTheDocument()
    expect(screen.getByText('Second article')).toBeInTheDocument()

    // Parent recomputes `items` and adds a row while the dialog is open
    rerender(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={[...items, { slug: 'third', title: 'Third article' }]}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    expect(screen.queryByText('Third article')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mark 2 as read' })).toBeInTheDocument()
  })

  it('keeps a row unchecked when the items prop is replaced with a new array of the same content', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    await user.click(screen.getByLabelText('First article'))
    expect(screen.getByLabelText('First article')).not.toBeChecked()

    // Same content, fresh array identity — as an inline-computed prop produces
    rerender(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items.map(item => ({ ...item }))}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    expect(screen.getByLabelText('First article')).not.toBeChecked()
    expect(screen.getByLabelText('Second article')).toBeChecked()
  })

  it('starts the currently-read article unchecked with a badge and the rest checked', () => {
    render(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items}
        currentlyReadingSlug="second"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    expect(screen.getByLabelText('First article')).toBeChecked()
    expect(screen.getByLabelText('Second article')).not.toBeChecked()
    expect(screen.getByText('czytane teraz')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mark 1 as read' })).toBeInTheDocument()
  })

  it('check all selects every row including the currently-read one', async () => {
    const user = userEvent.setup()
    render(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items}
        currentlyReadingSlug="second"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    await user.click(screen.getByLabelText('Check all'))

    expect(screen.getByLabelText('First article')).toBeChecked()
    expect(screen.getByLabelText('Second article')).toBeChecked()
    expect(screen.getByRole('button', { name: 'Mark 2 as read' })).toBeInTheDocument()
  })

  it('re-derives the snapshot and selection when reopened', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={items}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    await user.click(screen.getByLabelText('First article'))
    expect(screen.getByLabelText('First article')).not.toBeChecked()

    rerender(
      <MarkReadDialog
        open={false}
        onOpenChange={onOpenChange}
        items={items}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    rerender(
      <MarkReadDialog
        open={true}
        onOpenChange={onOpenChange}
        items={[{ slug: 'third', title: 'Third article' }]}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    expect(screen.queryByText('First article')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Third article')).toBeChecked()
    expect(screen.getByRole('button', { name: 'Mark 1 as read' })).toBeInTheDocument()
  })
})
