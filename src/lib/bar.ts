import GridLayouts from '@/bar/gridmenu_layouts.json'
import { GridmenuKeyActions } from '@/lib/types.ts'


export function convertUnitsToBuildableActions(constructors, keybindActions) {
  const constructorCategories = [
    {
      name: 'ui.buildMenu.category_econ',
      keys: keybindActions.filter(a => a.action == GridmenuKeyActions.Category1),
    },
    {
      name: 'ui.buildMenu.category_combat',
      keys: keybindActions.filter(a => a.action == GridmenuKeyActions.Category2),
    },
    {
      name: 'ui.buildMenu.category_utility',
      keys: keybindActions.filter(a => a.action == GridmenuKeyActions.Category3),
    },
    {
      name: 'ui.buildMenu.category_production',
      keys: keybindActions.filter(a => a.action == GridmenuKeyActions.Category4),
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
              action: gridLayout[row][col],
              keys: [],
            }

            for (const categoryKey of category.keys) {
              buildAction.keys.push(categoryKey.key + ',' + keybindActions.find(x => x.action == GridmenuKeyActions[`Key${row + 1}${col + 1}`])?.key)
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
          action: item,
          keys: [keybindActions.find(x => x.action == GridmenuKeyActions[`Key${row + 1}${col + 1}`])?.key],
        }
        buildableActions.push(buildAction)
      }
    }
  }

  return buildableActions
}
