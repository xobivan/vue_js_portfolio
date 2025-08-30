import {ref} from 'vue';
import { db } from "../firebase/db.js";
import { collection, getDocs, orderBy } from "firebase/firestore";

let educations = ref([]);

export function useEducations(){

    const fetchCollection = async () => {

        console.log('[useEducations] about to call getDocs');
        try {
            const querySnapshot = await getDocs(collection(db, "educations"), orderBy('order'));
            const docsArr = querySnapshot.docs;
   
            for(let i = 0; i<docsArr.length; i++){
                let doc = docsArr[i];
                educations.value.push(doc.data())
            }
            console.log(educations.value);
            console.log('[useEducations] done');
        } catch (e) {
            console.error('[useEducations] ERROR:', e);
        }
    };

    console.log("hey, ",educations.value);
    return {educations, fetchCollection};
}