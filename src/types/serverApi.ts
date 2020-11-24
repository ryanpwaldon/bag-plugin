export interface ServerProduct {
  title: string
  handle: string
  hasOnlyDefaultVariant: boolean
  featuredImage: { originalSrc: string }
  variants: { edges: [{ node: ServerVariant }] }
}

export interface ServerVariant {
  legacyResourceId: string
  title: string
  price: number
  availableForSale: boolean
  image: { originalSrc: string }
  selectedOptions: [{ name: string; value: string }]
}
