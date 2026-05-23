import {
  type ClassValue,
  clsx,
} from 'clsx'
import {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import {
  twMerge,
} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const throwReferenceError = () => {
  throw new ReferenceError('Callback was called directly while rendering, pass it as a callback prop instead.')
}

export function useStableCallback<T extends unknown[]>(callback: (...args: T) => void, deps: unknown[]) {
  const ref = useRef<(...args: T) => void>(throwReferenceError)

  // update stored callback ref if callback or deps change
  useEffect(() => {
    ref.current = callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps])

  // return stable wrapped callback
  return useCallback((...args: T) => {
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
