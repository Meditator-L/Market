import { debounce } from "./utils";
import BackTop from "../components/content/backtop/BackTop.vue";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}