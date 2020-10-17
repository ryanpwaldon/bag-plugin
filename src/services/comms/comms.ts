import { ParentMethods } from 'public/script'
import { connectToParent } from 'penpal'

export type ChildMethods = {
  open: () => void
  close: () => void
}

export let comms: ParentMethods

export const connect = async (methods: ChildMethods) => {
  comms = await (connectToParent({ methods }).promise as Promise<ParentMethods>)
}
