
import { ref } from "vue";
import {getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";

import { app } from "../firebase/db.js";


export function useImages() {

  const storage = getStorage(app);
  const images = ref([]);
  const photo = ref();
  const backgroundImage = ref();

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
  return { images, photo, backgroundImage, fetchIcons, fetchProfilePictures, fetchBackground };
}