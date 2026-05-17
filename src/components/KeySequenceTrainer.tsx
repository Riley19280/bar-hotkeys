import { cn } from '@/lib/utils.ts'
import {
  getSequenceManager,
} from '@tanstack/hotkeys'
import {
  type HotkeySequence,
  useHeldKeys,
  useHotkeySequence,
} from '@tanstack/react-hotkeys'

interface KeySequenceTrainerProps {
  expectedSequence: Array<string>
  onCompleted: () => void
  settings?: { showSequence: boolean; showPressed: boolean }
}

export const KeySequenceTrainer = ({ expectedSequence, onCompleted, settings }: KeySequenceTrainerProps) => {
  const showSequence = settings?.showSequence ?? true
  const showPressed = settings?.showPressed ?? true

  const heldKeys = useHeldKeys()

  useHotkeySequence(expectedSequence as HotkeySequence, onCompleted)

  const registration = getSequenceManager().registrations.state.entries().next().value?.at(1)
  const matchedSteps = registration ? registration.matchedStepCount : 0

  return (
    <div className="w-full max-w-xl space-y-4 rounded-xl bg-gray-950/80 backdrop-blur-sm p-6 ring-1 ring-white/10 shadow-2xl">
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
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Currently held
          </h3>
          <div className="flex gap-2 flex-wrap min-h-8">
            {heldKeys.length === 0
              ? <span className="text-sm text-gray-600">—</span>
              : heldKeys.map((k) => (
                <span
                  key={k}
                  className="rounded-md px-3 py-1 text-sm font-semibold text-white bg-blue-500/30 ring-1 ring-blue-500/50"
                >
                  {k}
                </span>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
};
