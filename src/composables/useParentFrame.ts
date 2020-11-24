import { connectToParent } from 'penpal'
import { ParentMethods } from 'public/script'
import { computed, WritableComputedRef } from 'vue'

export type ChildMethods = {
  open: () => void
  close: () => void
}

export default () => {
  const methods: WritableComputedRef<ParentMethods> = computed({
    set: value => value,
    get(value) {
      if (!value) throw new Error('Attempted to access parent frame methods before successful connection.')
      return value
    }
  })
  const connect = async (childMethods: ChildMethods) => {
    methods.value = await (connectToParent({ methods: childMethods }).promise as Promise<ParentMethods>)
  }
  return {
    connect,
    methods
  }
}
