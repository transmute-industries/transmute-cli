const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
const firebaseApp = require("firebase");
// Required for side-effects
require("firebase/firestore");

const SECRET_ENV_PATH = "../secrets/environment.secret.env";
let IS_LOCAL = true;
let config = null;
try {
  config = functions.config();
  IS_LOCAL = false;
} catch (e) {
  require("dotenv").config({ path: SECRET_ENV_PATH });
}

const GOOGLE_PROJECT_SERVICE_ACCOUNT_ABS_PATH = IS_LOCAL
  ? process.env.GOOGLE_PROJECT_SERVICE_ACCOUNT_ABS_PATH
  : config.transmute.google_project_service_account_abs_path;
const GOOGLE_PROJECT_FIREBASE_CONFIG_ABS_PATH = IS_LOCAL
  ? process.env.GOOGLE_PROJECT_FIREBASE_CONFIG_ABS_PATH
  : config.transmute.google_project_firebase_config_abs_path;
const GOOGLE_PROJECT_NAME = IS_LOCAL
  ? process.env.GOOGLE_PROJECT_NAME
  : config.transmute.google_project_name;
const TRANSMUTE_API_BASE_URL = IS_LOCAL
  ? process.env.TRANSMUTE_API_BASE_URL
  : config.transmute.transmute_api_base_url;

if (IS_LOCAL) {
  const serviceAccount = require(GOOGLE_PROJECT_SERVICE_ACCOUNT_ABS_PATH);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
}

if (!IS_LOCAL) {
  firebaseAdmin.initializeApp(functions.config().firebase);
}

const firebaseConfig = require(GOOGLE_PROJECT_FIREBASE_CONFIG_ABS_PATH);

firebaseApp.initializeApp(firebaseConfig);

module.exports = {
  firebaseAdmin,
  firebaseApp,
  GOOGLE_PROJECT_SERVICE_ACCOUNT_ABS_PATH,
  GOOGLE_PROJECT_FIREBASE_CONFIG_ABS_PATH,
  GOOGLE_PROJECT_NAME,
  TRANSMUTE_API_BASE_URL
};
