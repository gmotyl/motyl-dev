import { useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function useHashtagFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedHashtags = useMemo(() => {
    const hashtags = searchParams.get('hashtags')
    return new Set(hashtags ? hashtags.split(',') : [])
  }, [searchParams])

  const filterMode = useMemo(() => {
    return (searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE') || 'AND'
  }, [searchParams])

  const showUnseenOnly = useMemo(() => {
    return searchParams.get('unseen') === 'true'
  }, [searchParams])

  const updateSearchParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    // always reset page on filter change
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleHashtagToggle = (hashtag: string) => {
    const newHashtags = new Set(selectedHashtags)
    if (newHashtags.has(hashtag)) {
      newHashtags.delete(hashtag)
    } else {
      newHashtags.add(hashtag)
    }
    updateSearchParams({ hashtags: Array.from(newHashtags).join(',') || null })
  }

  const handleClearFilters = () => {
    updateSearchParams({ hashtags: null, mode: null, unseen: null })
  }

  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    updateSearchParams({ mode })
  }

  const handleToggleUnseen = () => {
    updateSearchParams({ unseen: !showUnseenOnly ? 'true' : null })
  }

  return {
    selectedHashtags,
    filterMode,
    showUnseenOnly,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen,
  }
}
