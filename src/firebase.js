// // import firebase from "firebase";
// // // import firebase from "firebase/compat/app";
// // import "firebase/compat/auth";
// // import "firebase/compat/firestore";
// // import "firebase/compat/database";

// import { initializeApp } from 'firebase/app';
// // import 'firebase/auth';
// import 'firebase/firestore';
// // import "firebase/compat/database";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//     apiKey: "AIzaSyCj8WJX5RWqcCAaiYG0wla640eemlYbACI",
//     authDomain: "whatsapp-clone-65531.firebaseapp.com",
//     projectId: "whatsapp-clone-65531",
//     storageBucket: "whatsapp-clone-65531.appspot.com",
//     messagingSenderId: "638643637230",
//     appId: "1:638643637230:web:57fea97f0c2a0619e25cff",
//     measurementId: "G-2JYJFRJ2KF"
//   };

//   const firebaseApp = firebase.initializeApp(firebaseConfig);
//   const db = firebaseApp.firestore();
//   const auth = firebase.auth();
//   const provider = new firebase.auth.GoogleAuthProvider();

//   export { auth, provider };
//   export default db;



// import firebase from "firebase";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
// import { getFirestore, } from 'firebase/firestore/lite';
// import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/database";

// import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCj8WJX5RWqcCAaiYG0wla640eemlYbACI",
  authDomain: "whatsapp-clone-65531.firebaseapp.com",
  projectId: "whatsapp-clone-65531",
  storageBucket: "whatsapp-clone-65531.appspot.com",
  messagingSenderId: "638643637230",
  appId: "1:638643637230:web:57fea97f0c2a0619e25cff",
  measurementId: "G-2JYJFRJ2KF",
};

// const firebaseConfig = {
//   //...
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const db = getDatabase(app);
// const db = getFirestore(app);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = app.firestore();
const auth = getAuth(app);
// const auth = firebase.auth();
const provider = new GoogleAuthProvider();

// let provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
