import { ref, nextTick} from "vue";

export function useAppLoader(fetchUserData, fetchBio, fetchIcons, fetchProfilePictures, fetchBackground) {
  const isLoaded = ref(false);
  const loadAll = async()=>{
    isLoaded.value = true;
    await nextTick();
    document.body.classList.remove("loading");
    await fetchUserData();
    await fetchBio();
    await fetchIcons();
    await fetchProfilePictures();
    await fetchBackground();
  }

  return { isLoaded, loadAll };
}