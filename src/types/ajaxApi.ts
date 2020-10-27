export interface AjaxProduct {
  id: number
  title: string
  handle: string
  description: string
  published_at: Date
  created_at: Date
  vendor: string
  type: string
  tags: string[]
  price: number
  price_min: number
  price_max: number
  available: boolean
  price_varies: boolean
  compare_at_price: number | null
  compare_at_price_min: number
  compare_at_price_max: number
  compare_at_price_varies: boolean
  variants: AjaxVariant[]
  images: string[]
  featured_image: string
  options: AjaxOption[]
  url: string
  media: AjaxMedia[]
}

interface AjaxMedia {
  alt: null | string
  id: number
  position: number
  preview_image: AjaxPreviewImage
  aspect_ratio: number
  height: number
  media_type: AjaxMediaType
  src: string
  width: number
}

enum AjaxMediaType {
  Image = 'image'
}

interface AjaxPreviewImage {
  aspect_ratio: number
  height: number
  width: number
  src: string
}

interface AjaxOption {
  name: string
  position: number
  values: string[]
}

export interface AjaxVariant {
  id: number
  title: string
  option1: string
  option2: null | string
  option3: null
  sku: string
  requires_shipping: boolean
  taxable: boolean
  featured_image: AjaxVariantFeaturedImage | null
  available: boolean
  name: string
  public_title: null | string
  options: string[]
  price: number
  weight: number
  compare_at_price: number | null
  inventory_management: AjaxInventoryManagement | null
  barcode: string
  featured_media?: AjaxFeaturedMedia
}

interface AjaxVariantFeaturedImage {
  id: number
  product_id: number
  position: number
  created_at: Date
  updated_at: Date
  alt: null | string
  width: number
  height: number
  src: string
  variant_ids: number[]
}

enum AjaxInventoryManagement {
  Shopify = 'shopify'
}

interface AjaxFeaturedMedia {
  alt: null | string
  id: number
  position: number
  preview_image: AjaxPreviewImage
}

export interface AjaxLineItem {
  id: number
  properties: any | null
  quantity: number
  variant_id: number
  key: string
  title: string
  price: number
  original_price: number
  discounted_price: number
  line_price: number
  original_line_price: number
  total_discount: number
  discounts: any[]
  sku: string
  grams: number
  vendor: string
  taxable: boolean
  product_id: number
  product_has_only_default_variant: boolean
  gift_card: boolean
  final_price: number
  final_line_price: number
  url: string
  featured_image: AjaxItemFeaturedImage
  image: string
  handle: string
  requires_shipping: boolean
  product_type: string
  product_title: string
  product_description: string
  variant_title: null | string
  variant_options: string[]
  options_with_values: AjaxOptionsWithValue[]
  line_level_discount_allocations: any[]
  line_level_total_discount: number
}

interface AjaxItemFeaturedImage {
  aspect_ratio: number
  alt: string
  height: number
  url: string
  width: number
}

interface AjaxOptionsWithValue {
  name: string
  value: string
}

export interface AjaxCart {
  token: string
  note: null
  attributes: any
  original_total_price: number
  total_price: number
  total_discount: number
  total_weight: number
  item_count: number
  items: AjaxLineItem[]
  requires_shipping: boolean
  currency: string
  items_subtotal_price: number
  cart_level_discount_applications: any[]
}

export interface AjaxAddToCartResponse {
  items: AjaxLineItem[]
}

export interface AjaxProductRecommendationsResponse {
  products: AjaxProduct[]
}
