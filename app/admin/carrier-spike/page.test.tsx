import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth/require-super-admin', () => ({
  requireSuperAdmin: vi.fn(async () => undefined),
}))
vi.mock('./page.client', () => ({
  default: () => <div data-testid="carrier-spike-client" />,
}))

import { requireSuperAdmin } from '@/lib/auth/require-super-admin'

import CarrierSpikePage from './page'

/**
 * The callback path is the whole point of this file. `requireSuperAdmin` is
 * already covered on its own, and the page awaits it — but nothing pinned the
 * string it is awaited with. A typo there still guards the page and still
 * signs the operator in; it just lands them somewhere else afterwards, and
 * this route is the URL the runbook tells them to open on a phone.
 */
describe('CarrierSpikePage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('guards with the exact /admin/carrier-spike callback path', async () => {
    await CarrierSpikePage()

    expect(requireSuperAdmin).toHaveBeenCalledWith('/admin/carrier-spike')
    expect(requireSuperAdmin).toHaveBeenCalledTimes(1)
  })

  it('never renders the bench when the guard redirects', async () => {
    vi.mocked(requireSuperAdmin).mockRejectedValueOnce(new Error('REDIRECT'))

    await expect(CarrierSpikePage()).rejects.toThrow('REDIRECT')
  })

  it('renders the client bench for a SuperAdmin', async () => {
    render(await CarrierSpikePage())

    expect(screen.getByTestId('carrier-spike-client')).toBeInTheDocument()
  })
})
