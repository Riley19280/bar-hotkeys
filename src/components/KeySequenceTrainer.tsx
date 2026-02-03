import { useKeySequence } from "@/lib/useKeySequence";

export const KeySequenceTrainer = ({ expectedSequence }: { expectedSequence: Array<string> }) => {

  const {
    pressedKeys,
    heldKeys,
    matchState,
    isComplete,
    reset,
  } = useKeySequence({
    expectedSequence,
  });

  const heldColor =
    matchState === "partial"
    ? "bg-yellow-400"
    : matchState === "correct"
      ? "bg-green-500"
      : "bg-blue-500";

  return (
    <div className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow">
      {/* Expected */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-600">
          Expected sequence
        </h3>
        <div className="flex gap-2 flex-wrap">
          {expectedSequence.map((k, i) => (
            <span
              key={i}
              className="rounded-md border bg-gray-50 px-3 py-1 text-sm font-medium"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Held */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-600">
          Currently held
        </h3>
        <div className="flex gap-2 flex-wrap">
          {heldKeys.length === 0 && (
            <span className="text-sm text-gray-400">
              No keys held
            </span>
          )}
          {heldKeys.map((k) => (
            <span
              key={k}
              className={`rounded-md px-3 py-1 text-sm font-semibold text-white ${heldColor}`}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-600">
          Progress
        </h3>
        <div className="flex gap-2 flex-wrap">
          {pressedKeys.map((k, i) => (
            <span
              key={i}
              className="rounded-md bg-green-500 px-3 py-1 text-sm font-semibold text-white"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="rounded-md bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          Sequence complete 🎉
        </div>
      )}

      <button
        onClick={reset}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
};
