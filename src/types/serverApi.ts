import { AjaxProduct } from '@/types/ajaxApi'

export enum TriggerProperty {
  Product = 'product',
  Variant = 'variant',
  Subtotal = 'subtotal',
  ProductTag = 'productTag',
  ProductType = 'productType',
  ProductVendor = 'productVendor'
}

export enum TriggerCondition {
  Includes = 'includes',
  DoesNotInclude = 'doesNotInclude',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan'
}

export interface Trigger {
  property: TriggerProperty
  condition: TriggerCondition
  value: unknown
}

export interface TriggerGroup {
  matchAll: boolean
  triggers: Array<TriggerGroup | Trigger>
}

export type CrossSell = {
  id: string
  user: string
  active: boolean
  activeFor: number
  title: string
  subtitle: string
  productId: string
  product: AjaxProduct
  createdAt: Date
  triggerGroup?: TriggerGroup
  type: 'crossSell'
}

export type ProgressBar = {
  id: string
  active: boolean
  title: string
  goal: number
  image: string
  completionMessage?: string
  triggerGroup?: TriggerGroup
  type: 'progressBar'
}

export type Offer = CrossSell | ProgressBar
