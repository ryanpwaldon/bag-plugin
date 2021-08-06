import { connectToParent } from 'penpal'
import { CartOpenMethod, ParentMethods } from '../../script/start'

export type ChildMethods = {
  open: (cartOpenMethod: CartOpenMethod) => void
  close: () => void
}

let parentFrame = null as ParentMethods | null

let resolveConnectedToParentFrame: () => void
export const connectedToParentFrame = new Promise(resolve => (resolveConnectedToParentFrame = resolve as () => void))

export const getParentFrame = () => {
  if (parentFrame) return parentFrame
  throw Error('Method not in parent frame.')
}

export const connectToParentFrame = async (childMethods: ChildMethods) => {
  try {
    parentFrame = (await connectToParent({ methods: childMethods }).promise) as ParentMethods
    resolveConnectedToParentFrame()
  } catch (err) {
    console.error(err)
    throw Error('Could not connect to parent frame.')
  }
}
