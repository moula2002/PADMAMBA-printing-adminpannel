import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Added for your data management

const firebaseConfig = {
  apiKey: "AIzaSyAeE6kgdM29tn6m1TXTJO8WgNFvvGnZMr8",
  authDomain: "padmamba-printing.firebaseapp.com",
  projectId: "padmamba-printing",
  storageBucket: "padmamba-printing.firebasestorage.app",
  messagingSenderId: "270652350721",
  appId: "1:270652350721:web:df20d373034090463b7b00",
  measurementId: "G-9TYWYD1ZG7"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;