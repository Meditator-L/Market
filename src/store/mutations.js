export default {
  AddCounter(state, payload) {
    payload.count++
  },
  AddToCart(state, payload) {
    state.cartList.push(payload)
  }
}