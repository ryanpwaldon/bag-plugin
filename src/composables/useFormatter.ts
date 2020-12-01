import { composeGid } from '@shopify/admin-graphql-api-utilities'

const getLocale = () => (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language)

const currency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
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
