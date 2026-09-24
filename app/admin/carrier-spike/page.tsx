import { requireSuperAdmin } from '@/lib/auth/require-super-admin'

import CarrierSpikeClient from './page.client'

export const metadata = {
  title: 'Carrier spike',
}

/**
 * A permanent measurement bench, not a feature: it plays eight fixed fragments
 * through three selectable carriers so a screen-off device run can tell a real
 * fix from a lenient afternoon. Gated because it burns TTS synthesis and puts
 * an unexplained audio player on the site for anyone who finds the URL.
 *
 * The guard runs before anything renders: signed out → sign-in, returning here
 * afterwards; signed in without SuperAdmin → home.
 */
export default async function CarrierSpikePage() {
  await requireSuperAdmin('/admin/carrier-spike')

  return <CarrierSpikeClient />
}
