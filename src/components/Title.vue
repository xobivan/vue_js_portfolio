<script setup>

  import { defineProps } from 'vue';
  const props = defineProps({
    title: String,
    description: String,
  })
</script>

<template>
    <div class="title">
      <h2>{{ props.title }}</h2>
      <div class="wrapper">
        <div class="text-wrapper">{{ props.description }}</div>
      </div>
    </div>
</template>

<style scoped lang="scss">
  @import '@/styles/constants.scss';

  .title {
    text-align: center;
    color: map-get($colors, primary);
    h2 {
      font-size: 4rem;
      text-transform: uppercase;
    }
  }

  .text-wrapper {
    text-transform: uppercase;
    &:after {
      content: "";
      width: 150px;
      display: block;
      margin: 20px auto;
      border-bottom: 1px solid map-get($colors, primary);
    }
  }
</style>