import GridLayouts from '@/bar/gridmenu_layouts.json'
import type {
  BuildableAction,
} from '@/lib/types.ts'
import {
  KeyActions,
} from '@/lib/types.ts'

export function convertUnitsToBuildableActions(constructors: string[], keybindActions: { [action: string]: { action: string, keys: string[] } }) {
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

  const buildableActions: Array<BuildableAction> = []

  for (const selectedUnit of constructors) {
    if (GridLayouts.UnitGrids[selectedUnit]) {
      for (const [gridLayoutIndex, gridLayout] of Object.entries(GridLayouts.UnitGrids[selectedUnit]) as [string, (string)[][]][]) {
        const category = constructorCategories[gridLayoutIndex]

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            if ((gridLayout[row][col] ?? null) === null || (gridLayout[row][col] ?? '') === '') {
              continue
            }

            const buildAction: BuildableAction = {
              constructor: selectedUnit,
              unit: gridLayout[row][col],
              keys: [],
            }

            for (const categoryKey of category.keys) {
              for (const actionKey of keybindActions[KeyActions.Gridmenu[`Key${row + 1}${col + 1}`]]?.keys ?? []) {
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

        const row = Math.floor(Number(index) / 4)
        const col = Number(index) % 4

        const buildAction: BuildableAction = {
          constructor: selectedUnit,
          unit: item as string,
          keys: [],
        }
        for (const actionKey of keybindActions[KeyActions.Gridmenu[`Key${row + 1}${col + 1}`]]?.keys ?? []) {
          buildAction.keys.push([actionKey])
        }
      }
    }
  }

  return buildableActions
}

const MODIFIERS = ['Ctrl', 'Shift', 'Alt', 'Meta', 'Any'] as const

export function getMostNormalKeybind(keySequences: Array<Array<string>>) {
  return keySequences
    .map((seq) => {
      const flatSequence = seq
        .map(x => x.split('+'))
        .flat()

      const rating = flatSequence.length + flatSequence.filter(x => (MODIFIERS as readonly string[]).includes(x)).length

      return {
        rating,
        sequence: seq,
      }
    })
    .sort((a, b) => a.rating - b.rating)
    .at(0)
    ?.sequence ?? []
}

export function normalizeBarKeySequence(sequence: Array<string>) {
  return sequence.map(x => x.replace(new RegExp(`(?:${MODIFIERS.join('|')})\\+`, 'g'), '').replace(/sc_/g, ''))
}
