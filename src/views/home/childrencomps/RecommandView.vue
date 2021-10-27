<template>
  <div class="recommends">
    <div
      v-for="(items, index) in recommends"
      :key="index"
      class="recommends-item"
    >
      <a :href="items.link">
        <img :src="items.image" alt="" />
        <div>{{ items.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommandView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.recommends-item {
  flex: 1;
}

.recommends-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>