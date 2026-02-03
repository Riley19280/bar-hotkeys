import { useStableCallback } from '@/lib/utils.ts'
import { useEffect } from 'react'

export function useKeyDown(onKeyDown: (e: KeyboardEvent) => void, key?: string) {
  const keyDownHandler = useStableCallback((e: KeyboardEvent) => {
    if (e.key === key || key === undefined) {
      e.preventDefault()
      onKeyDown(e)
    }
  }, [onKeyDown, key])

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])
}
