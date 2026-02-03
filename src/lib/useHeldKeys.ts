import { normalizeKey } from '@/lib/utils.ts'
import {
  useEffect,
  useState,
} from 'react'

export function useHeldKeys() {
  const [heldKeys, setHeldKeys] = useState<Array<string>>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      e.preventDefault()

      const key = normalizeKey(e.key)

      setHeldKeys((prev) => {
        const next = [...prev]
        if (!next.includes(key))
          next.push(key)
        return next
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key)


      setHeldKeys((prev) => {
        const next = [...prev]
        if (next.indexOf(key) !== -1)
          next.splice(next.indexOf(key), 1)
        return next
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return [heldKeys, setHeldKeys]
}
