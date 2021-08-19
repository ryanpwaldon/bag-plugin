import { App } from '../start'

export class PageMonitor {
  app: App
  iframe: HTMLIFrameElement

  constructor(app: App, iframe: HTMLIFrameElement) {
    this.app = app
    this.iframe = iframe
    this.startPageMonitor()
  }

  startPageMonitor() {
    this.overrideAllActions()
    new MutationObserver(this.debounce(this.overrideAllActions.bind(this), 250)).observe(document.body, { childList: true, subtree: true })
    new MutationObserver(this.shuffleElements.bind(this)).observe(document.body, { childList: true })
  }

  // Ensure Bag appears at bottom of <body>
  shuffleElements(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      const elements = [...mutation.addedNodes]
      for (const element of elements) {
        if (this.iframe.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) {
          this.iframe.before(element)
          this.app.logger(`Shuffled element: ${element}`)
        }
      }
    }
  }

  overrideAllActions() {
    this.app.logger('Override all actions.')
    this.overrideCartButtonClicks()
    this.overrideAddToCartForms()
  }

  overrideElement(element: HTMLElement, eventType: string, listener: EventListenerOrEventListenerObject) {
    if (element.hasAttribute('data-bag-attached') || element.hasAttribute('data-bag-ignore')) return
    element.setAttribute('data-bag-attached', '')
    const clone = element.cloneNode(false) as Element
    clone.addEventListener(eventType, listener)
    clone.append(...element.childNodes)
    element.replaceWith(clone)
    this.app.logger('Element cloned: ', clone)
  }

  overrideCartButtonClicks() {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('[href$="/cart"], [href$="/cart/"]')
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
    this.app.open('cart-button')
  }

  async addToCartFormSubmissionHandler(e: Event) {
    if (!this.app.cartReady) return
    const form = (e.target as Element).closest('form')
    if (form) {
      this.cancelEvent(e)
      const formIsValid = form.checkValidity()
      if (!formIsValid) return form.reportValidity()
      const formData = new FormData(form)
      await this.app.addToCartFromFormData(formData)
      this.app.open('add-to-cart-form')
    }
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
