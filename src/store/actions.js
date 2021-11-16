import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export default {
  addCart(context, payload) {
    return new Promise((res, rej) => {
      //查找之前数组中是否有该商品
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldproduct
      if (oldproduct) {
        // oldproduct.count += 1
        context.commit(ADD_COUNTER, oldproduct)
        res('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        res('添加新的商品')
      }
    })
  }
}