import * as yup from 'yup'
import set from 'lodash/set'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import { WatchCallback, Ref, computed, ref, watch } from 'vue'
import { ValidationError } from 'yup'

const cloneStructure = (target: { [key: string]: any }) => {
  return Object.entries(target).reduce((clone: { [key: string]: any }, [key, value]) => {
    clone[key] = isPlainObject(value) ? cloneStructure(value) : undefined
    return clone
  }, {})
}

export default (schema: any, handleSubmit: any) => {
  type Model = yup.InferType<typeof schema>
  const defaults = schema.default()
  const initialValues: any = merge(defaults, schema.cast(defaults))
  const values: Ref<any> = ref({ ...initialValues })
  const errors: Ref<any> = ref(cloneStructure(values.value))
  const modified = computed(() => !isEqual(initialValues, values.value))

  const onEdit: WatchCallback<Model> = async values => {
    const handleError = (error: ValidationError) => set(errors.value, error.path, error.message) && false
    const validation = await schema.validate(values).catch(handleError)
  }
  watch(values, onEdit, { deep: true })

  const attemptSubmit = async () => {
    console.log('attempt submit')
    if (!modified.value) return
    const validation = await schema.validate(values.value)
    console.log('validation')
    handleSubmit(values.value)
  }

  return { values, errors, modified, attemptSubmit }
}
