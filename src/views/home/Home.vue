<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center> 购物街 </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommand-view :recommends="recommends"></recommand-view>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "../../views/home/childrencomps/HomeSwiper.vue";
import RecommandView from "../../views/home/childrencomps/RecommandView.vue";
import { getHomeMutilate } from "../../network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommandView,
  },
  created() {
    getHomeMutilate().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style scoped>
.home-nav {
  background: var(--color-tint);
  color: var(--color-background);
}
</style>