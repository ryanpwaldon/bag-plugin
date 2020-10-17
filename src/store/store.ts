import { createStore } from 'vuex'

export default createStore({
  state: {
    open: false
  },
  mutations: {
    setOpen(state, payload) {
      state.open = payload
    }
  },
  actions: {
    open({ commit }) {
      commit('setOpen', true)
    },
    close({ commit }) {
      commit('setOpen', false)
    }
  }
})
