import { Footer } from '@/components/Footer.tsx'
import { TrainingConfiguration } from '@/components/TrainingConfiguration.tsx'
import { createFileRoute } from '@tanstack/react-router'
import {
  BoltIcon,
  UsersIcon,
  CalendarDaysIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'


const secondaryFeatures = [
  {
    name: 'Real BAR Keybind Layouts',
    description: 'Uses actual Beyond All Reason keybinds and production groupings.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Instant Faction Switching',
    description: 'Swap between Armada, Cortex, and Legion without resetting drills.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Eco & Production Focus',
    description: 'Practice smooth build queues, factory ramps, and expansion timing.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Combat Readiness',
    description: 'Drill unit production, control groups, and reaction speed.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Zero Match Pressure',
    description: 'Train mechanics without teammates, ladders, or timers.',
    icon: LockClosedIcon,
  },
  {
    name: 'Lightweight & Fast',
    description: 'Load in, train, repeat. No setup, no waiting.',
    icon: ServerIcon,
  },
]

const stats = [
  { name: 'Factions supported', value: '3' },
  { name: 'Training categories', value: 'Eco · Combat · Util · Build' },
  { name: 'Session length', value: '30–120s' },
  { name: 'Focus', value: 'Muscle memory' },
]


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="relative">
      <div
        className="
      fixed
      inset-0
      -z-10
      bg-[url('/bar-assets/manual/BAR_Armada_Commander.avif')]
      bg-cover
      bg-center
      grayscale
      brightness-15

    "
      />
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:flex lg:py-10">
            <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
              <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Focused APM training for Beyond All Reason
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                Turn keybinds into instinct so your execution keeps up with your
                strategy
              </p>

            </div>
            <div className="mx-auto mt-16 hidden lg:flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  alt="App screenshot"
                  src="/unit-movement.png"
                  width={2432}
                  height={1442}
                  className="w-200 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 scale-x-[-1]"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskComposite: 'source-in',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}

        <div id="train" className="relative isolate mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              Customize your training
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">
              Choose which units you'd like to practice with
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <TrainingConfiguration />
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 sm:mt-56 mb-24">
          {/*<div className="mx-auto max-w-7xl px-6 lg:px-8">*/}
          {/*  <div className="mx-auto max-w-2xl sm:text-center">*/}
          {/*    <h2 className="text-base/7 font-semibold text-blue-600 dark:text-blue-400">*/}
          {/*      Everything you need*/}
          {/*    </h2>*/}
          {/*    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance dark:text-white">*/}
          {/*      No server? No problem.*/}
          {/*    </p>*/}
          {/*    <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">*/}
          {/*      Lorem ipsum, dolor sit amet consectetur adipisicing elit.*/}
          {/*      Maiores impedit perferendis suscipit eaque, iste dolor*/}
          {/*      cupiditate blanditiis.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="relative overflow-hidden pt-16">*/}
          {/*  <div className="mx-auto max-w-7xl px-6 lg:px-8">*/}
          {/*    <img*/}
          {/*      alt="App screenshot"*/}
          {/*      src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"*/}
          {/*      width={2432}*/}
          {/*      height={1442}*/}
          {/*      className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:hidden dark:ring-white/10"*/}
          {/*    />*/}
          {/*    <img*/}
          {/*      alt="App screenshot"*/}
          {/*      src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"*/}
          {/*      width={2432}*/}
          {/*      height={1442}*/}
          {/*      className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 not-dark:hidden dark:ring-white/10"*/}
          {/*    />*/}
          {/*    <div aria-hidden="true" className="relative">*/}
          {/*      <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%] dark:from-gray-900" />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 dark:text-gray-400">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute top-1 left-1 size-5 text-blue-600 dark:text-blue-400"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
