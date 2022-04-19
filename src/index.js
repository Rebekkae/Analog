// Import the functions you need from the SDKs you need
import { extractQuerystring } from "@firebase/util";
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
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

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

async function make_order() {
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
    return getAuth().currentUser.photoURL;
  }
  
  function getUserName() {
    return getAuth().currentUser.displayName;
  }
  
  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  function authStateObserver(user) {
    if (user) {
      // User is signed in!
      // Get the signed-in user's profile pic and name.
      saveUserData(user);
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
  
      // Set the user's profile pic and name.
      var userpic = document.getElementById('user-pic');
      var username = document.getElementById('username');
      var balance = document.getElementById('credits');
      if(userpic != null) {
        userpic.src = profilePicUrl;
      }
      if(username != null) {
        username.innerHTML = userName;
      }
      if(balance != null) {
        balance.innerHTML = "Kaffe credits: " + credits + ",-";
      }
    }
}

async function saveUserData(user) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), user.uid), {
      name: getUserName(),
      profilePicUrl: getProfilePicUrl(),
      credit: 0
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
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
if(loginButton != null) {
  loginButton.addEventListener('click', signIn);
}

var profileButton = document.getElementById('profile');
if(profileButton != null) {
  profileButton.addEventListener('click', load_profile);
}

var homeButton = document.getElementById('home');
if(homeButton != null) {
  homeButton.addEventListener('click', load_home);
}

var orderButton = document.getElementById('order');
if(orderButton != null) {
  orderButton.addEventListener('click', load_order);
}

var logoutButton = document.getElementById('log_out');
if(logoutButton != null) {
  logoutButton.addEventListener('click', signOutUser);
}

var nextButton = document.getElementById('next');
if(nextButton != null) {
  nextButton.addEventListener('click', next);
}

var prevButton = document.getElementById('prev');
if(prevButton != null) {
  prevButton.addEventListener('click', prev);
}

var checkoutButton = document.getElementById('se_ordre');
if(checkoutButton != null) {
  checkoutButton.addEventListener('click', load_checkout);
}

var makeOrderButton = document.getElementById('place_order');
if(makeOrderButton != null) {
  makeOrderButton.addEventListener('click', make_order);
}

initFirebaseAuth();