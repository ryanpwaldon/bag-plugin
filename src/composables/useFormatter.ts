import getLocale from '@/utils/getLocale'
import { composeGid } from '@shopify/admin-graphql-api-utilities'

const currency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol'
  }).format(amount)
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
