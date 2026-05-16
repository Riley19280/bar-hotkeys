import {
  useLocalStorage,
} from '@uidotdev/usehooks'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

export function useVersionedLocalStorage<T>(
  version: string | number,
  key: string,
  data: T,
): [T, Dispatch<SetStateAction<T>>] {
  const newInitial = useMemo(() => ({ [version]: data }), [version, data])
  const [versionedData, setVersionedData] = useLocalStorage<Record<string, T>>(key, newInitial)

  const currentData = versionedData[version] ?? data

  useEffect(() => {
    if (!versionedData[version]) {
      setVersionedData(prev => ({ ...prev, [version]: data }))
    }
  }, [version, data, setVersionedData, versionedData])

  const setter = useCallback((newData: SetStateAction<T>) => {
    setVersionedData((prev) => {
      const current = prev[version]
      const value = newData instanceof Function ? newData(current) : newData
      return {
        ...prev,
        [version]: value,
      }
    })
  }, [version, setVersionedData])

  return [currentData, setter]
}
