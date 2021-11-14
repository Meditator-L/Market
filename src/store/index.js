import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      //payload添加新商品
      let oldproduct = null;
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldproduct = item;
        }
      }
      //判断oldproduct
      if (oldproduct) {
        oldproduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store