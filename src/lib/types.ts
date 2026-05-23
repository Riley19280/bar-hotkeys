export interface Faction {
  name: string
  image: string
}

export interface UnitDef {
  unit: string
  name: string
  image: string
}

export interface CategoryDef {
  name: string
  image: string
  factions: Array<UnitDef>[]
}

export const KeyActions = {
  Gridmenu: {
    Category1: 'gridmenu_category 1',
    Category2: 'gridmenu_category 2',
    Category3: 'gridmenu_category 3',
    Category4: 'gridmenu_category 4',

    Key11: 'gridmenu_key 1 1',
    Key12: 'gridmenu_key 1 2',
    Key13: 'gridmenu_key 1 3',
    Key14: 'gridmenu_key 1 4',

    Key21: 'gridmenu_key 2 1',
    Key22: 'gridmenu_key 2 2',
    Key23: 'gridmenu_key 2 3',
    Key24: 'gridmenu_key 2 4',

    Key31: 'gridmenu_key 3 1',
    Key32: 'gridmenu_key 3 2',
    Key33: 'gridmenu_key 3 3',
    Key34: 'gridmenu_key 3 4',

    NextPage: 'next_page',
    CycleBuilder: 'cycle_builder',
  },
} as const
