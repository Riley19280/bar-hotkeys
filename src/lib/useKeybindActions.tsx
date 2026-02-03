import DefaultKeybinds from '@/bar/gridmenu_keys.json'

export function useKeybindActions() {
  const contents = DefaultKeybinds.default

  return Array.from(contents.matchAll(/^bind +(.+?) +gridmenu_(.*)$/gm))
              .map(match => {
                return {
                  key: match[1],
                  action: match[2]
                }
              }).filter(x => x)
}
