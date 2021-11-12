<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center> 购物街 </template>
    </nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    >
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        class="home-swiper"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommand-view :recommends="recommends"></recommand-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
        <!-- :class="{fixed:true}" -->
      </tab-control>
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
import { itemListenerMixin } from "../../common/mixin";

export default {
  name: "Home",
  mixins: [itemListenerMixin],
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      
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
    //请求多个数据
    this.getHomeMutilate();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // //监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局事件监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
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
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成加载更多
        this.$refs.scroll.finishPullUp();
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position);
      //判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      //决定tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //获取tabControl的offsetTop
    swiperImageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },
  },
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background: var(--color-tint);
  color: var(--color-background);
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* z-index: 9; */
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
/* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
</style>