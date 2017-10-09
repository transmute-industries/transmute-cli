const {
  challengeClientToSignMessage,
  verifyClientHasSignedMessage
} = require("./methods");

module.exports = functionParams => {
  try {
    switch (functionParams.query.method) {
      case "challenge":
        return challengeClientToSignMessage(functionParams);
        break;
      case "verify":
        return verifyClientHasSignedMessage(functionParams);
        break;
    }
  } catch (e) {
    console.log(`error inside function ${functionParams.query.method}: `, e);
    throw e;
  }
};
