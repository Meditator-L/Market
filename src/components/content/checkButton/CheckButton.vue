<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="../../../assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: Boolean,
    default() {
      return false;
    },
  },
  components: {},
};
</script>
<style scoped>
#check-button img {
  border-radius: 50%;
  border: 1px solid #aaa;
  align-items: center;
  justify-content: center;
}

.check {
  background-color: var(--color-high-text);
  border-radius: 50%;
}
</style>