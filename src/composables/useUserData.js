import { ref } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db.js";

export function useUserData() {
  const userData = ref();
  const links = ref();

  const fetchUserData = async () => {
    const docRefContacts = doc(db, "user", "VvuaZ3Q24ZRxlXXbWzfH");
    const docRefLinks = doc(db, "user", "VvuaZ3Q24ZRxlXXbWzfH", "links", "QjjWqckKhxLJbDHr39Dr");
    const docSnapContacts = await getDoc(docRefContacts);
    const docSnapLinks = await getDoc(docRefLinks);
    if (docSnapContacts.exists() && docSnapLinks.exists()) {
      userData.value = docSnapContacts.data();
      links.value = docSnapLinks.data();
    } else {
      console.error("No such a document !");
    }
  };

  return { userData, links, fetchUserData };
}