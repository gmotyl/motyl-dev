'use client'

import {
  ContinuousReaderControls,
  type ContinuousReaderControlsProps,
} from '@/components/continuous-reader-controls'

export function ReaderControlBar(props: ContinuousReaderControlsProps) {
  return (
    <div
      data-reader-floating
      className="fixed bottom-16 left-2 right-2 z-40 rounded-xl border border-border bg-background/95 p-2 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:bottom-6 sm:left-auto sm:right-4 sm:w-[min(42rem,calc(100vw-2rem))]"
    >
      <ContinuousReaderControls {...props} />
    </div>
  )
}

export default ReaderControlBar
