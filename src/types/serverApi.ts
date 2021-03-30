import { AjaxProduct } from '@/types/ajaxApi'

export type CrossSell = {
  id: string
  user: string
  active: boolean
  activeFor: number
  title: string
  subtitle: string
  triggerProductIds: string[]
  productId: string
  product: AjaxProduct
  createdAt: Date
}

export type ProgressBar = {
  id: string
  active: boolean
  title: string
  goal: number
  image: string
  completionMessage?: string
}
