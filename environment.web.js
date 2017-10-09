const firebase = require("firebase");
require("firebase/firestore");
let TransmuteFramework = require("transmute-framework").default;

let transmuteConfig = {
  providerUrl: "http://localhost:8545",
  aca: require("transmute-framework/build/contracts/RBAC.json"),
  esa: require("transmute-framework/build/contracts/RBACEventStore.json"),
  esfa: require("transmute-framework/build/contracts/RBACEventStoreFactory.json"),
  firebaseApp: firebase.initializeApp({
    apiKey: "AIzaSyAz5HkV4suTR49_1Cj40bQYd9Jgiv634qQ",
    authDomain: "transmute-framework.firebaseapp.com",
    databaseURL: "https://transmute-framework.firebaseio.com",
    projectId: "transmute-framework",
    storageBucket: "transmute-framework.appspot.com",
    messagingSenderId: "191884578641"
  })
};

TransmuteFramework.init(transmuteConfig);

module.exports = {
  TransmuteFramework
};
