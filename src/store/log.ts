export default {
  namespaced: true,
  state: {
    count: 10,
    info: 'log...'
  },
  getters: {
    doubleCount(state: any) {
      return state.count * 10
    }
  },
  mutations: {
    addCount(state: any, n: number) {
      state.count += n
    }
  },
  actions: {
    syncAddCount({ commit }: any, n: number) {
      setTimeout(() => {
        commit('addCount', n)
      }, 2000)
    }
  }
}
