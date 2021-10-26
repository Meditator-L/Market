<template>
  <tab-bar>
    <tab-bar-items path="/home" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="../../../assets/img/tabbar/home.svg" alt="" />
      </template>
      <template v-slot:item-icon-active activeColor="deepPink">
        <img src="../../../assets/img/tabbar/home_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-items>
    <tab-bar-items path="/category" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="../../../assets/img/tabbar/category.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../../assets/img/tabbar/category_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-items>
    <tab-bar-items path="/shopcar" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="../../../assets/img/tabbar/shopcart.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../../assets/img/tabbar/shopcart_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-items>
    <tab-bar-items path="/profile" activeColor="deepPink">
      <template v-slot:item-icon>
        <img src="../../../assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../../assets/img/tabbar/profile_active.svg" alt="" />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-items>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar.vue";
import TabBarItems from "../../common/tabbar/TabBarItems.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItems,
  },
};
</script>
<style scoped>
</style>