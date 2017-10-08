import echo from "./echo/echo";
import installGlobals from "./install/globals";
import generateTSEnv from "./generate/env/ts";
import generateEnvMask from "./generate/env/mask";
import migrateFirebaseEnv from "./migrate/firebase/env";
import serveFunctions from "./serve/functions";

export class TransmuteCLI {
  echo = echo;
  installGlobals = installGlobals;
  generateTSEnv = generateTSEnv;
  generateEnvMask = generateEnvMask;
  migrateFirebaseEnv = migrateFirebaseEnv;
  serveFunctions = serveFunctions;
}

const instance = new TransmuteCLI();

export default instance;
