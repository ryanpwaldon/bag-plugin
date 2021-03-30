/* eslint @typescript-eslint/no-explicit-any: 0 */

import getTimeElapsed from '@/utils/getTimeElapsed'
import getDebuggerState from '@/utils/getDebuggerState'

export default (data: any) => {
  const debug = getDebuggerState()
  if (debug) {
    const timeElapsed = getTimeElapsed()
    console.log(`[Bag] Time: ${timeElapsed}`)
    console.log('[Bag] Data:', data)
  }
}
