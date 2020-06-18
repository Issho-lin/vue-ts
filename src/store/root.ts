export default {
  namespaced: true,
  state: {
    count: 0,
    info: 'hello store'
  },
  getters: {
    doubleCount(state: any) {
      return state.count * 2
    }
  },
  mutations: {
    addCount(state: any, num: number) {
      state.count += num
    }
  },
  actions: {
    syncAddCount({ commit }: any, num: number) {
      setTimeout(() => {
        commit('addCount', num)
      }, 1000)
    }
  }
}
