/* eslint @typescript-eslint/no-explicit-any: 0 */

import { connectToChild } from 'penpal'
import getFormData from 'get-form-data'
import axios, { AxiosResponse } from 'axios'
import { parseGid } from '@shopify/admin-graphql-api-utilities'
import { ChildMethods } from '../src/composables/useParentFrame'
import { AjaxCart, AjaxProduct, AjaxLineItem } from '../src/types/ajaxApi'

const querystring = (params: Record<string, string | boolean | number | undefined>) => {
  return Object.entries(params).reduce((qs, [key, value]) => (value ? (qs += `${qs && '&'}${key}=${encodeURIComponent(value)}`) : qs), '')
}

const cancelEvent = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
}

class App {
  cartReady = false
  transitioning = false
  childFrame = {} as ChildMethods
  debug = new URLSearchParams(window.location.search).get('debug') === 'true'
  frame = this.createFrame()
  parentMethods = {
    open: this.open.bind(this),
    close: this.close.bind(this),
    getCart: this.getCart.bind(this),
    addToCart: this.addToCart.bind(this),
    getProductById: this.getProductById.bind(this),
    openRelativeLink: this.openRelativeLink.bind(this),
    getProductByHandle: this.getProductByHandle.bind(this),
    getWindowInnerWidth: this.getWindowInnerWidth.bind(this),
    changeLineItemQuantity: this.changeLineItemQuantity.bind(this)
  }

  constructor() {
    this.logger('Script constructor called.')
    this.init()
  }

  logger(data: any) {
    if (this.debug) {
      const timeElapsed = new Date().getTime() - window.performance.timing.navigationStart
      console.log(`[Bag Script] Time: ${timeElapsed}`)
      console.log('[Bag Script] Data:', data)
    }
  }

  async init() {
    this.overrideCartButtons()
    this.overrideAddToCartSubmit()
    this.overrideAddToCartButtonClicks()
    document.body.appendChild(this.frame)
    this.childFrame = await this.connect()
    this.cartReady = true
    this.logger('Cart ready.')
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
    const querystring = `resources[type]=product&q=id:${parseGid(id)}`
    try {
      handle = (await axios({ url: `/search/suggest.json?${querystring}`, method: 'get' })).data.resources.results.products[0].handle
      data = (await axios({ url: `/products/${handle}.js`, method: 'get' })).data
    } catch (err) {
      console.warn('Could not fetch product.')
    }
    return data
  }

  // use form data to prevent inventory availability errors
  async addToCart(variantId: string | number, quantity: string | number): Promise<AjaxLineItem> {
    if (typeof variantId === 'number') variantId.toString()
    if (typeof quantity === 'number') quantity.toString()
    const formData = new FormData()
    formData.append('id', variantId as string)
    formData.append('quantity', quantity as string)
    const { data } = (await axios({ url: `/cart/add.js`, method: 'post', data: formData })) as AxiosResponse<AjaxLineItem>
    return data
  }

  async changeLineItemQuantity(lineItemKey: string, quantity: number): Promise<AjaxCart> {
    const body = { id: lineItemKey, quantity }
    const { data } = await axios({ url: '/cart/change.js', method: 'post', data: body })
    return data
  }

  async cartButtonClickHandler(e: Event) {
    if (!this.cartReady) return
    cancelEvent(e)
    this.open()
  }

  async addToCartSubmitHandler(e: Event) {
    if (!this.cartReady) return
    cancelEvent(e)
    const target = e.target as Element
    const form = target.closest('form')
    const values = getFormData(form)
    const id = values.id
    const quantity = values.quantity || 1
    await this.addToCart(id, quantity)
    this.open()
  }

  overrideCartButtons() {
    const buttons = document.querySelectorAll('[href$="/cart"]')
    for (const button of buttons) button.addEventListener('click', this.cartButtonClickHandler.bind(this))
  }

  overrideAddToCartSubmit() {
    const forms = document.querySelectorAll('form[action$="/cart/add"]')
    for (const form of forms) form.addEventListener('submit', this.addToCartSubmitHandler.bind(this))
  }

  overrideAddToCartButtonClicks() {
    const keywords = ['add to cart', 'add_to_cart', 'add-to-cart', 'addtocart', 'submit', 'cart']
    const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('form[action$="/cart/add"]')
    for (const form of forms) {
      const buttons = Array.from(form.querySelectorAll('button, input'))
      const scores = buttons.map(button => (button.outerHTML.toLowerCase().match(new RegExp(keywords.join('|'), 'g')) || []).length)
      const button = buttons[scores.indexOf(Math.max(...scores))]
      button.addEventListener('click', this.addToCartSubmitHandler.bind(this))
    }
  }
}

const app = new App()

export type ParentMethods = typeof app.parentMethods
