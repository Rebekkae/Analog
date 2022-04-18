// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHHKsiIVvv6eJ1vEPrWIk_q6IoBmC9J84",
  authDomain: "analog-bab50.firebaseapp.com",
  projectId: "analog-bab50",
  storageBucket: "analog-bab50.appspot.com",
  messagingSenderId: "702194579354",
  appId: "1:702194579354:web:057d80edddfc865814ec23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function load_home() {
    window.location.href = "home.html";
 } 

 function load_order() {
    window.location.href = "order.html";
 } 

 function load_profile() {
    window.location.href = "profile.html";
 } 

 function load_checkout() {
  window.location.href = "checkout.html";
} 

function make_order() {
  alert("Tak for din bestilling!");
  window.location.href = "home.html";
}

async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    window.location.href = "home.html";
  }
  
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    window.location.href = "login.html";
  }
  
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }
  
  function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || 'profile.png';
  }
  
  function getUserName() {
    return getAuth().currentUser.displayName;
  }
  
  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  //Change page on home.

var pageNumber = 1;

function back() {
  if (pageNumber === 3) {
    document.getElementById("catalog_pic").src="islatte.png"; //Hvis billede er dette billede, gå da til dette billede..
    pageNumber = 2;
  } else if (pageNumber === 2) {
    document.getElementById("catalog_pic").src="matcha.png";
    pageNumber = 1;
  }
  else if (pageNumber === 1) {
    document.getElementById("catalog_pic").src="kage.png";
    pageNumber = 3;
  }
}

function next() {
  if (pageNumber === 1) {
    document.getElementById("catalog_pic").src="islatte.png";
    pageNumber = 2;
  } else if (pageNumber === 2) {
    document.getElementById("catalog_pic").src="kage.png";
    pageNumber = 3;
  }
  else if (pageNumber === 3) {
    document.getElementById("catalog_pic").src="matcha.png";
    pageNumber = 1;
  }
}

var loginButton = document.getElementById('google_login');
loginButton.addEventListener('click', signIn);