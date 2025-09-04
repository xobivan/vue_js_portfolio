<script setup>
  import SocialBar from './SocialBar.vue'
  import { inject } from 'vue';
  const {userData, links} = inject("userStore");
</script>

<template>
  <div class="personal">
    <h3>{{ userData.name }}</h3>
    <div class="data"><strong>E-mail:</strong> {{ userData.email }}</div>
    <div class="data"><strong>Phone:</strong> {{ userData.phone }}</div>
    <div class="data"><strong>City:</strong> {{ userData.city }}</div>
    <div class="data"><strong>Languages:</strong> {{ userData.languages }}</div>
    <social-bar :links="links"></social-bar>
  </div>
</template>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    .data {
        margin-bottom: 15px;
    }

    @media(min-width: #{map-get($breakpoints, medium)}) {
        .personal {
          float: right;
        }
    }
    @media(max-width: #{map-get($breakpoints, small)}){
      .personal{
        text-align: left !important;
        padding: 1rem
      }
    }
</style>