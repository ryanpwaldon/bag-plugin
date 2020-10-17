import store from '@/store/store'
import { ParentMethods } from 'public/script'
import { connectToParent } from 'penpal'

const exposedMethods = {
  open: () => store.dispatch('open')
}

export type ChildMethods = typeof exposedMethods

function connect() {
  const methods = exposedMethods
  return connectToParent({ methods }).promise as Promise<ParentMethods>
}

let comms: ParentMethods | undefined

export const init = async () => {
  comms = await connect()
}

export default comms
