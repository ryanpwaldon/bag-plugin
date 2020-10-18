interface Product {
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
  variants: Variant[]
  images: string[]
  featured_image: string
  options: Option[]
  url: string
  media: Media[]
}

interface Media {
  alt: null | string
  id: number
  position: number
  preview_image: PreviewImage
  aspect_ratio: number
  height: number
  media_type: MediaType
  src: string
  width: number
}

enum MediaType {
  Image = 'image'
}

interface PreviewImage {
  aspect_ratio: number
  height: number
  width: number
  src: string
}

interface Option {
  name: string
  position: number
  values: string[]
}

interface Variant {
  id: number
  title: string
  option1: string
  option2: null | string
  option3: null
  sku: string
  requires_shipping: boolean
  taxable: boolean
  featured_image: VariantFeaturedImage | null
  available: boolean
  name: string
  public_title: null | string
  options: string[]
  price: number
  weight: number
  compare_at_price: number | null
  inventory_management: InventoryManagement | null
  barcode: string
  featured_media?: FeaturedMedia
}

interface VariantFeaturedImage {
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

enum InventoryManagement {
  Shopify = 'shopify'
}

interface FeaturedMedia {
  alt: null | string
  id: number
  position: number
  preview_image: PreviewImage
}

interface LineItem {
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
  featured_image: ItemFeaturedImage
  image: string
  handle: string
  requires_shipping: boolean
  product_type: string
  product_title: string
  product_description: string
  variant_title: null | string
  variant_options: string[]
  options_with_values: OptionsWithValue[]
  line_level_discount_allocations: any[]
  line_level_total_discount: number
}

interface ItemFeaturedImage {
  aspect_ratio: number
  alt: string
  height: number
  url: string
  width: number
}

interface OptionsWithValue {
  name: string
  value: string
}

export interface CartResponse {
  token: string
  note: null
  attributes: any
  original_total_price: number
  total_price: number
  total_discount: number
  total_weight: number
  item_count: number
  items: LineItem[]
  requires_shipping: boolean
  currency: string
  items_subtotal_price: number
  cart_level_discount_applications: any[]
}

export interface CartAddResponse {
  items: LineItem[]
}

export interface ProductResponse {
  (...Product)
}

export interface ProductRecommendationsResponse {
  products: Product[]
}
