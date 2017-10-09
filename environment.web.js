const firebase = require("firebase");
require("firebase/firestore");

let TransmuteFramework = require("transmute-framework").default;

let transmuteConfig = {
  providerUrl: "http://localhost:8545",
  aca: require("../transmute-framework/build/contracts/RBAC.json"),
  esa: require("../transmute-framework/build/contracts/RBACEventStore.json"),
  esfa: require("../transmute-framework/build/contracts/RBACEventStoreFactory.json"),
  firebaseApp: firebase.initializeApp(require("../secrets/firebaseConfig.json"))
};

TransmuteFramework.init(transmuteConfig);

module.exports = {
  TransmuteFramework
};
