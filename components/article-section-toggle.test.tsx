import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArticleSectionToggle } from './article-section-toggle'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('ArticleSectionToggle', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('renders customize sections button', async () => {
    const onChange = vi.fn()
    render(<ArticleSectionToggle onChange={onChange} />)

    await waitFor(() => {
      expect(screen.getByText('Customize Sections')).toBeInTheDocument()
    })
  })

  it('opens modal when button clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ArticleSectionToggle onChange={onChange} />)

    await waitFor(() => {
      expect(screen.getByText('Customize Sections')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('TLDR')).toBeInTheDocument()
      expect(screen.getByLabelText('Summary')).toBeInTheDocument()
    })
  })

  it('calls onChange when toggling a section', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ArticleSectionToggle onChange={onChange} />)

    await waitFor(() => {
      expect(screen.getByText('Customize Sections')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('TLDR')).toBeInTheDocument()
    })

    const tldrSwitch = screen.getByLabelText('TLDR')
    await user.click(tldrSwitch)

    expect(onChange).toHaveBeenCalled()
    const hiddenTypes = onChange.mock.calls[0][0]
    expect(hiddenTypes.has('tldr')).toBe(true)
  })

  it('persists toggle state to localStorage', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ArticleSectionToggle onChange={onChange} />)

    await waitFor(() => {
      expect(screen.getByText('Customize Sections')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Customize Sections'))

    await waitFor(() => {
      expect(screen.getByLabelText('TLDR')).toBeInTheDocument()
    })

    const tldrSwitch = screen.getByLabelText('TLDR')
    await user.click(tldrSwitch)

    const saved = localStorageMock.getItem('article-hidden-sections')
    expect(saved).toBeTruthy()
    const parsed = JSON.parse(saved!)
    expect(parsed.tldr).toBe(false)
  })
})
