<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{ length }})</template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //vuex中getters中的mapGetters辅助函数方法
    //数组方法
    // ...mapGetters(["cartLength", "cartList"]),
    //对象方法
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>
<style scoped>
 .cart {
    /*height: 100vh;*/
    position: relative;
  }
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>