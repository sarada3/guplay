import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

import { IGame, IUser } from "./types";

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
const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const auth = getAuth(app);
export const storage = getStorage(app);
export const gameCollection = createCollection<IGame>("games");
export const userCollection = createCollection<IUser>("users");
