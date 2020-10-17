import { ChildMethods } from '@/services/comms/comms'
import { connectToChild } from 'penpal'
import axios from 'axios'

class Checkout {
  comms = {} as ChildMethods
  frame: HTMLIFrameElement = this.createFrame()
  exposedMethods = {
    getCart: async () => {
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
    getProductDetails: async (slug: string) => {
      const { data } = await axios({ url: `/products/${slug}.js`, method: 'get' })
      return data
    },
    updateQuantity: async (id: string, quantity: string) => {
      const { data } = await axios({ url: '/cart/change.js', method: 'post', data: { id, quantity } })
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
