import { AjaxCart, AjaxProduct, AjaxLineItem, AjaxAddToCartResponse } from '@/types/ajaxApi'
import { ChildMethods } from '@/composables/useParentFrame'
import axios, { AxiosResponse } from 'axios'
import { connectToChild } from 'penpal'

type WindowExtended = Window & typeof globalThis & { Shopify: { shop: string } }

class Cart {
  childFrame = {} as ChildMethods
  parentOrigin = window.location.origin
  shopOrigin = (window as WindowExtended).Shopify.shop
  frame: HTMLIFrameElement = this.createFrame()
  parentMethods = {
    getCart: async (): Promise<AjaxCart> => {
      const { data } = await axios({ url: '/cart.js', method: 'get' })
      return data
    },
    getProduct: async (handle: string): Promise<AjaxProduct> => {
      const { data } = await axios({ url: `/products/${handle}.js`, method: 'get' })
      return data
    },
    addToCart: async (variantId: string | number, quantity: string | number): Promise<AjaxLineItem> => {
      const body = { items: [{ id: variantId, quantity }] }
      const { data } = (await axios({ url: `/cart/add.js`, method: 'post', data: body })) as AxiosResponse<AjaxAddToCartResponse>
      return data.items[0]
    },
    changeLineItemQuantity: async (lineItemKey: string, quantity: number): Promise<AjaxCart> => {
      const body = { id: lineItemKey, quantity }
      const { data } = await axios({ url: '/cart/change.js', method: 'post', data: body })
      return data
    },
    open: this.open.bind(this),
    close: this.close.bind(this)
  }

  async init() {
    document.body.appendChild(this.frame)
    this.childFrame = await this.connect()
    this.attachEventListeners()
    console.log('Cart is ready.')
  }

  createFrame(): HTMLIFrameElement {
    const frame = document.createElement('iframe')
    const querystring = `?${this.shopOrigin ? `shopOrigin=${this.shopOrigin}` : ''}&${this.parentOrigin ? `parentOrigin=${this.parentOrigin}` : ''}`
    frame.src = `${process.env.VUE_APP_PLUGIN_URL}${querystring}`
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    frame.style.border = '0'
    frame.style.height = '100%'
    frame.style.width = '100vw'
    frame.style.bottom = '0'
    frame.style.left = '0'
    frame.style.zIndex = '2147483001'
    return frame
  }

  connect() {
    return connectToChild({ iframe: this.frame, methods: this.parentMethods }).promise as Promise<ChildMethods>
  }

  open() {
    this.frame.style.display = 'block'
    this.childFrame.open()
  }

  async close() {
    await this.childFrame.close()
    this.frame.style.display = 'none'
  }

  attachEventListeners() {
    const buttons = document.querySelectorAll('[href="/cart"]')
    for (const button of buttons) {
      button.addEventListener('click', e => {
        e.preventDefault()
        this.open()
      })
    }
  }
}

const checkout = new Cart()
checkout.init()

export type ParentMethods = typeof checkout.parentMethods
