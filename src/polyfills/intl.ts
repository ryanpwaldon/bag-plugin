/* eslint @typescript-eslint/no-explicit-any: 0 */

import { shouldPolyfill as shouldPolyfillGetCanonicalLocales } from '@formatjs/intl-getcanonicallocales/should-polyfill'
import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill'
import { shouldPolyfill as shouldPolyfillNumberFormat } from '@formatjs/intl-numberformat/should-polyfill'

console.log(shouldPolyfillGetCanonicalLocales())
console.log(shouldPolyfillLocale())
console.log(shouldPolyfillNumberFormat())

export const intlPolyfill = async () => {
  if (shouldPolyfillGetCanonicalLocales()) await import('@formatjs/intl-getcanonicallocales/polyfill')
  if (shouldPolyfillLocale()) await import('@formatjs/intl-locale/polyfill')
  if (shouldPolyfillNumberFormat()) await import('@formatjs/intl-numberformat/polyfill')
  if ((Intl.NumberFormat as any).polyfilled) {
    await import('@formatjs/intl-numberformat/locale-data/en')
    await import('@formatjs/intl-numberformat/locale-data/fr')
    await import('@formatjs/intl-numberformat/locale-data/el')
  }
}
