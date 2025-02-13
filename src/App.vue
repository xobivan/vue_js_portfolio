<script setup>
  import { ref, onMounted, provide, nextTick} from "vue";
  import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
  import { doc, getDoc } from "firebase/firestore";
  import { firebaseApp, db } from "./firebase/db.js";
  import ProfileCard from"./components/ProfileCard.vue";
  import Description from "./components/Description.vue";
  import TheExperience from './components/TheExperience.vue';
  import Skills from "./components/Skills.vue";

  const isLoaded = ref(false);

  const storage = getStorage(firebaseApp);
  const images = ref([]);
  const photo = ref();
  const backgroundImage = ref();
  const bio = ref();
  const userData = ref();
  const links = ref();

  const fetchUserData = async() => {
    const docRefContacts = doc(db, "user", "VvuaZ3Q24ZRxlXXbWzfH");
    const docRefLinks = doc(db, "user", "VvuaZ3Q24ZRxlXXbWzfH", "links", "QjjWqckKhxLJbDHr39Dr");
    const docSnapContacts = await getDoc(docRefContacts);
    const docSnapLinks = await getDoc(docRefLinks);
    if (docSnapContacts.exists() && docSnapLinks.exists()){
      userData.value = docSnapContacts.data();
      links.value = docSnapLinks.data();
    } else {
      console.error("No such a document !")
    }
  }

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
    isLoaded.value = true;
    await nextTick();
    document.body.classList.remove("loading");
    await fetchUserData();
    await fetchBio();
    await fetchIcons();
    await fetchProfilePictures();
    await fetchBackground();
  });
  provide("userStore", {bio, userData, links});
</script>

<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded && backgroundImage" id="app">
      <profile-card :user = "userData.name" :background = "backgroundImage"></profile-card>
      <description :photo="photo"></description>
      <the-experience></the-experience>
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
