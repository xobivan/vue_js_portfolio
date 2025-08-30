import { ref, nextTick} from "vue";

export function useAppLoader(fetchUserData, fetchBio, fetchIcons, fetchProfilePictures, fetchBackground, fetchRepos, fetchCollection) {
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
    await fetchRepos();
    await fetchCollection();
  }

  return { isLoaded, loadAll };
}