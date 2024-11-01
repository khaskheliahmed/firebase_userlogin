import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4o9Q76JvoPMeb1RSviivXEpt3nPbcX8o",
  authDomain: "dynamic-project-f921c.firebaseapp.com",
  projectId: "dynamic-project-f921c",
  storageBucket: "dynamic-project-f921c.appspot.com",
  messagingSenderId: "888608782992",
  appId: "1:888608782992:web:4cd4650dfe145b3688b615",
  measurementId: "G-5899X8SD03"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export   const db = getFirestore(app);