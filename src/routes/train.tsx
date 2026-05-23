import {
  ArrowLeftIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import {
  createFileRoute,
  Link,
  Navigate,
  useRouterState,
} from '@tanstack/react-router'
import {
  useState,
} from 'react'
import {
  useTranslation,
} from 'react-i18next'
import {
  Footer,
} from '@/components/Footer.tsx'
import {
  KeySequenceTrainer,
} from '@/components/KeySequenceTrainer.tsx'
import {
  Modal,
} from '@/components/Modal.tsx'
import {
  Slider,
} from '@/components/Slider.tsx'
import {
  StatisticsPanel,
} from '@/components/StatisticsPanel.tsx'
import {
  Toggle,
} from '@/components/Toggle.tsx'
import {
  Tooltip,
} from '@/components/Tooltip.tsx'
import {
  getMostNormalKeybind,
  normalizeBarKeySequence,
} from '@/lib/bar.ts'
import {
  useVersionedLocalStorage,
} from '@/lib/useVersionedLocalStorage.ts'

export const Route = createFileRoute('/train')({
  component: IndexComponent,
})

function IndexComponent() {
  const routerState = useRouterState()
  const { t } = useTranslation(['units'])

  const { actionKeybinds } = routerState.location.state

  const [action, setAction] = useState(() => {
    if (actionKeybinds)
      return actionKeybinds[Math.floor(Math.random() * (actionKeybinds.length - 1))]
    else
      return undefined
  })
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [settings, setSettings] = useVersionedLocalStorage(
    3,
    'training-settings',
    {
      showSequence: true,
      showPressed: true,
      nextUnitDelay: 0,
      showLabels: true,
    },
  )

  const [stats, setStats] = useVersionedLocalStorage(1, 'statistics', {
    totalAttempts: 0,
    units: {},
  })

  if (!actionKeybinds || !action) {
    return <Navigate to="/" hash="train" />
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[url('/bar-assets/manual/BAR_Armada_Commander.avif')] bg-cover bg-center grayscale brightness-15" />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-10 flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Home
        </Link>
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <Cog6ToothIcon className="h-5 w-5" />
          Settings
        </button>
      </header>

      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-300">Show sequence</span>
              <Tooltip content="Displays the expected key sequence" />
            </div>
            <Toggle
              checked={settings.showSequence}
              onChange={v => setSettings({ ...settings, showSequence: v })}
              label=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-300">Show pressed keys</span>
              <Tooltip content="Displays the keys you are currently pressing." />
            </div>
            <Toggle
              checked={settings.showPressed}
              onChange={v => setSettings({ ...settings, showPressed: v })}
              label=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-300">Show unit labels</span>
              <Tooltip content="Shows the Constructor and Unit labels above the images." />
            </div>
            <Toggle
              checked={settings.showLabels}
              onChange={v => setSettings({ ...settings, showLabels: v })}
              label=""
            />
          </div>
          <div className="pt-2">
            <Slider
              label={(
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-300">Next unit delay</span>
                  <Tooltip content="How long to wait after completing a sequence before advancing to the next unit." />
                </div>
              )}
              value={settings.nextUnitDelay}
              min={0}
              max={3000}
              step={100}
              format={v =>
                v === 0
                  ? 'Instant'
                  : `${(v / 1000).toFixed(2).replace(/\.?0+$/, '')}s`}
              onChange={v => setSettings({ ...settings, nextUnitDelay: v })}
            />
          </div>
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-300">Statistics</span>
                <Tooltip content="Resets all statistics." />
              </div>
              <button
                onClick={() => setStats({ totalAttempts: 0, units: {} })}
                className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col items-center justify-center gap-8 px-6 mt-32">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Constructor
            </span>
            <div className="relative h-72 w-72 overflow-hidden rounded-md shadow-lg ring-1 ring-white/10">
              <img
                src={`/bar-assets/${action.constructor}.png`}
                alt={action.constructor}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to top, black 0%, transparent 40%)',
                }}
              />
              {settings.showLabels && (
                <div className="absolute bottom-0 w-full px-3 py-2 text-center">
                  <span className="text-white text-xs font-semibold drop-shadow">
                    {t(`units.names.${action.constructor}` as any)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl text-gray-500">→</div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Unit
            </span>
            <div className="relative h-72 w-72 overflow-hidden rounded-md shadow-lg ring-1 ring-white/10">
              <img
                src={`/bar-assets/${action.unit}.png`}
                alt={action.unit}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to top, black 0%, transparent 40%)',
                }}
              />
              {settings.showLabels && (
                <div className="absolute bottom-0 w-full px-3 py-2 text-center">
                  <span className="text-white text-xs font-semibold drop-shadow">
                    {t(`units.names.${action.unit}` as any)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <StatisticsPanel totalAttempts={stats.totalAttempts} units={stats.units} />

        <KeySequenceTrainer
          expectedSequence={normalizeBarKeySequence(
            getMostNormalKeybind(action.keys),
          )}
          settings={settings}
          onCompleted={(durationMs) => {
            const newStats = stats
            newStats.totalAttempts += 1

            if (!stats.units[action.unit]) {
              stats.units[action.unit] = {
                total: durationMs,
                count: 1,
              }
            } else {
              stats.units[action.unit].total += durationMs
              stats.units[action.unit].count += 1
            }

            setStats(newStats)
          }}
          onNext={() => {
            setAction(
              actionKeybinds[
                Math.floor(Math.random() * (actionKeybinds.length - 1))
              ],
            )
          }}
        />
      </div>
      <div className="fixed bottom-0 inset-x-0">
        <Footer />
      </div>
    </div>
  )
}
