<template>
  <div id="detail">
    <detail-nav-bar
      class="nav-detail"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comments"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childrenComponents/DetailNavBar.vue";
import DetailSwiper from "./childrenComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenComponents/DetailGoodsInfo.vue";
import DetailParamInfo from "./childrenComponents/DetailParamInfo.vue";
import DetailCommentInfo from "./childrenComponents/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childrenComponents/DetailBottomBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import { itemListenerMixin, backTopMixin } from "../../common/mixin";
import { debounce } from "../../common/utils";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themTopYs: [],
      getthemeTopY: null,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
   
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid传入数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //  获取评论等navbar标题栏上面内容的距离
      this.$nextTick(() => {
        this.themTopYs = [];
        this.themTopYs.push(0);
        this.themTopYs.push(this.$refs.params.$el.offsetTop);
        this.themTopYs.push(this.$refs.comments.$el.offsetTop);
        this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themTopYs);
      });
    });
    //请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
    //给getthemeTopY赋值并进行防抖
    this.getthemeTopY = debounce(() => {
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop);
      this.themTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getthemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 100);
    },
    contentScroll(position) {
      //  获取Y值
      const positionY = -position.y;
      //positionY与主题部分实际距离对比
      let length = this.themTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themTopYs[i] &&
            positionY < this.themTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
  },
  mounted() {},
  updated() {
    // this.themTopYs = [ ];
    // this.themTopYs.push(0);
    // this.themTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themTopYs.push(this.$refs.comments.$el.offsetTop);
    // this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background: #fff;
}
.nav-detail {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>