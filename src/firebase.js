import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB-PpAuwHrR7jE9h2qEYr7AEkAk8UH-ork",
  authDomain: "yumemi-coding.firebaseapp.com",
  projectId: "yumemi-coding",
  storageBucket: "yumemi-coding.appspot.com",
  messagingSenderId: "218571744755",
  appId: "1:218571744755:web:998398cc6724e83548de86",
  measurementId: "G-R6CG74N620",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
