import set from 'lodash/set'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import { cloneKeys } from '@/utils/cloneKeys'
import { ValidationError, ObjectSchema } from 'yup'
import { computed, Ref, ref } from 'vue'

export default <T extends object>(schema: ObjectSchema<T>) => {
  const defaults = schema.default()
  const castedDefaults = merge(defaults, schema.cast(defaults))
  const values = ref({ ...castedDefaults }) as Ref<T>
  const errors = ref(cloneKeys(values.value))
  const modified = computed(() => !isEqual(defaults, values.value))
  let onSuccessfulSubmitCallback: (values: T, defaults: T) => void = () => undefined
  const onSuccessfulSubmit = (callback: typeof onSuccessfulSubmitCallback) => (onSuccessfulSubmitCallback = callback)
  const udpateError = (path: string, message?: string) => set(errors.value, path, message)
  const updateValue = async <T>(path: string, value: T) => {
    set(values.value, path, value)
    await schema
      .validateAt(path, values.value)
      .then(() => udpateError(path, undefined))
      .catch((error: ValidationError) => udpateError(path, error.message))
  }
  const submit = async (e: Event) => {
    e.preventDefault()
    const valid = await schema
      .validate(values.value, { abortEarly: false })
      .then(() => true)
      .catch((error: ValidationError) => {
        error.inner.forEach(({ path, message }) => udpateError(path, message))
        return false
      })
    if (valid) onSuccessfulSubmitCallback(values.value, defaults)
  }
  return { values, errors, modified, updateValue, submit, onSuccessfulSubmit }
}
