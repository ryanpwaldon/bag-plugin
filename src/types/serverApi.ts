export interface ServerProduct {
  title: string
  hasOnlyDefaultVariant: boolean
  featuredImage: { originalSrc: string }
  variants: { edges: [{ node: ServerVariant }] }
}

export interface ServerVariant {
  legacyResourceId: string
  displayName: string
  price: number
  availableForSale: boolean
  image: { originalSrc: string }
  selectedOptions: [{ name: string; value: string }]
}

export interface ServerOffer {
  id: string
  user: string
  type: OfferType
  active: boolean
  activeFor: number
  discountId: string
  title: string
  subtitle: string
  triggers: string[]
  productId: string
}

enum OfferType {
  MinimumSpend = 'minimumSpend',
  ProductAddOn = 'productAddOn',
  ProductUpgrade = 'productUpgrade'
}
