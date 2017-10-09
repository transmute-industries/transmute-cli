import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// console.log("dapp loaded...");

import { TransmuteFramework as T } from "./environment.web";

console.log(T);

// T.db
//   .collection("RBACFactory")
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(`${doc.id} => `, doc.data());
//     });
//   });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
