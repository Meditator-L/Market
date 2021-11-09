<template>
  <div id="detail">
    <detail-nav-bar class="nav-detail"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childrenComponents/DetailNavBar.vue";
import DetailSwiper from "./childrenComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childrenComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenComponents/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import { getDetail, Goods, Shop } from "../../network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid传入数据
    getDetail(this.iid).then((res) => {
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
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
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
}
.content {
  height: calc(100% - 44px);
}
</style>