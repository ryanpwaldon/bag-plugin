import { AjaxVariant } from '@/types/ajaxApi'

export interface ServerProduct {
  image: string
  title: string
  variants: AjaxVariant[]
  hasOnlyDefaultVariant: boolean
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
