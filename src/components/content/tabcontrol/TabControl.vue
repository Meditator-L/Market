<template>
  <div class="tabcontrol">
    <div
      v-for="(items, index) in title"
      :key="index"
      class="tabitems"
      :class="{ active: index == currentIndex }"
      @click="itemsclick(index)"
    >
      <span>{{ items }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods:{
    itemsclick(index){
      this.currentIndex =index
    }
  }
};
</script>
<style scoped>
.tabcontrol {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tabitems {
  flex: 1;
}
.tabitems span{
  padding: 4px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>