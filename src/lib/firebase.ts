import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNwB7xmOo2opsq83KF1Kbtuhzsujx00TA",
  authDomain: "tracku1411.firebaseapp.com",
  projectId: "tracku1411",
  storageBucket: "tracku1411.firebasestorage.app",
  messagingSenderId: "58710814757",
  appId: "1:58710814757:web:2e00222248d3307765cfcc",
  measurementId: "G-XJPZ9R1KQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   