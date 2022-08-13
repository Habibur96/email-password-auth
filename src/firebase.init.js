// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs5xJr8uO8v6p5bAH6XUfobZ4RXabdfMI",
    authDomain: "email-password-auth-aefb0.firebaseapp.com",
    projectId: "email-password-auth-aefb0",
    storageBucket: "email-password-auth-aefb0.appspot.com",
    messagingSenderId: "286579570728",
    appId: "1:286579570728:web:5ba93b661ade8e596e5d1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;