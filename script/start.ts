/* eslint @typescript-eslint/no-explicit-any: 0 */

import axios from 'axios'
import { connectToChild } from 'penpal'
import { PageMonitor } from './/components/page-monitor'
import { ChildMethods } from '../src/composables/useParentFrame'
import { enableScrollLock, disableScrollLock } from 'scroll-lock-body'
import { AjaxCart, AjaxProduct, AjaxLineItem } from '../src/types/ajaxApi'

export type CartOpenMethod = 'cart-button' | 'add-to-cart-form'

const querystring = (params: Record<string, string | boolean | number | undefined>) => {
  return Object.entries(params).reduce((qs, [key, value]) => (value ? (qs += `${qs && '&'}${key}=${encodeURIComponent(value)}`) : qs), '')
}

export class App {
  isOpen = false
  cartReady = false
  transitioning = false
  childFrame = {} as ChildMethods
  scrollLockStyleTag = document.createElement('style')
  debug = new URLSearchParams(window.location.search).get('debug') === 'true'
  frame = this.createFrame()
  parentMethods = {
    open: this.open.bind(this),
    close: this.close.bind(this),
    getCart: this.getCart.bind(this),
    getProductById: this.getProductById.bind(this),
    openRelativeLink: this.openRelativeLink.bind(this),
    getProductByHandle: this.getProductByHandle.bind(this),
    getWindowInnerWidth: this.getWindowInnerWidth.bind(this),
    getUserCartSettings: this.getUserCartSettings.bind(this),
    addToCartFromParams: this.addToCartFromParams.bind(this),
    addToCartFromFormData: this.addToCartFromFormData.bind(this),
    changeLineItemQuantity: this.changeLineItemQuantity.bind(this)
  }

  constructor() {
    this.logger('Script constructor called.')
    this.init()
  }

  logger(...args: unknown[]) {
    if (this.debug) {
      const timeElapsed = new Date().getTime() - window.performance.timing.navigationStart
      console.log(`[Bag Script] Time: ${timeElapsed}`)
      console.log('[Bag Script] Data:', ...args)
    }
  }

  async init() {
    document.body.appendChild(this.frame)
    new PageMonitor(this, this.frame)
    this.setupScrollLock()
    this.childFrame = await this.connect()
    this.cartReady = true
    this.logger('Cart ready.')
  }

  getUserCartSettings() {
    return window.bagCartSettings
  }

  async setupScrollLock() {
    this.scrollLockStyleTag = document.createElement('style')
    document.head.appendChild(this.scrollLockStyleTag)
  }

  lockScroll() {
    this.scrollLockStyleTag.innerHTML = `
      html {
        overflow-y: scroll;
      }
      html[scroll-lock-is-active] > body {
        overflow: hidden;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
      }
      body {
        margin: 0;
        overflow-y: auto; /* overflow-y: scroll -> shows double scroll */
      }
    `
    enableScrollLock()
  }

  unlockScroll() {
    this.scrollLockStyleTag.innerHTML = ''
    disableScrollLock()
  }

  createFrame(): HTMLIFrameElement {
    const frame = document.createElement('iframe')
    frame.src = `${process.env.VUE_APP_PLUGIN_URL}?${querystring({
      debug: this.debug,
      locale: window.Shopify.locale,
      shopOrigin: window.Shopify.shop,
      navigationStart: window.performance.timing.navigationStart
    })}`
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    frame.style.border = '0'
    frame.style.height = '100%'
    frame.style.width = '100%'
    frame.style.bottom = '0'
    frame.style.left = '0'
    frame.style.zIndex = '2147483647'
    return frame
  }

  connect() {
    return connectToChild({ iframe: this.frame, methods: this.parentMethods }).promise as Promise<ChildMethods>
  }

  async open(cartOpenMethod: CartOpenMethod) {
    if (this.transitioning || this.isOpen) return
    this.lockScroll()
    this.transitioning = true
    this.frame.style.display = 'block'
    await this.childFrame.open(cartOpenMethod)
    this.transitioning = false
    this.isOpen = true
  }

  async close() {
    if (this.transitioning || !this.isOpen) return
    this.unlockScroll()
    this.transitioning = true
    await this.childFrame.close()
    this.frame.style.display = 'none'
    this.transitioning = false
    this.isOpen = false
  }

  getWindowInnerWidth() {
    return window.innerWidth
  }

  openRelativeLink(relativeLink: string) {
    window.location.href = `${window.location.origin}${relativeLink}`
  }

  async getCart(): Promise<AjaxCart> {
    const { data } = await axios({ url: '/cart.js', method: 'get' })
    return data
  }

  async getProductByHandle(handle: string): Promise<AjaxProduct> {
    const { data } = await axios({ url: `/products/${handle}.js`, method: 'get' })
    return data
  }

  async getProductById(id: string): Promise<AjaxProduct> {
    let data
    let handle
    const querystring = `resources[type]=product&q=id:${id}`
    try {
      handle = (await axios({ url: `/search/suggest.json?${querystring}`, method: 'get' })).data.resources.results.products[0].handle
      data = (await axios({ url: `/products/${handle}.js`, method: 'get' })).data
    } catch (err) {
      console.warn('Could not fetch product.')
    }
    return data
  }

  async addToCartFromFormData(formData: FormData) {
    return (await axios({ url: `/cart/add.js`, method: 'post', data: formData })).data as AjaxLineItem
  }

  async addToCartFromParams(variantId: string, quantity: string) {
    const formData = new FormData()
    formData.append('id', variantId)
    formData.append('quantity', quantity)
    return (await axios({ url: `/cart/add.js`, method: 'post', data: formData })).data as AjaxLineItem
  }

  async changeLineItemQuantity(lineItemKey: string, quantity: number): Promise<AjaxCart> {
    const body = { id: lineItemKey, quantity }
    const { data } = await axios({ url: '/cart/change.js', method: 'post', data: body })
    return data
  }
}

const app = new App()

export type ParentMethods = typeof app.parentMethods
