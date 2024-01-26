import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBmANNAU8eSPizQT3qNejYMtpnT3R_VPSc",
    authDomain: "reactlinks-dias.firebaseapp.com",
    projectId: "reactlinks-dias",
    storageBucket: "reactlinks-dias.appspot.com",
    messagingSenderId: "146894134446",
    appId: "1:146894134446:web:b66ea40bffcedb7057613f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }