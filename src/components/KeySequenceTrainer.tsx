import { cn } from '@/lib/utils.ts'
import {
  getSequenceManager,
} from '@tanstack/hotkeys'
import {
  type HotkeySequence,
  useHeldKeys,
  useHotkeySequence,
} from '@tanstack/react-hotkeys'
import { useEffect, useRef, useState } from 'react'

interface KeySequenceTrainerProps {
  expectedSequence: Array<string>
  onCompleted: (durationMs: number) => void
  onNext: () => void
  settings?: { showSequence: boolean; showPressed: boolean; nextUnitDelay: number }
}

export const KeySequenceTrainer = ({ expectedSequence, onNext, onCompleted, settings }: KeySequenceTrainerProps) => {
  const showSequence = settings?.showSequence ?? true
  const showPressed = settings?.showPressed ?? true

  const heldKeys = useHeldKeys()
  const startTimeRef = useRef<number>(performance.now())

  useEffect(() => {
    startTimeRef.current = performance.now()
  }, [expectedSequence])

  const [completed, setCompleted] = useState(false)

  const myOnCompleted = () => {
    const durationMs = Math.round(performance.now() - startTimeRef.current)

    setCompleted(true)
    onCompleted(durationMs)

    setTimeout(() => {
      setCompleted(false)
      onNext()
    }, settings?.nextUnitDelay ?? 0)
  }

  useHotkeySequence(expectedSequence as HotkeySequence, myOnCompleted)

  const [, registration] = getSequenceManager().registrations.state.entries().next().value ?? []
  const matchedSteps = registration ? registration.matchedStepCount : 0

  const completedAndShouldVisualize =
    completed && (settings?.nextUnitDelay ?? 0) >= 200

  return (
    <div
      className={cn(
        'relative w-full max-w-xl space-y-4 rounded-xl bg-gray-950/80 backdrop-blur-sm p-6 shadow-2xl transition-all duration-300',
        completed ? 'ring-2 ring-green-400/60' : 'ring-1 ring-white/10',
      )}
      style={
        completedAndShouldVisualize
          ? {
              boxShadow:
                '0 0 40px 0 rgb(74 222 128 / 0.15), inset 0 0 40px 0 rgb(74 222 128 / 0.1)',
            }
          : undefined
      }
    >
      {/* Success overlay — absolutely positioned so it doesn't affect height */}
      {completedAndShouldVisualize && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10">
          <span className="text-4xl select-none text-white">Correct! 🎉</span>
        </div>
      )}

      {/* Normal content — always rendered to hold the height, hidden when complete */}
      <div className={completedAndShouldVisualize ? 'invisible' : undefined}>
        {showSequence && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Expected sequence
            </h3>
            <div className="flex gap-2 flex-wrap">
              {expectedSequence.map((k, i) => (
                <span
                  key={i}
                  className={cn(
                    'rounded-md px-3 py-1 text-sm font-medium transition-colors',
                    i < matchedSteps
                      ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/40'
                      : 'bg-white/5 text-gray-300 ring-1 ring-white/10',
                  )}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {showPressed && (
          <div>
            <h3 className="my-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Currently held
            </h3>
            <div className="flex gap-2 flex-wrap min-h-8">
              {heldKeys.length === 0 ? (
                <span className="text-sm text-gray-600">—</span>
              ) : (
                heldKeys.map((k) => (
                  <span
                    key={k}
                    className="rounded-md px-3 py-1 text-sm font-semibold text-white bg-blue-500/30 ring-1 ring-blue-500/50"
                  >
                    {k}
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};
