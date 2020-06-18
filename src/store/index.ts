import Vue from 'vue'
import Vuex from 'vuex'

import Root from './root'

Vue.use(Vuex)

export default new Vuex.Store<any>({
  modules: {
    Root
  }
})
