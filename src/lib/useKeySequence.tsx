import { useHeldKeys } from '@/lib/useHeldKeys.ts'
import { useKeyDown } from '@/lib/useKeyDown.ts'
import { normalizeKey } from '@/lib/utils'
import {
  useEffect,
  useState,
} from 'react'

type MatchState = 'idle' | 'partial' | 'correct';

const MODIFIERS = ['Ctrl', 'Shift', 'Alt', 'Meta'] as const

function normalizeCombo(combo: string) {
  const parts = combo.split('+')
  return [
    ...parts.filter(key => MODIFIERS.includes(key)).sort(), // sorted so that modifier order doesn't matter
    ...parts.filter(key => !MODIFIERS.includes(key)),
  ].map(normalizeKey)
   .join('+')
}
