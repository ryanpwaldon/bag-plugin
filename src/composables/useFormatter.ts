import getLocale from '@/utils/getLocale'
import { composeGid } from '@shopify/admin-graphql-api-utilities'

const currency = (amount: number, currencyCode: string) => {
  // try narrowSymbol ($), if fails, use default (AU$)
  try {
    return new Intl.NumberFormat(getLocale(), {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(amount)
  } catch (err) {
    console.log(err)
    return new Intl.NumberFormat(getLocale(), {
      style: 'currency',
      currency: currencyCode
    }).format(amount)
  }
}

const toGid = (key: string, id: string | number) => {
  return composeGid(key, id)
}

export default () => ({
  formatter: {
    currency,
    toGid
  }
})
