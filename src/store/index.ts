import Vue from 'vue'
import Vuex from 'vuex'

import Root from './root'
import Log from './log'

Vue.use(Vuex)

export default new Vuex.Store<any>({
  modules: {
    Root,
    Log
  }
})
