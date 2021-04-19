import { Offer, TriggerCondition, TriggerGroup, TriggerProperty, Trigger } from '@/types/serverApi'

type ProductResource = {
  id: string
}

type VariantResource = {
  id: string
  variants: { id: string }[]
}

export type TriggerData = {
  subtotal: number
  productIds: string[]
  variantIds: string[]
  productTags: string[]
  productTypes: string[]
  productVendors: string[]
}

const evaluateTrigger = (data: TriggerData, trigger: Trigger): boolean => {
  switch (trigger.property) {
    case TriggerProperty.Product: {
      const triggerProductIds = (trigger.value as ProductResource[]).map(({ id }) => id)
      const intersects = !!data.productIds.filter(id => triggerProductIds.includes(id)).length
      return trigger.condition === TriggerCondition.Includes ? intersects : !intersects
    }
    case TriggerProperty.Variant: {
      const triggerVariantIds: string[] = []
      for (const { variants } of trigger.value as VariantResource[]) triggerVariantIds.push(...variants.map(({ id }) => id))
      const intersects = !!data.variantIds.filter(id => triggerVariantIds.includes(id)).length
      return trigger.condition === TriggerCondition.Includes ? intersects : !intersects
    }
    case TriggerProperty.ProductTag: {
      const intersects = data.productTags.includes(trigger.value as string)
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
