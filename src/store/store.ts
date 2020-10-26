import offerService, { Offer } from '@/services/api/services/offerService'
import { createStore } from 'vuex'

export default createStore({
  state: {
    offers: null as Offer[] | null
  },
  getters: {},
  mutations: {
    setOffers(state, value) {
      state.offers = value
    }
  },
  actions: {
    async fetchOffers({ state, commit }) {
      if (state.offers) return state.offers
      commit('setOffers', await offerService.findAll())
      return state.offers
    }
  }
})
