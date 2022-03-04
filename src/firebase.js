// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCho_22OeHw2eTE3VXvVv4rY0rZWJRqtdo",
  authDomain: "twitter-clone-4982f.firebaseapp.com",
  databaseURL: "https://twitter-clone-4982f-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-4982f",
  storageBucket: "twitter-clone-4982f.appspot.com",
  messagingSenderId: "1086943189113",
  appId: "1:1086943189113:web:ea508b709a4ce0b1211ca8",
  measurementId: "G-TMLRJGVN7E"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dbRef= ref(db,"posts")
const storage = getStorage();

export {storage};
export default dbRef;

