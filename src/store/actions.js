export default {
  addCart(context, payload) {
    //查找之前数组中是否有该商品
    let oldproduct = context.state.carList.find(item => item.iid === payload.iid)

    //判断oldproduct
    if (oldproduct) {
      // oldproduct.count += 1
      context.commit('addCart', oldproduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit('AddToCart', payload)
    }
  }
}