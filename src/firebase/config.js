// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDi2lUfCts_xOTf4GMy0xSfpk6AJ3NbW0",
    authDomain: "coderhouse-react-70895.firebaseapp.com",
    projectId: "coderhouse-react-70895",
    storageBucket: "coderhouse-react-70895.appspot.com",
    messagingSenderId: "20801587829",
    appId: "1:20801587829:web:db5241d3e1b08b7887c63c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
