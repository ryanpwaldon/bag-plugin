import isPlainObject from 'lodash/isPlainObject'

export const cloneKeys = <T>(target: T) => {
  return Object.entries(target).reduce((clone: { [key: string]: object | undefined }, [key, value]) => {
    clone[key] = isPlainObject(value) ? cloneKeys(value) : undefined
    return clone
  }, {})
}
