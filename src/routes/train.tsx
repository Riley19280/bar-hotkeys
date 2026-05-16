import { KeySequenceTrainer } from '@/components/KeySequenceTrainer.tsx'
import {
  getMostNormalKeybind,
  normalizeBarKeySequence,
} from '@/lib/bar.ts'
import {
  createFileRoute,
  useRouterState,
} from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/train')({
  component: IndexComponent,
})

function IndexComponent() {
  const routerState = useRouterState()
  const { actionKeybinds } = routerState.location.state


  const [action, setAction] = useState(actionKeybinds[Math.floor(Math.random() * (actionKeybinds.length - 1))])

  // if (!actionKeybinds) {
  //   return <div>Missing navigation state</div>
  // }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[url('/bar-assets/manual/BAR_Armada_Commander.avif')] bg-cover bg-center grayscale brightness-15" />
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Constructor</span>
            <img
              src={`/bar-assets/${action.constructor}.png`}
              alt={action.constructor}
              className="h-72 w-72 rounded-md object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>
          <div className="text-2xl text-gray-500">→</div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Unit</span>
            <img
              src={`/bar-assets/${action.unit}.png`}
              alt={action.unit}
              className="h-72 w-72 rounded-md object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>
        </div>
        <KeySequenceTrainer
          expectedSequence={normalizeBarKeySequence(getMostNormalKeybind(action.keys))}
          onCompleted={() => {
            setAction(actionKeybinds[Math.floor(Math.random() * (actionKeybinds.length - 1))])
          }}
        />
      </div>
    </div>
  )
}
