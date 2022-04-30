// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPIHuwaK17YHjMnHq6S0UFHjh35OBwWiI",
  authDomain: "guplay-22ced.firebaseapp.com",
  projectId: "guplay-22ced",
  storageBucket: "guplay-22ced.appspot.com",
  messagingSenderId: "19345757289",
  appId: "1:19345757289:web:22be16d72c057eb68e3ef8",
  measurementId: "G-1PYDRWS7MB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {};
