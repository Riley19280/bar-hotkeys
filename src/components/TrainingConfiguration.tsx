import { convertUnitsToBuildableActions } from '@/lib/bar.ts'
import type { CategoryDef, Faction } from '@/lib/types.ts'
import { useKeybindActions } from '@/lib/useKeybindActions.tsx'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FanRow } from './FanItem'
import { ImageToggleButton } from './ImageToggleButton'

interface Section1Props {
  activeCategories: boolean[]
  setActiveCategories: (active: boolean[]) => void
}

const factions: Faction[] = [
  {
    name: 'units.factions.arm',
    image: '/bar-assets/factions/armada_default.png',
  },
  {
    name: 'units.factions.cor',
    image: '/bar-assets/factions/cortex_default.png',
  },
  {
    name: 'units.factions.leg',
    image: '/bar-assets/factions/legion_default.png',
  },
]

const categories: CategoryDef[] = [
  {
    name: 'ui.teamStats.units',
    image: '/bar-assets/armck.png',
    factions: [
      [
        {
          unit: 'armcom',
          name: 'units.names.armcom',
          image: '/bar-assets/armcom.png',
        },
        {
          unit: 'armck',
          name: 'units.names.armck',
          image: '/bar-assets/armck.png',
        },
        {
          unit: 'armack',
          name: 'units.names.armack',
          image: '/bar-assets/armack.png',
        },
      ],
      [
        {
          unit: 'corcom',
          name: 'units.names.corcom',
          image: '/bar-assets/corcom.png',
        },
        {
          unit: 'corck',
          name: 'units.names.corck',
          image: '/bar-assets/corck.png',
        },
        {
          unit: 'corack',
          name: 'units.names.corack',
          image: '/bar-assets/corack.png',
        },
      ],
      [
        {
          unit: 'legcom',
          name: 'units.names.legcom',
          image: '/bar-assets/legcom.png',
        },
        {
          unit: 'legck',
          name: 'units.names.legck',
          image: '/bar-assets/legck.png',
        },
        {
          unit: 'legack',
          name: 'units.names.legack',
          image: '/bar-assets/legack.png',
        },
      ],
    ],
  },
  {
    name: 'ui.statusBars.building',
    image: '/bar-assets/armlab.png',
    factions: [
      [
        {
          unit: 'armlab',
          name: 'units.names.armlab',
          image: '/bar-assets/armlab.png',
        },
        {
          unit: 'armalab',
          name: 'units.names.armalab',
          image: '/bar-assets/armalab.png',
        },
        {
          unit: 'armvp',
          name: 'units.names.armvp',
          image: '/bar-assets/armvp.png',
        },
        {
          unit: 'armavp',
          name: 'units.names.armavp',
          image: '/bar-assets/armavp.png',
        },
        {
          unit: 'armap',
          name: 'units.names.armap',
          image: '/bar-assets/armap.png',
        },
        {
          unit: 'armaap',
          name: 'units.names.armaap',
          image: '/bar-assets/armaap.png',
        },
        {
          unit: 'armsy',
          name: 'units.names.armsy',
          image: '/bar-assets/armsy.png',
        },
        {
          unit: 'armasy',
          name: 'units.names.armasy',
          image: '/bar-assets/armasy.png',
        },
        {
          unit: 'armhp',
          name: 'units.names.armhp',
          image: '/bar-assets/armhp.png',
        },
        {
          unit: 'armgant',
          name: 'units.names.armshltx',
          image: '/bar-assets/armshltx.png',
        },
      ],
      [
        {
          unit: 'corlab',
          name: 'units.names.corlab',
          image: '/bar-assets/corlab.png',
        },
        {
          unit: 'coralab',
          name: 'units.names.coralab',
          image: '/bar-assets/coralab.png',
        },
        {
          unit: 'corvp',
          name: 'units.names.corvp',
          image: '/bar-assets/corvp.png',
        },
        {
          unit: 'coravp',
          name: 'units.names.coravp',
          image: '/bar-assets/coravp.png',
        },
        {
          unit: 'corap',
          name: 'units.names.corap',
          image: '/bar-assets/corap.png',
        },
        {
          unit: 'coraap',
          name: 'units.names.coraap',
          image: '/bar-assets/coraap.png',
        },
        {
          unit: 'corsy',
          name: 'units.names.corsy',
          image: '/bar-assets/corsy.png',
        },
        {
          unit: 'corasy',
          name: 'units.names.corasy',
          image: '/bar-assets/corasy.png',
        },
        {
          unit: 'corhp',
          name: 'units.names.corhp',
          image: '/bar-assets/corhp.png',
        },
        {
          unit: 'corgant',
          name: 'units.names.corgant',
          image: '/bar-assets/corgant.png',
        },
      ],
      [
        {
          unit: 'leglab',
          name: 'units.names.leglab',
          image: '/bar-assets/leglab.png',
        },
        {
          unit: 'legalab',
          name: 'units.names.legalab',
          image: '/bar-assets/legalab.png',
        },
        {
          unit: 'legvp',
          name: 'units.names.legvp',
          image: '/bar-assets/legvp.png',
        },
        {
          unit: 'legavp',
          name: 'units.names.legavp',
          image: '/bar-assets/legavp.png',
        },
        {
          unit: 'legap',
          name: 'units.names.legap',
          image: '/bar-assets/legap.png',
        },
        {
          unit: 'legaap',
          name: 'units.names.legaap',
          image: '/bar-assets/legaap.png',
        },
        {
          unit: 'legsy',
          name: 'units.names.legsy',
          image: '/bar-assets/legsy.png',
        },
        {
          unit: 'legadvshipyard',
          name: 'units.names.legadvshipyard',
          image: '/bar-assets/legadvshipyard.png',
        },
        {
          unit: 'leghp',
          name: 'units.names.leghp',
          image: '/bar-assets/leghp.png',
        },
        {
          unit: 'leggant',
          name: 'units.names.leggant',
          image: '/bar-assets/leggant.png',
        },
      ],
    ],
  },
]

export function CategorySelector({
  activeCategories,
  setActiveCategories,
}: Section1Props) {
  const { t } = useTranslation(['interface', 'units'])

  const handleToggle = (index: number) => {
    const newState = [...activeCategories]

    // Prevent deselecting none
    if (newState[index] && newState.filter(Boolean).length === 1) return

    newState[index] = !newState[index]
    setActiveCategories(newState)
  }

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {categories.map((category, i) => (
        <ImageToggleButton
          label={t(category.name)}
          imageSrc={category.image}
          enabled={activeCategories[i]}
          onClick={() => handleToggle(i)}
        />
      ))}
    </div>
  )
}

// Section2
interface Section2Props {
  activeCategories: boolean[]
  onUnitsChanged: (units: string[]) => void
}

export function FactionConstructorSelector({
  activeCategories,
  onUnitsChanged,
}: Section2Props) {
  const { t } = useTranslation('units')

  // Track enabled state for rows
  const [factionEnabled, setFactionEnabled] = useState(
    factions.map((x, i) => i === 0),
  )

  // Track state for each cell per row
  const [categoriesState, setCategoriesState] = useState<boolean[][][]>(
    factions.map((faction, i) =>
      categories.map((category) =>
        category.factions[i].map(
          () => i === 0 && category.name === 'ui.teamStats.units',
        ),
      ),
    ), // [faction][category][unit]
  )

  const toggleFaction = (factionIndex: number) => {
    const newFactionEnabled = [...factionEnabled]
    newFactionEnabled[factionIndex] = !newFactionEnabled[factionIndex]
    setFactionEnabled(newFactionEnabled)

    // Toggle all cells in the row to match the new row state
    const newCategoriesState = [...categoriesState]
    for (const [categoryIndex, categories] of Object.entries(
      newCategoriesState[factionIndex],
    )) {
      if (!activeCategories[categoryIndex]) {
        continue
      }

      for (
        let i = 0;
        i < newCategoriesState[factionIndex][categoryIndex].length;
        i++
      ) {
        newCategoriesState[factionIndex][categoryIndex][i] =
          newFactionEnabled[factionIndex]
      }
    }

    setCategoriesState(newCategoriesState)
    onUnitsChanged(getUnitsFromCategories(newCategoriesState))
  }

  const getUnitsFromCategories = (newCategoriesState) => {
    return factions
      .map((faction, fi) =>
        categories.map((category, ci) =>
          category.factions[fi].map((unit, ui) =>
            newCategoriesState[fi][ci][ui] ? unit.unit : null,
          ),
        ),
      )
      .flat(Infinity)
      .filter((x) => x) as string[]
  }

  const toggleCell = (
    factionIndex: number,
    categoryIndex: number,
    unitIndex: number,
  ) => {
    const newCategoriesState = [...categoriesState]
    newCategoriesState[factionIndex][categoryIndex][unitIndex] =
      !newCategoriesState[factionIndex][categoryIndex][unitIndex]
    setCategoriesState(newCategoriesState)

    onUnitsChanged(getUnitsFromCategories(newCategoriesState))
  }

  return (
    <div className="w-full flex flex-col items-center">
      {factions.map((faction, factionIndex) => {
        const items: Array<{ key: string; node: React.ReactNode }> = []

        items.push({
          key: 'faction',
          node: (
            <ImageToggleButton
              label={t(faction.name)}
              imageSrc={faction.image}
              enabled={factionEnabled[factionIndex]}
              onClick={() => toggleFaction(factionIndex)}
            />
          ),
        })

        activeCategories.forEach((active, categoryIndex) => {
          if (!active) return
          categories[categoryIndex].factions[factionIndex].forEach(
            (unitDef, unitIndex) => {
              items.push({
                key: `${categoryIndex}-${unitIndex}`,
                node: (
                  <ImageToggleButton
                    label={t(unitDef.name)}
                    imageSrc={unitDef.image}
                    enabled={
                      categoriesState[factionIndex][categoryIndex][unitIndex]
                    }
                    onClick={() =>
                      toggleCell(factionIndex, categoryIndex, unitIndex)
                    }
                  />
                ),
              })
            },
          )
        })

        return <FanRow key={faction.name} items={items} />
      })}
    </div>
  )
}

export function TrainingConfiguration() {

  const [activeCategories, setActiveCategories] = useState([true, false])

  const [constructors, setConstructors] = useState<string[]>(['armcom', 'armck', 'armack'])

  const keybindActions = useKeybindActions()

  const navigate = useNavigate()

  return (
    <div className="w-full">
      <CategorySelector
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
      />
      <div className='hidden'>TODO: Filter by group, eco, combat, util, build</div>
      <FactionConstructorSelector
        activeCategories={activeCategories}
        onUnitsChanged={(constructors) => {
          setConstructors(constructors)
        }}
      />
      <div className='flex justify-center mt-4'>
        <button
          className="flex gap-2 items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500 cursor-pointer"
          onClick={() => {
            navigate({
              to: '/train',
              state: {
                actionKeybinds: convertUnitsToBuildableActions(
                  constructors,
                  keybindActions,
                ),
              },
            })
          }}
        >
          Start
          <ArrowRightIcon className="h-4" />
        </button>
      </div>
    </div>
  )
}
