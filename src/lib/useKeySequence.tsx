import { useHeldKeys } from '@/lib/useHeldKeys.ts'
import { useKeyDown } from '@/lib/useKeyDown.ts'
import { normalizeKey } from '@/lib/utils'
import { useState } from 'react'

type MatchState = 'idle' | 'partial' | 'correct';

const MODIFIERS = ['Ctrl', 'Shift', 'Alt', 'Meta'] as const

interface UseKeySequenceOptions {
  expectedSequence: string[]
}

function normalizeCombo(combo: string) {
  const parts = combo.split('+')
  return [
    ...parts.filter(key => MODIFIERS.includes(key)).sort(), // sorted so that modifier order doesn't matter
    ...parts.filter(key => !MODIFIERS.includes(key)),
  ].map(normalizeKey)
   .join('+')
}

export function useKeySequence({ expectedSequence }: UseKeySequenceOptions) {
  const [index, setIndex] = useState(0)
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [matchState, setMatchState] = useState<MatchState>('idle')

  const [heldKeys, setHeldKeys] = useHeldKeys()


  const reset = () => {
    setIndex(0)
    setPressedKeys([])
    setHeldKeys([])
    setMatchState('idle')
  }

  useKeyDown((e) => {
      const key = normalizeKey(e.key)

      const currentCombo = normalizeCombo([...heldKeys, key].join('+'))
      const expectedCombo = normalizeCombo(expectedSequence[index])

      if (expectedCombo.startsWith(currentCombo)) {
        if (currentCombo === expectedCombo) {
          setPressedKeys((p) => [...p, currentCombo])
          setIndex((i) => i + 1)
          setMatchState('correct')
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
    isComplete: index === expectedSequence.length,
    reset,
  }
}
