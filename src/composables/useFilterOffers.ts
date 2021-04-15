import { CrossSell, ProgressBar } from '@/types/serverApi'

export type Offer = CrossSell | ProgressBar

export enum TriggerProperty {
  Product = 'product',
  ProductType = 'productType',
  ProductVendor = 'productVendor',
  Subtotal = 'subtotal'
}

export enum TriggerCondition {
  Includes = 'includes',
  DoesNotInclude = 'doesNotInclude',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan'
}

interface Trigger {
  property: TriggerProperty
  condition: TriggerCondition
  value: unknown
}

export interface TriggerGroup {
  matchAll: boolean
  triggers: Array<TriggerGroup | Trigger>
}

export type TriggerData = {
  subtotal: number
  productIds: string[]
  productTypes: string[]
  productVendors: string[]
}

const evaluateTrigger = (data: TriggerData, trigger: Trigger): boolean => {
  switch (trigger.property) {
    case TriggerProperty.Product: {
      const intersects = !!data.productIds.filter(id => (trigger.value as string[]).includes(id)).length
      return trigger.condition === TriggerCondition.Includes ? intersects : !intersects
    }
    case TriggerProperty.ProductType: {
      const intersects = data.productTypes.includes(trigger.value as string)
      return trigger.condition === TriggerCondition.Includes ? intersects : !intersects
    }
    case TriggerProperty.ProductVendor: {
      const intersects = data.productVendors.includes(trigger.value as string)
      return trigger.condition === TriggerCondition.Includes ? intersects : !intersects
    }
    case TriggerProperty.Subtotal: {
      return trigger.condition === TriggerCondition.GreaterThan
        ? data.subtotal > (trigger.value as number)
        : data.subtotal < (trigger.value as number)
    }
    default: {
      return false
    }
  }
}

const evaluateTriggerGroup = (data: TriggerData, triggerGroup?: TriggerGroup): boolean => {
  if (!triggerGroup) return true
  const evaluatedTriggers: boolean[] = []
  triggerGroup.triggers.forEach(trigger => {
    if ('triggers' in trigger) evaluatedTriggers.push(evaluateTriggerGroup(data, trigger))
    else evaluatedTriggers.push(evaluateTrigger(data, trigger))
  })
  return evaluatedTriggers[triggerGroup.matchAll ? 'every' : 'some'](result => result === true)
}

export default () => (offers: Offer[], data: TriggerData): Offer[] => {
  const offersToDisplay = []
  for (const offer of offers) {
    if (!evaluateTriggerGroup(data, offer.triggerGroup)) continue
    if (offer.type === 'crossSell' && data.productIds.includes(offer.productId)) continue
    offersToDisplay.push(offer)
  }
  return offersToDisplay
}
