<template>
  <div id="detail">
    <detail-nav-bar class="nav-detail"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childrenComponents/DetailNavBar.vue";
import DetailSwiper from "./childrenComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenComponents/DetailGoodsInfo.vue";
import DetailParamInfo from "./childrenComponents/DetailParamInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import { getDetail, Goods, Shop, GoodsParam } from "../../network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
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
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid传入数据
    getDetail(this.iid).then((res) => {
      console.log(res);
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
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
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