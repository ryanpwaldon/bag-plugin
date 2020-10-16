import axios from 'axios'
import { connectToChild } from 'penpal'

const plugin = {
  frame: null,
  child: null,
  async init() {
    this.createFrame()
    await this.establishConnection()
    this.addTriggers()
  },
  createFrame() {
    this.frame = document.createElement('iframe')
    this.frame.src = `${process.env.VUE_APP_PLUGIN_URL}`
    this.frame.style.display = 'none'
    this.frame.style.position = 'fixed'
    this.frame.style.border = '0'
    this.frame.style.height = '100vh'
    this.frame.style.width = '100vw'
    this.frame.style.bottom = '0'
    this.frame.style.left = '0'
    this.frame.style.zIndex = '2147483001'
    document.body.appendChild(this.frame)
  },
  async establishConnection() {
    this.child = await connectToChild({
      iframe: this.frame,
      methods: {
        hideFrame: this.hideFrame.bind(this),
        getParentOrigin: () => window.location.origin,
        getShopOrigin: () => window.Shopify && window.Shopify.shop,
        getCart: async () => (await axios({ url: '/cart.js', method: 'get' })).data,
        getProductDetails: async handle => (await axios({ url: `/products/${handle}.js`, method: 'get' })).data,
        updateQuantity: async (id, quantity) => (await axios({ url: '/cart/change.js', method: 'post', data: { id, quantity } })).data
      }
    }).promise
  },
  addTriggers() {
    const buttons = document.querySelectorAll('[href="/cart"]')
    for (const button of buttons) {
      button.addEventListener('click', e => {
        e.preventDefault()
        this.showFrame()
        this.child.open()
      })
    }
  },
  showFrame() {
    this.frame.style.display = 'block'
  },
  hideFrame() {
    this.frame.style.display = 'none'
  }
}

plugin.init()
