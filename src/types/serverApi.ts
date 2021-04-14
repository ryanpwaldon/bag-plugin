import { AjaxProduct } from '@/types/ajaxApi'
import { TriggerGroup } from '@/composables/useFilterOffers'

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
