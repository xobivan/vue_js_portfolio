<script setup>
  import { inject } from "vue";
  const bioText = inject("userStore");
</script>

<template>
  <div class="paragraph">
    <h3>LET ME INTRODUCE MYSELF</h3>
    <div v-if="bioText" class="begin">{{ bioText.bio }}</div>
    <div v-else>Failed to load description</div>
  </div>
</template>

<script>
export default {
  name: "Description",
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.paragraph {
  color: map-get($colors, primary);
  .begin {
    color: map-get($colors, secondary);
  }
}
</style>