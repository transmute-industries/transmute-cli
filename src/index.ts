import echo from "./echo/echo";
import installGlobals from "./install/globals";

import migrateFirebaseEnv from "./migrate/firebase/env";

export class TransmuteCLI {
  echo = echo;
  installGlobals = installGlobals;
  migrateFirebaseEnv = migrateFirebaseEnv;
}

const instance = new TransmuteCLI();

export default instance;
