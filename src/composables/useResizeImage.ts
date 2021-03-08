import { getSizedImageUrl } from '@shopify/theme-images'

export default () => (src: string, size: number) => {
  return getSizedImageUrl(src, `${size}x`)
}
