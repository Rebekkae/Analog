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
  UserProfile,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
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
  var currentOrderText = localStorage.getItem('htmlText');
  if(currentOrderText == "") {
    alert("Du har ikke valgt noget endnu!");
  }
  else {
    window.location.href = "checkout.html";
  }
} 

function make_order() {
  var credits = parseInt(localStorage.getItem("creditKey"));
  var amount = parseInt(localStorage.getItem('total'));
  if(credits < total) {
    alert("Du har ikke nok kaffecredits!");
  }
  else {
    alert("Tak for din bestilling!");
    window.location.href = "home.html";
    credits = credits - amount;
    localStorage.setItem("creditKey", credits);
    localStorage.setItem('total', 0);
    localStorage.setItem('htmlText', "");
    localStorage.setItem('orderCount', 0);
  }
}

function addCredits() {
  var credits = parseInt(localStorage.getItem("creditKey"));
  var amount = parseInt(prompt("Hvor mange credits vil du sætte ind?"));
  if(amount < 0) {
    alert("Ugyldigt input!");
  }
  else {
    credits += amount;
    localStorage.setItem("creditKey", credits);
    location.reload();
  }
}

function addToOrder() {
  var count = localStorage.getItem('orderCount');
  if(count != 4) {
    count++;
    localStorage.setItem('orderCount', count);
    var currentOrderText = localStorage.getItem('htmlText');
    if(currentOrderText == null) {
      currentOrderText = "";
    }
    var currentOrderPrice = parseInt(localStorage.getItem('total'));
    if(isNaN(currentOrderPrice)) {
      currentOrderPrice = 0;
    }
    if(this.id == 'americano') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x Americano</p>\n" + 
            "<p>15,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 15;
    } 
    if(this.id == 'latte') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x Latte</p>\n" + 
            "<p>20,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 20;
    }
    if(this.id == 'islatte') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x Islatte</p>\n" + 
            "<p>25,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 25;
    }
    if(this.id == 'varm_kakao') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x Varm Kakao</p>\n" + 
            "<p>15,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 15;
    }
    if(this.id == 'the') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x The</p>\n" + 
            "<p>10,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 10;
    }
    if(this.id == 'cap') {
      currentOrderText += 
      "<div id=\"order_coffee" + count + "\" \n" +
        "<td>\n" +
            "<img src=\"order.png\" height=\"70\"/>\n" +
            "</br>\n" + 
            "<p>1x Cappuccino</p>\n" + 
            "<p>20,-</p>\n" +
        "</td>\n" +
      "</div>\n"
      currentOrderPrice += 20;
    }
    localStorage.setItem('htmlText', currentOrderText);
    localStorage.setItem('total', currentOrderPrice);
    alert("Tilføjet til bestilling");
  }
  else {
    alert("Du kan maks tilføje 4 ting til kurven");
  }
  
}

async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    window.location.href = "home.html";
    localStorage.setItem("creditKey", 100);
    localStorage.setItem('orderCount', 0);
    localStorage.setItem('total', 0);
    localStorage.setItem('htmlText', "");
  }
  
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    window.location.href = "index.html";
    localStorage.setItem("creditKey", 0);
    localStorage.setItem('orderCount', 0);
    localStorage.setItem('total', 0);
    localStorage.setItem('htmlText', "");
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
      var credits = parseInt(localStorage.getItem("creditKey"));
      // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
      var balance = document.getElementById('credits');
      // Set the user's profile pic and name.
      var userpic = document.getElementById('user-pic');
      var username = document.getElementById('username');
      if(userpic != null) {
        userpic.src = profilePicUrl;
      }
      if(username != null) {
        username.innerHTML = userName;
      }
      if(balance != null) {
        if(isNaN(credits)) {
          balance.innerHTML = "Kaffe credits: " + 0 + ",-";
          credits = 0;
          localStorage.setItem("creditKey", credits);
        }
        else {
          balance.innerHTML = "Kaffe credits: " + credits + ",-";
        }
      }
    }
    else {
      //Make sure that user is logged in, or else redirect to login page.
        if (location.pathname!="/index.html") {
        location.href="index.html";
      }
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

var backToMenuButton = document.getElementById('back_to_menu');
if(backToMenuButton != null) {
  backToMenuButton.addEventListener('click', load_order);
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
  prevButton.addEventListener('click', back);
}

var checkoutButton = document.getElementById('se_ordre');
if(checkoutButton != null) {
  checkoutButton.addEventListener('click', load_checkout);
}

var makeOrderButton = document.getElementById('place_order');
if(makeOrderButton != null) {
  makeOrderButton.addEventListener('click', make_order);
}

var settingsButton = document.getElementById('settings');
if(settingsButton != null) {
  settingsButton.addEventListener('click', addCredits);
}

const divs = document.querySelectorAll('.add_to_order');
if(divs != null) {
  divs.forEach(el => el.addEventListener('click', addToOrder));
};

initFirebaseAuth();