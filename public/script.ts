import { ChildMethods } from '@/services/comms/comms'
import { Cart, Product, AddToCartResponse, LineItem } from '@/types/shopify'
import { connectToChild } from 'penpal'
import axios from 'axios'

class Checkout {
  comms = {} as ChildMethods
  frame: HTMLIFrameElement = this.createFrame()
  exposedMethods = {
    getCart: async (): Promise<Cart> => {
      const { data } = await axios({ url: '/cart.js', method: 'get' })
      return data
    },
    getShopOrigin: () => {
      // eslint-disable-next-line
      return (window as any).Shopify?.shop
    },
    getParentOrigin: () => {
      return window.location.origin
    },
    getProduct: async (handle: string): Promise<Product> => {
      const { data } = await axios({ url: `/products/${handle}.js`, method: 'get' })
      return data
    },
    addToCart: async (variantId: string | number, quantity: string | number): Promise<LineItem> => {
      const body = { items: [{ id: variantId, quantity }] }
      const { data }: { data: AddToCartResponse } = await axios({ url: `/cart/add.js`, method: 'post', data: body })
      return data.items[0]
    },
    changeLineItemQuantity: async (lineItemKey: string, quantity: number): Promise<Cart> => {
      const body = { id: lineItemKey, quantity }
      const { data } = await axios({ url: '/cart/change.js', method: 'post', data: body })
      return data
    },
    triggerStateChange: this.triggerStateChange.bind(this)
  }

  async init() {
    document.body.appendChild(this.frame)
    this.comms = await this.connect()
    this.attachEventListeners()
  }

  createFrame(): HTMLIFrameElement {
    const frame = document.createElement('iframe')
    frame.src = `${process.env.VUE_APP_PLUGIN_URL}`
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    frame.style.border = '0'
    frame.style.height = '100vh'
    frame.style.width = '100vw'
    frame.style.bottom = '0'
    frame.style.left = '0'
    frame.style.zIndex = '2147483001'
    return frame
  }

  connect() {
    const iframe = this.frame
    const methods = this.exposedMethods
    return connectToChild({ iframe, methods }).promise as Promise<ChildMethods>
  }

  async triggerStateChange(state: 'open' | 'close') {
    if (state === 'open') {
      this.frame.style.display = 'block'
      this.comms.open()
    } else {
      await this.comms.close()
      this.frame.style.display = 'none'
    }
  }

  attachEventListeners() {
    const buttons = document.querySelectorAll('[href="/cart"]')
    for (const button of buttons) {
      button.addEventListener('click', e => {
        e.preventDefault()
        this.triggerStateChange('open')
        this.comms.open()
      })
    }
  }
}

const checkout = new Checkout()
checkout.init()

export type ParentMethods = typeof checkout.exposedMethods
