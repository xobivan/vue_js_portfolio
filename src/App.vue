<script setup>
  import { ref, onMounted, provide} from "vue";
  import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
  import { firebaseApp } from "./firebase/db.js";

  const storage = getStorage(firebaseApp);

  const images = ref([]);
  const photo = ref("");
  const backgroundImage = ref("");
  const bio = ref("");

  const fetchIcons = async() => {
    const iconsReference = storageRef(storage, "images/icons");
    const result = await listAll(iconsReference);
    const iconUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));
    images.value = iconUrls;
  }

  const fetchProfilePictures = async() => {
    const photoReference = storageRef(storage, "images/profile picture/photo_2025-01-27_23-37-32.jpg");
    photo.value = await getDownloadURL(photoReference);
  }

  const fetchBackground = async () => {
    const backgroundReference = storageRef(storage, "images/background/bg.png");
    backgroundImage.value = await getDownloadURL(backgroundReference);
  };

  const fetchBio = async() => {
    try{
      const bioRef = storageRef(storage, "bio/bio.txt");
      const bioRefValue = await getDownloadURL(bioRef);
      const response = await fetch(bioRefValue);
      bio.value = await response.text();
    } catch(error){
      console.error("Error reading file:", error)
    }
  }
  
  onMounted(async()=>{
    await fetchBio();
    await fetchIcons();
    await fetchProfilePictures();
    await fetchBackground();
  });
  provide("bio", bio);
</script>

<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded && backgroundImage" id="app">
      <profile-card :user="user" :background = "backgroundImage"></profile-card>
      <description :photo="photo"></description>
      <the-experience></the-experience>
      <skills :images="images"></skills>
    </div>
  </transition>
</template>

<script>
import ProfileCard from"./components/ProfileCard.vue";
import Description from "./components/Description.vue";
import TheExperience from './components/TheExperience.vue';
import Skills from "./components/Skills.vue";

export default{
  components:{
    ProfileCard,
    Description,
    TheExperience,
    Skills
  },
  data(){

    return{
      isLoaded: false,
      user: "Dmitry Spivak",
    }
  },
  created(){
    this.isLoaded = true;
    this.$nextTick(() => document.body.classList.remove("loading"));
  },
}
</script>

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
