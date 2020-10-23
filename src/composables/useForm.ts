// Performance improvements: Convert errors to hashmap

import set from 'lodash/set'
import isEqual from 'lodash/isEqual'
import { cloneKeys } from '@/utils/cloneKeys'
import { ValidationError, ObjectSchema } from 'yup'
import { computed, Ref, ref } from 'vue'

export default <T extends object>(schema: ObjectSchema<T>, handleSubmit: (values: T) => void) => {
  const defaults = schema.default()
  const values = ref({ ...defaults }) as Ref<T>
  const errors = ref(cloneKeys(values.value))
  const modified = computed(() => !isEqual(defaults, values.value))
  const udpateError = (path: string, message?: string) => set(errors.value, path, message)
  const updateValue = async <V>(path: string, value: V) => {
    set(values.value, path, value)
    await schema
      .validateAt(path, values.value)
      .then(() => udpateError(path, undefined))
      .catch((error: ValidationError) => udpateError(path, error.message))
  }
  const attemptSubmit = async () => {
    const valid = await schema
      .validate(values.value, { abortEarly: false })
      .then(() => true)
      .catch((error: ValidationError) => {
        error.inner.forEach(({ path, message }) => udpateError(path, message))
        return false
      })
    if (valid) handleSubmit(values.value)
  }

  return { values, errors, modified, updateValue, attemptSubmit }
}
