import DefaultKeybinds from '@/bar/gridmenu_keys.json'

export function useKeybindActions(): { [action: string]: { action: string, keys: string[] } } {
  const contents = DefaultKeybinds.default

  return Array.from(contents.matchAll(/^bind +(.+?) +(gridmenu_.*)$/gm))
              .map(match => ({ key: match[1], action: match[2] }))
              .reduce((acc, { key, action }) => {
                acc[action] ??= { action, keys: [] }
                acc[action].keys.push(key)
                return acc
              }, {})

}
