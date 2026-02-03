import { useStableCallback } from '@/lib/utils.ts'
import { useEffect } from 'react'

export function useKeyUp(onKeyUp: (e: KeyboardEvent) => void, key?: string) {
  const keyUpHandler = useStableCallback((e: KeyboardEvent) => {
    if (e.key === key || key === undefined) {
      e.preventDefault()
      onKeyUp(e)
    }
  }, [onKeyUp, key])

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler)

    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
}
