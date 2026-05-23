import {
  useState,
} from 'react'
import {
  useTranslation,
} from 'react-i18next'

interface UnitStat {
  total: number
  count: number
}

interface StatisticsPanelProps {
  totalAttempts: number
  units: Record<string, UnitStat>
}

export function StatisticsPanel({ totalAttempts, units }: StatisticsPanelProps) {
  const { t } = useTranslation(['units'])
  const [ascending, setAscending] = useState(false)

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 w-56 rounded-xl bg-gray-950/80 backdrop-blur-sm p-4 ring-1 ring-white/10 shadow-2xl space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Statistics</h2>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Total attempts</span>
        <span className="text-white font-medium tabular-nums">{totalAttempts}</span>
      </div>
      {Object.keys(units).length > 0 && (
        <div className="border-t border-white/10 pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Per unit (avg)</span>
            <button
              tabIndex={-1}
              onClick={() => setAscending(a => !a)}
              className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
              title={ascending ? 'Showing best first' : 'Showing worst first'}
            >
              {ascending ? '↑' : '↓'}
            </button>
          </div>
          {Object.entries(units)
            .map(([unit, data]) => ({ unit, avg: data.total / data.count }))
            .sort((a, b) => ascending ? a.avg - b.avg : b.avg - a.avg)
            .slice(0, 10)
            .map(({ unit, avg }) => (
              <div key={unit} className="flex justify-between text-xs">
                <span className="text-gray-400 truncate">{t(`units.names.${unit}` as any)}</span>
                <span className="text-white font-medium tabular-nums ml-2">
                  {avg < 1000 ? `${Math.round(avg)}ms` : `${(avg / 1000).toFixed(2)}s`}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
