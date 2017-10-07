// const Firestore = require("@google-cloud/firestore");

// const firestore = new Firestore({
//   projectId: "transmute-framework",
//   keyFilename: "./transmute-framework-e82897ed8bb7.json"
// });

// const document = firestore.doc("read_models/alovelace");

// document
//   .set({
//     title: "Welcome to Firestore",
//     body: "Hello World"
//   })
//   .then(() => {
//     // Document created successfully.
//     document.get().then(doc => {
//       // Document read successfully.
//       console.log(doc);
//     });
//   });

var admin = require("firebase-admin");

var serviceAccount = require("../transmute-framework-e82897ed8bb7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://transmute-framework.firebaseio.com"
});

const db = admin.firestore();

const docRef = db.collection("read_models");

docRef.get().then(data => {
  console.log(data);
});

// const setAda = docRef
//   .set({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   })
//   .then(data => {
//     console.log(data);
//   });

// const firebase = require("firebase");

// firebase.initializeApp(firebaseConfig);

// const getItem = key => {
//   return new Promise((resolve, reject) => {
//     db
//       .ref(storePath + key)
//       .once("value")
//       .then(snapshot => {
//         let obj = snapshot.val();
//         resolve(obj);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

// const setItem = (key, value) => {
//   return new Promise((resolve, reject) => {
//     db
//       .ref(storePath + key)
//       .set(value)
//       .then(() => {
//         resolve(value);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
