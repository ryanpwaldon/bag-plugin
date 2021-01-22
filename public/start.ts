import { connectToChild } from 'penpal'
import axios, { AxiosResponse } from 'axios'
import { parseGid } from '@shopify/admin-graphql-api-utilities'
import { ChildMethods } from '../src/composables/useParentFrame'
import { AjaxCart, AjaxProduct, AjaxLineItem, AjaxAddToCartResponse } from '../src/types/ajaxApi'

declare global {
  interface Window {
    Shopify: {
      shop: string
    }
  }
}

class App {
  childFrame = {} as ChildMethods
  parentOrigin = window.location.origin
  shopOrigin = window.Shopify.shop
  frame: HTMLIFrameElement = this.createFrame()
  transitioning = false
  parentMethods = {
    getCart: async (): Promise<AjaxCart> => {
      const { data } = await axios({ url: '/cart.js', method: 'get' })
      return data
    },
    getProductByHandle: async (handle: string): Promise<AjaxProduct> => {
      const { data } = await axios({ url: `/products/${handle}.js`, method: 'get' })
      return data
    },
    getProductById: async (id: string): Promise<AjaxProduct> => {
      const querystring = `resources[type]=product&q=id:${parseGid(id)}`
      const handle = (await axios({ url: `/search/suggest.json?${querystring}`, method: 'get' })).data.resources.results.products[0].handle
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
    console.log('Cart init.')
    document.body.appendChild(this.frame)
    this.childFrame = await this.connect()
    this.attachEventListeners()
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

  async open() {
    if (this.transitioning) return
    this.transitioning = true
    this.frame.style.display = 'block'
    await this.childFrame.open()
    this.transitioning = false
  }

  async close() {
    if (this.transitioning) return
    this.transitioning = true
    await this.childFrame.close()
    this.frame.style.display = 'none'
    this.transitioning = false
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

const app = new App()
app.init()

export type ParentMethods = typeof app.parentMethods
