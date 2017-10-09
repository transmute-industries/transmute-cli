import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// import { TransmuteFramework as T } from "./environment.web";

// T.db
//   .collection("RBACFactory")
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(`${doc.id} => `, doc.data());
//     });
//   });

console.log("dapp loaded...");

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
