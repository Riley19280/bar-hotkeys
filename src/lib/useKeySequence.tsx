import { useHeldKeys } from '@/lib/useHeldKeys.ts'
import { useKeyDown } from '@/lib/useKeyDown.ts'
import { normalizeKey } from '@/lib/utils'
import {
  useEffect,
  useState,
} from 'react'

type MatchState = 'idle' | 'partial' | 'correct';

const MODIFIERS = ['Ctrl', 'Shift', 'Alt', 'Meta'] as const

interface UseKeySequenceOptions {
  expectedSequence: string[]
  onCompleted: () => void
}

function normalizeCombo(combo: string) {
  const parts = combo.split('+')
  return [
    ...parts.filter(key => MODIFIERS.includes(key)).sort(), // sorted so that modifier order doesn't matter
    ...parts.filter(key => !MODIFIERS.includes(key)),
  ].map(normalizeKey)
   .join('+')
}

export function useKeySequence({ expectedSequence, onCompleted }: UseKeySequenceOptions) {
  const [index, setIndex] = useState(0)
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [matchState, setMatchState] = useState<MatchState>('idle')
  const [heldKeys, setHeldKeys] = useHeldKeys()
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setIsComplete(false)
    setIndex(0)
    setPressedKeys([])
    setHeldKeys([])
    setMatchState('idle')
  }, [expectedSequence])

  useEffect(() => {
    const handleBlur = () => {
      setPressedKeys([])
      setHeldKeys([])
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [])


  useKeyDown((e) => {
      if (isComplete) {
        return
      }

      const key = normalizeKey(e.key)

      const currentCombo = normalizeCombo([...heldKeys, key].join('+'))
      const expectedCombo = normalizeCombo(expectedSequence[index])

      console.log({currentCombo, expectedCombo})

      if (expectedCombo.startsWith(currentCombo)) {
        if (currentCombo === expectedCombo) {
          setPressedKeys((p) => [...p, currentCombo])

          setMatchState('correct')
          if (index === expectedSequence.length - 1) {
            setIsComplete(true)
            onCompleted()
          } else {
            setIndex((i) => i + 1)
          }
        } else {
          setMatchState('partial')
        }
      }
    },
  )


  return {
    pressedKeys,
    heldKeys,
    matchState,
    isComplete,
  }
}
