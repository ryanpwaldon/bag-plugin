import { connectToParent } from 'penpal'
import { ParentMethods } from 'public/script'
import { ref, Ref, watch } from 'vue'

export type ChildMethods = {
  open: () => void
  close: () => void
}

const parentMethods: Ref<ParentMethods | null> = ref(null)

export const comms: Promise<ParentMethods> = new Promise(resolve => {
  if (parentMethods.value) return resolve(parentMethods.value)
  const cancel = watch(parentMethods, value => {
    if (!value) return
    resolve(value)
    cancel()
  })
})

export const connect = async (childMethods: ChildMethods) => {
  parentMethods.value = await (connectToParent({ methods: childMethods }).promise as Promise<ParentMethods>)
}
