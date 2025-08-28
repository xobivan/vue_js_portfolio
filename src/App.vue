<script setup>
  import {onMounted, provide} from "vue";
  import { defineAsyncComponent } from 'vue';
  import { useImages } from "./composables/useImages.js";
  import { useUserData } from "./composables/useUserData.js";
  import { useBio } from "./composables/useBio.js";
  import { useAppLoader } from "./composables/useAppLoader.js";
  import { useGitRepos } from "./composables/useGitRepos.js";
/*   import ProfileCard from"./components/ProfileCard.vue";
  import Description from "./components/Description.vue";
  import TheExperience from './components/TheExperience.vue';
  import Skills from "./components/Skills.vue"; */

  const ProfileCard = defineAsyncComponent(() => import("./components/ProfileCard.vue"));
  const Description = defineAsyncComponent(() => import("./components/Description.vue"));
  const TheExperience = defineAsyncComponent(() => import("./components/TheExperience.vue"));
  const Skills = defineAsyncComponent(() => import("./components/Skills.vue"));
  
  const { userData, links, fetchUserData } = useUserData();
  const { bio, fetchBio } = useBio();
  const { fetchIcons, fetchProfilePictures, fetchBackground, images, photo, backgroundImage } = useImages();
  const { repos, fetchRepos } = useGitRepos();
  const {isLoaded, loadAll} = useAppLoader(fetchUserData, fetchBio, fetchIcons, fetchProfilePictures, fetchBackground, fetchRepos);
  onMounted(loadAll)

  provide("userStore", {bio, userData, links});
</script>

<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded && backgroundImage" id="app">
      <profile-card :user = "userData.name" :background = "backgroundImage"></profile-card>
      <description :photo="photo"></description>
      <the-experience :repos="repos"></the-experience>
      <skills :images="images"></skills>
    </div>
  </transition>
</template>


<style scoped lang="scss">
@import "./styles/constants.scss";

#app {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  height: 100%;
}
</style>
