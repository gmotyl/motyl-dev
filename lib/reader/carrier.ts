/**
 * What carries the reader's audio to the one `<audio>` element.
 *
 * Two strategies sit behind this interface and they disagree about what a unit
 * IS. To the src-swap carrier a unit is a file: playing unit 3 means pointing
 * the element at unit 3's object URL and starting it. To the MSE carrier a unit
 * is a RANGE on one continuous timeline: playing unit 3 means moving the
 * playhead to where unit 3 begins, with nothing assigned and nothing started.
 *
 * The split exists because the moment between two sources is when a
 * backgrounded phone revokes the audio exemption — and because iPhone Safari
 * has no MediaSource at all, which makes the src-swap carrier a live path on
 * real devices, not a legacy branch.
 *
 * `timeline()` is the only view a caller gets of what a carrier currently
 * holds, so it doubles as the carrier-agnostic answer to "is unit i already
 * prepared?" — `startOf(i)` is null for a unit the carrier does not have.
 */

import type { UnitTimeline } from '@/lib/reader/unit-timeline'

export interface PreparedUnit {
  index: number
  data: ArrayBuffer
  /** Measured from decoded media; 0 when unmeasurable. */
  duration: number
}

export interface Carrier {
  readonly kind: 'mse' | 'src-swap'
  attach(element: HTMLAudioElement): void
  appendUnits(units: PreparedUnit[], options: { continueTimeline: boolean }): Promise<void>
  seekToUnit(index: number): void
  timeline(): UnitTimeline
  rebuild(): void
  dispose(): void
}
