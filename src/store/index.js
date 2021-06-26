import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: null,
      auth: {}
    },
    getters: {
      user: state => state.user,
      auth: state => state.auth
    },
    mutations: {
      user (state, value) {
        state.user = value
      },
      auth (state, value) {
        state.auth = value
      }
    }
  })