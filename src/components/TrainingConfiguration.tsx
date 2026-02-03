import UnitDefs from '@/bar/unit_defs.json'
import { convertUnitsToBuildableActions } from '@/lib/bar.ts'
import { useKeybindActions } from '@/lib/useKeybindActions.tsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageToggleButton } from './ImageToggleButton'

interface Section1Props {
  activeCategories: boolean[];
  setActiveCategories: (active: boolean[]) => void;
}

const factions = [
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

const categories = [
  {
    name: 'ui.teamStats.units',
    image: '/bar-assets/armck.png',
    factions: [
      [
        {
          unit: 'armcom',
          name: 'units.descriptions.armcom',
          image: '/bar-assets/armcom.png',
        },
        {
          unit: 'armck',
          name: 'units.descriptions.armck',
          image: '/bar-assets/armck.png',
        },
        {
          unit: 'armack',
          name: 'units.descriptions.armack',
          image: '/bar-assets/armack.png',
        },
      ],
      [
        {
          unit: 'corcom',
          name: 'units.descriptions.corcom',
          image: '/bar-assets/corcom.png',
        },
        {
          unit: 'corck',
          name: 'units.descriptions.corck',
          image: '/bar-assets/corck.png',
        },
        {
          unit: 'corack',
          name: 'units.descriptions.corack',
          image: '/bar-assets/corack.png',
        },
      ],
      [
        {
          unit: 'legcom',
          name: 'units.descriptions.legcom',
          image: '/bar-assets/legcom.png',
        },
        {
          unit: 'legck',
          name: 'units.descriptions.legck',
          image: '/bar-assets/legck.png',
        },
        {
          unit: 'legack',
          name: 'units.descriptions.legack',
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
          name: 'units.descriptions.armlab',
          image: '/bar-assets/armlab.png',
        },
        {
          unit: 'armalab',
          name: 'units.descriptions.armalab',
          image: '/bar-assets/armalab.png',
        },
        {
          unit: 'armvp',
          name: 'units.descriptions.armvp',
          image: '/bar-assets/armvp.png',
        },
        {
          unit: 'armavp',
          name: 'units.descriptions.armavp',
          image: '/bar-assets/armavp.png',
        },
        {
          unit: 'armap',
          name: 'units.descriptions.armap',
          image: '/bar-assets/armap.png',
        },
        {
          unit: 'armaap',
          name: 'units.descriptions.armaap',
          image: '/bar-assets/armaap.png',
        },
        {
          unit: 'armsy',
          name: 'units.descriptions.armsy',
          image: '/bar-assets/armsy.png',
        },
        {
          unit: 'armasy',
          name: 'units.descriptions.armasy',
          image: '/bar-assets/armasy.png',
        },
        {
          unit: 'armhp',
          name: 'units.descriptions.armhp',
          image: '/bar-assets/armhp.png',
        },
        {
          unit: 'armgant',
          name: 'units.descriptions.armshltx',
          image: '/bar-assets/armshltx.png',
        },
      ],
      [
        {
          unit: 'corlab',
          name: 'units.descriptions.corlab',
          image: '/bar-assets/corlab.png',
        },
        {
          unit: 'coralab',
          name: 'units.descriptions.coralab',
          image: '/bar-assets/coralab.png',
        },
        {
          unit: 'corvp',
          name: 'units.descriptions.corvp',
          image: '/bar-assets/corvp.png',
        },
        {
          unit: 'coravp',
          name: 'units.descriptions.coravp',
          image: '/bar-assets/coravp.png',
        },
        {
          unit: 'corap',
          name: 'units.descriptions.corap',
          image: '/bar-assets/corap.png',
        },
        {
          unit: 'coraap',
          name: 'units.descriptions.coraap',
          image: '/bar-assets/coraap.png',
        },
        {
          unit: 'corsy',
          name: 'units.descriptions.corsy',
          image: '/bar-assets/corsy.png',
        },
        {
          unit: 'corasy',
          name: 'units.descriptions.corasy',
          image: '/bar-assets/corasy.png',
        },
        {
          unit: 'corhp',
          name: 'units.descriptions.corhp',
          image: '/bar-assets/corhp.png',
        },
        {
          unit: 'corgant',
          name: 'units.descriptions.corgant',
          image: '/bar-assets/corgant.png',
        },
      ],
      [
        {
          unit: 'leglab',
          name: 'units.descriptions.leglab',
          image: '/bar-assets/leglab.png',
        },
        {
          unit: 'legalab',
          name: 'units.descriptions.legalab',
          image: '/bar-assets/legalab.png',
        },
        {
          unit: 'legvp',
          name: 'units.descriptions.legvp',
          image: '/bar-assets/legvp.png',
        },
        {
          unit: 'legavp',
          name: 'units.descriptions.legavp',
          image: '/bar-assets/legavp.png',
        },
        {
          unit: 'legap',
          name: 'units.descriptions.legap',
          image: '/bar-assets/legap.png',
        },
        {
          unit: 'legaap',
          name: 'units.descriptions.legaap',
          image: '/bar-assets/legaap.png',
        },
        {
          unit: 'legsy',
          name: 'units.descriptions.legsy',
          image: '/bar-assets/legsy.png',
        },
        {
          unit: 'legadvshipyard',
          name: 'units.descriptions.legadvshipyard',
          image: '/bar-assets/legadvshipyard.png',
        },
        {
          unit: 'leghp',
          name: 'units.descriptions.leghp',
          image: '/bar-assets/leghp.png',
        },
        {
          unit: 'leggant',
          name: 'units.descriptions.leggant',
          image: '/bar-assets/leggant.png',
        },
      ],
    ],
  },
]

export function Section1({ activeCategories, setActiveCategories }: Section1Props) {
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
      {categories.map((category, i) => (<ImageToggleButton
        label={t(category.name)}
        imageSrc={category.image}
        enabled={activeCategories[i]}
        onClick={() => handleToggle(i)}
      />))}
    </div>
  )
}

// Section2
interface Section2Props {
  activeCategories: boolean[]
  onUnitsChanged: (units: string[]) => void
}

export function Section2({ activeCategories, onUnitsChanged }: Section2Props) {
  const { t } = useTranslation('units')

  // Track enabled state for rows
  const [factionEnabled, setFactionEnabled] = useState(factions.map(() => false))

  // Track state for each cell per row
  const [categoriesState, setCategoriesState] = useState(
    factions.map((faction, i) => categories.map(category => category.factions[i].map(() => false))), // [faction][category][unit]
  )

  const toggleFaction = (factionIndex: number) => {
    const newFactionEnabled = [...factionEnabled]
    newFactionEnabled[factionIndex] = !newFactionEnabled[factionIndex]
    setFactionEnabled(newFactionEnabled)

    // Toggle all cells in the row to match the new row state
    const newCategoriesState = [...categoriesState]
    for (const [categoryIndex, categories] of Object.entries(newCategoriesState[factionIndex])) {
      if (!activeCategories[categoryIndex]) {
        continue
      }

      for (let i = 0; i < newCategoriesState[factionIndex][categoryIndex].length; i++) {
        newCategoriesState[factionIndex][categoryIndex][i] = newFactionEnabled[factionIndex]
      }
    }

    setCategoriesState(newCategoriesState)
    onUnitsChanged(getUnitsFromCategories(newCategoriesState))
  }

  const getUnitsFromCategories = (newCategoriesState) => {
    return factions.map((faction, fi) => categories.map((category, ci) => category.factions[fi].map((unit, ui) => newCategoriesState[fi][ci][ui] ? unit.unit : null))).flat(Infinity).filter(x => x)
  }

  const toggleCell = (factionIndex: number, categoryIndex: number, unitIndex: number) => {
    const newCategoriesState = [...categoriesState]
    newCategoriesState[factionIndex][categoryIndex][unitIndex] = !newCategoriesState[factionIndex][categoryIndex][unitIndex]
    setCategoriesState(newCategoriesState)

    onUnitsChanged(getUnitsFromCategories(newCategoriesState))
  }

  return (
    <div className="flex flex-col items-center">
      {factions.map((faction, factionIndex) => (
        <div key={faction.name} className="flex items-center">
          {/* Faction row toggle */}
          <ImageToggleButton
            label={t(faction.name)}
            imageSrc={faction.image}
            enabled={factionEnabled[factionIndex]}
            onClick={() => toggleFaction(factionIndex)}
          />

          {/* Columns based on active section1 buttons */}
          {activeCategories.map((active, categoryIndex) =>
            active
            ? categories[categoryIndex].factions[factionIndex].map((unitDef, unitIndex) => (
              <ImageToggleButton
                key={`${factionIndex}-${categoryIndex}-${unitIndex}`}
                label={t(unitDef.name)}
                imageSrc={unitDef.image}
                enabled={categoriesState[factionIndex][categoryIndex][unitIndex]}
                onClick={() => toggleCell(factionIndex, categoryIndex, unitIndex)}
              />
            ))
            : null,
          )}
        </div>
      ))}
    </div>
  )
}

export function TrainingConfiguration() {
  const { t } = useTranslation(['units', 'interface'])

  const [activeCategories, setActiveCategories] = useState([true, false])

  const [buildable, setBuildable] = useState<string[]>([])
  const [constructors, setConstructors] = useState<string[]>([])


  const keybindActions = useKeybindActions()


  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <Section1 activeCategories={activeCategories} setActiveCategories={setActiveCategories}/>
      <div>
        TODO: Filter by group, eco, combat, util, build
      </div>
      <Section2 activeCategories={activeCategories} onUnitsChanged={constructors => {
        setConstructors(constructors)
        const buildable = Array.from(new Set(constructors.map(constructor => UnitDefs[constructor] ? UnitDefs[constructor].buildoptions : null).flat().filter(x => x)))
        setBuildable(buildable)

        console.log(convertUnitsToBuildableActions(constructors, keybindActions))


      }}/>

      <button className="border bg-gray-500 px-4 py-2 rounded-lg">Start</button>
    </div>
  )
}
