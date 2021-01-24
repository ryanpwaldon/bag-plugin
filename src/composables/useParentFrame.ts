import { ref } from 'vue'
import { connectToParent } from 'penpal'
import { ParentMethods } from '../../script/start'

export type ChildMethods = {
  open: () => void
  close: () => void
}

const parentFrame = ref({} as ParentMethods)

const connect = async (childMethods: ChildMethods) => {
  parentFrame.value = await (connectToParent({ methods: childMethods }).promise as Promise<ParentMethods>)
}

export default () => {
  return {
    connect,
    parentFrame
  }
}
