// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-abT1G_SoOII0gIRARhdHmIcNdiTeZJw",
  authDomain: "leo-saloon-slot-booking.firebaseapp.com",
  projectId: "leo-saloon-slot-booking",
  storageBucket: "leo-saloon-slot-booking.appspot.com",
  messagingSenderId: "1046174762673",
  appId: "1:1046174762673:web:018452d716f2a859bd8490",
  measurementId: "G-X4K5952FLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);
export default app;