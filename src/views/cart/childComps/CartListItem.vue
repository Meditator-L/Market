<template>
  <div>
    {{ product }}
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
};
</script>
<style scoped>
</style>