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
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      using
      <img src={`/bar-assets/${action.constructor}.png`}/>
      build
      <img src={`/bar-assets/${action.unit}.png`}/>
      <KeySequenceTrainer expectedSequence={normalizeBarKeySequence(getMostNormalKeybind(action.keys))} onCompleted={() => {
        setAction(actionKeybinds[Math.floor(Math.random() * (actionKeybinds.length - 1))])
      }}/>
    </div>
  )
}
