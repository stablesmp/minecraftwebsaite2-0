import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD6_28BooZK4h-9B2minWpLW1PzJuzPZLs",
  authDomain: "elism-smp.firebaseapp.com",
  projectId: "elism-smp",
  storageBucket: "elism-smp.firebasestorage.app",
  messagingSenderId: "770989437660",
  appId: "1:770989437660:web:667a9243a75736b0453a19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc };
