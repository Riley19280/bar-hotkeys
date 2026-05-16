import GridLayouts from '@/bar/gridmenu_layouts.json'
import { KeyActions } from '@/lib/types.ts'


export function convertUnitsToBuildableActions(constructors, keybindActions) {
  const constructorCategories = [
    {
      name: 'ui.buildMenu.category_econ',
      keys: keybindActions[KeyActions.Gridmenu.Category1].keys,
    },
    {
      name: 'ui.buildMenu.category_combat',
      keys: keybindActions[KeyActions.Gridmenu.Category2].keys,
    },
    {
      name: 'ui.buildMenu.category_utility',
      keys: keybindActions[KeyActions.Gridmenu.Category3].keys,
    },
    {
      name: 'ui.buildMenu.category_production',
      keys: keybindActions[KeyActions.Gridmenu.Category4].keys,
    },
  ]

  const buildableActions = []

  for (let selectedUnit of constructors) {
    if (GridLayouts.UnitGrids[selectedUnit]) {
      for (const [gridLayoutIndex, gridLayout] of Object.entries(GridLayouts.UnitGrids[selectedUnit])) {
        const category = constructorCategories[gridLayoutIndex]

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            if ((gridLayout[row][col] ?? null) === null || (gridLayout[row][col] ?? '') === '') {
              continue
            }

            const buildAction = {
              constructor: selectedUnit,
              unit: gridLayout[row][col],
              keys: [],
            }

            for (const categoryKey of category.keys) {
              for (const actionKey of keybindActions[KeyActions.Gridmenu[`Key${row + 1}${col + 1}`]]?.keys) {
                if (row === 0 && col === 0) {
                  buildAction.keys.push([categoryKey])
                } else {
                  buildAction.keys.push([categoryKey, actionKey])
                }
              }
            }

            buildableActions.push(buildAction)
          }
        }
      }
    } else if (GridLayouts.LabGrids[selectedUnit]) {
      for (const [index, item] of Object.entries(GridLayouts.LabGrids[selectedUnit])) {
        if (item === null || item === '') {
          continue
        }

        const row = Math.floor(index / 4)
        const col = index % 4

        const buildAction = {
          constructor: selectedUnit,
          unit: item,
          keys: [[keybindActions.find(x => x.action == KeyActions.Gridmenu[`Key${row + 1}${col + 1}`])?.key]],
        }
        buildableActions.push(buildAction)
      }
    }
  }

  return buildableActions
}

const MODIFIERS = ['Ctrl', 'Shift', 'Alt', 'Meta', 'Any'] as const

export function getMostNormalKeybind(keySequences: Array<Array<string>>) {
  return keySequences
    .map(seq => {
      const flatSequence = seq
        .map(x => x.split('+'))
        .flat()

      const rating = flatSequence.length + flatSequence.filter(x => MODIFIERS.includes(x)).length

      return {
        rating,
        sequence: seq,
      }
    })
    .sort((a, b) => a.rating - b.rating)
    .at(0)
    .sequence
}


export function normalizeBarKeySequence(sequence: Array<string>) {
  console.log(new RegExp(`/${MODIFIERS.join('|')}\+/g`))
  return sequence.map(x => x.replace(new RegExp(`(?:${MODIFIERS.join('|')})\\+`, 'g'), '').replace(/sc_/g, ''))
}
