import {
  type ClassValue,
  clsx,
} from 'clsx'
import {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const throwReferenceError = () => {
  throw new ReferenceError('Callback was called directly while rendering, pass it as a callback prop instead.')
}

export function useStableCallback(callback, deps) {
  const ref = useRef(throwReferenceError)

  // update stored callback ref if callback or deps change
  useEffect(() => {
    ref.current = callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps])

  // return stable wrapped callback
  return useCallback((...args) => {
    ref.current(...args)
  }, [ref])
}


export function normalizeKey(e: string): string {
  if (e === ' ') return 'Space'
  if (e === 'Control') return 'Ctrl'
  if (e === 'Meta' && !isMac()) return 'Ctrl'
  if (e === 'Ctrl' && isMac()) return 'Meta'
  if (e === 'Alt') return 'Alt'

  return e.length === 1 ? e.toUpperCase() : e
}

export function isMac() {
  return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC')
}
