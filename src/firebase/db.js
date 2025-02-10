// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCp_HLIQcAEickcFv2GARz4x9p3J_AMBg",
  authDomain: "dmitry-spivak-portfolio.firebaseapp.com",
  databaseURL: "https://dmitry-spivak-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dmitry-spivak-portfolio",
  storageBucket: "dmitry-spivak-portfolio.appspot.com",
  messagingSenderId: "453158869926",
  appId: "1:453158869926:web:30507a2a0e50abc8ea0d67",
  measurementId: "G-HR0S9B9BFR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export { firebaseApp, storage };
