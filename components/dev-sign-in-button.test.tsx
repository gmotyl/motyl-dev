import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const signIn = vi.fn()
vi.mock('next-auth/react', () => ({ signIn: (...args: unknown[]) => signIn(...args) }))

import { DevSignInButton } from './dev-sign-in-button'

describe('DevSignInButton', () => {
  beforeEach(() => {
    signIn.mockClear()
    // The component gates on NODE_ENV as well as the bypass flag. Pin it here so
    // these tests don't depend on the ambient NODE_ENV of whoever runs them —
    // vitest defaults it to "test", while a shell exporting "development" would
    // mask a broken gate.
    vi.stubEnv('NODE_ENV', 'development')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders nothing when NEXT_PUBLIC_DEV_AUTH_BYPASS is not true', () => {
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'false')
    const { container } = render(<DevSignInButton />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing outside development even when the bypass flag is set', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'true')
    const { container } = render(<DevSignInButton />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders both Admin and User dev-login buttons when enabled', () => {
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'true')
    render(<DevSignInButton />)
    expect(screen.getByTestId('dev-login-admin')).toBeInTheDocument()
    expect(screen.getByTestId('dev-login-user')).toBeInTheDocument()
  })

  it('Admin button signs in with the superadmin email', () => {
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'true')
    vi.stubEnv('NEXT_PUBLIC_SUPERADMIN_EMAIL', 'boss@example.com')
    render(<DevSignInButton />)
    fireEvent.click(screen.getByTestId('dev-login-admin'))
    expect(signIn).toHaveBeenCalledWith('dev-credentials', {
      email: 'boss@example.com',
      callbackUrl: '/',
    })
  })

  it('Admin button falls back to superadmin@localhost when NEXT_PUBLIC_SUPERADMIN_EMAIL is unset', () => {
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'true')
    vi.stubEnv('NEXT_PUBLIC_SUPERADMIN_EMAIL', undefined as unknown as string)
    render(<DevSignInButton />)
    fireEvent.click(screen.getByTestId('dev-login-admin'))
    expect(signIn).toHaveBeenCalledWith('dev-credentials', {
      email: 'superadmin@localhost',
      callbackUrl: '/',
    })
  })

  it('User button signs in with the regular user email', () => {
    vi.stubEnv('NEXT_PUBLIC_DEV_AUTH_BYPASS', 'true')
    render(<DevSignInButton />)
    fireEvent.click(screen.getByTestId('dev-login-user'))
    expect(signIn).toHaveBeenCalledWith('dev-credentials', {
      email: 'user@localhost',
      callbackUrl: '/',
    })
  })
})
