import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { ref } from "vue";
import { app } from "../firebase/db.js";

export function useBio() {
    const bio = ref();
    const storage = getStorage(app);
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
    return { bio, fetchBio };
}