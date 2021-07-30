import { App } from '../start'
import getFormData from 'get-form-data'

export class PageMonitor {
  app: App

  constructor(app: App) {
    this.app = app
    this.startPageMonitor()
  }

  startPageMonitor() {
    this.overrideAllActions()
    new MutationObserver(this.debounce(this.overrideAllActions.bind(this), 250)).observe(document.body, { childList: true, subtree: true })
  }

  overrideAllActions() {
    this.app.logger('Override all actions.')
    this.overrideCartButtonClicks()
    this.overrideAddToCartForms()
  }

  overrideElement(element: HTMLElement, eventType: string, listener: EventListenerOrEventListenerObject) {
    if (element.dataset.overridden) return
    element.dataset.overridden = true.toString()
    const clone = element.cloneNode(false) as Element
    clone.addEventListener(eventType, listener)
    clone.append(...element.childNodes)
    element.replaceWith(clone)
    this.app.logger('Element cloned: ', clone)
  }

  overrideCartButtonClicks() {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('[href$="/cart"]')
    for (const button of buttons) this.overrideElement(button, 'click', this.cartButtonClickHandler.bind(this))
  }

  overrideAddToCartForms() {
    const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('form[action$="/cart/add"]')
    const addToCartButtonKeywords = ['add to cart', 'add_to_cart', 'add-to-cart', 'addtocart', 'submit', 'cart']
    for (const form of forms) {
      const buttons: HTMLElement[] = Array.from(form.querySelectorAll('button, input'))
      const scores = buttons.map(button => (button.outerHTML.toLowerCase().match(new RegExp(addToCartButtonKeywords.join('|'), 'g')) || []).length)
      const button = buttons[scores.indexOf(Math.max(...scores))]
      this.overrideElement(form, 'submit', this.addToCartFormSubmissionHandler.bind(this))
      this.overrideElement(button, 'click', this.addToCartFormSubmissionHandler.bind(this))
    }
  }

  async cartButtonClickHandler(e: Event) {
    if (!this.app.cartReady) return
    this.cancelEvent(e)
    this.app.open()
  }

  async addToCartFormSubmissionHandler(e: Event) {
    if (!this.app.cartReady) return
    this.cancelEvent(e)
    const target = e.target as Element
    const form = target.closest('form')
    const values = getFormData(form)
    const id = values.id
    // if quantity is an array (very rare), select item with the highest value
    const quantity = Array.isArray(values.quantity) ? Math.max(...values.quantity.map((item: string) => parseInt(item))) : values.quantity || 1
    await this.app.addToCart(id, quantity)
    this.app.open()
  }

  debounce(fn: Function, ms = 0) {
    let timeoutId: number
    return function(this: unknown, ...args: unknown[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  cancelEvent(e: Event) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
}
