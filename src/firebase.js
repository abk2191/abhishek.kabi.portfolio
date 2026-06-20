import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy8Fu8jPj6HHzpVAiy9AkQVWR9HxR69Do",
  authDomain: "my-portfolio-1dde7.firebaseapp.com",
  projectId: "my-portfolio-1dde7",
  storageBucket: "my-portfolio-1dde7.firebasestorage.app",
  messagingSenderId: "49171221178",
  appId: "1:49171221178:web:9ef1c9dc630ff181399083",
  measurementId: "G-QDHQNQD2S0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
