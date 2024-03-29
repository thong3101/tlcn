
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6aFlVKFOUXQ2xAIgIweI2SA3A6-lSZgM",
  authDomain: "chat-a1424.firebaseapp.com",
  projectId: "chat-a1424",
  storageBucket: "chat-a1424.appspot.com",
  messagingSenderId: "835698455205",
  appId: "1:835698455205:web:ae4f694c44984311fb134c",
  measurementId: "G-RJFNXTHDWH"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);