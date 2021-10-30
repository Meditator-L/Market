<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center> 购物街 </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollcontent">
      <home-swiper :banners="banners" class="home-swiper"></home-swiper>
      <recommand-view :recommends="recommends"></recommand-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "../../views/home/childrencomps/HomeSwiper.vue";
import RecommandView from "../../views/home/childrencomps/RecommandView.vue";
import FeatureView from "../../views/home/childrencomps/FeatureView.vue";
import TabControl from "../../components/content/tabcontrol/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

import { getHomeMutilate, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: true,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommandView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getHomeMutilate();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //网络请求方法
    getHomeMutilate() {
      getHomeMutilate().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    //监听事件方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    scrollcontent(position) {
      this.isShowBackTop = -position.y > 1000;
    },
  },
};
</script>
<style scoped>
#home {
  /* position: relative; */
  height: 100vh;
  padding-top: 44px;
  position: relative;
}

.home-nav {
  background: var(--color-tint);
  color: var(--color-background);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 8;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>