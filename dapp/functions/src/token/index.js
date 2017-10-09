const {
  challengeClientToSignMessage,
  verifyClientHasSignedMessage
} = require("./methods");

module.exports = async functionParams => {
  try {
    switch (functionParams.query.method) {
      case "challenge":
        return await challengeClientToSignMessage(functionParams);
        break;
      case "verify":
        return await verifyClientHasSignedMessage(functionParams);
        break;
    }
  } catch (e) {
    console.log(`error inside function ${functionParams.query.method}: `, e);
    throw e;
  }
};
