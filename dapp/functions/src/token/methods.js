const T = require("transmute-framework").default.init();

const moment = require("moment");
const uuidv4 = require("uuid/v4");

const _ = require("lodash");

const TokenChallengeStore = require("./TokenChallengeStore");

const confirmAddressSignedMessage = async (address, message, signature) => {
  const recoveredAddress = await T.Toolbox.recover(message, signature);
  return recoveredAddress === address;
};

const generateChallengeObjectForAddressToSign = async (
  tcs,
  client_address,
  client_message_raw
) => {
  // SIGN THIS TO PROVE YOU CONTROL ADDRESS
  const timestamp = moment().unix();
  const uuid = uuidv4();
  const message_raw = `${uuid}.${client_address}.${client_message_raw}`;
  const function_address = (await T.getAccounts())[1];
  const signatureObject = await T.Toolbox.sign(function_address, message_raw);

  const tokenChallengeObject = {
    client_address,
    client_message_raw,
    function_address,
    timestamp,
    uuid,
    message_raw,
    message_hex: signatureObject.messageBufferHex,
    message_signature: signatureObject.signature,
    token_issued: false
  };
  return await tcs.set(tokenChallengeObject);
};

const challengeClientToSignMessage = async functionParams => {
  const { message_raw, message_signature, address } = functionParams.query;
  const didClientAddressSignMessageRaw = await confirmAddressSignedMessage(
    address,
    message_raw,
    message_signature
  );
  const tcs = new TokenChallengeStore(functionParams.env.TransmuteFramework.db);

  const challengeObject = await generateChallengeObjectForAddressToSign(
    tcs,
    address,
    message_raw
  );
  return {
    status: 200,
    body: {
      // callingArgs: _.omit(functionParams, "db", "admin"),
      conditions: {
        didClientAddressSignMessageRaw
      },
      challenge: challengeObject.message_raw
    },
    redirect: null
  };
};

const verifyClientHasSignedMessage = async functionParams => {
  const {
    address,
    message_raw,
    message_hex,
    message_signature
  } = functionParams.query;

  const tcs = new TokenChallengeStore(functionParams.env.TransmuteFramework.db);
  const storedChallange = await tcs.get(address);

  // console.log("storedChallange: ", storedChallange);
  // console.log("request_params: ", {
  //   address,
  //   message_raw,
  //   message_hex,
  //   message_signature
  // });

  // Address has stored challange
  const clientAddressHasStoredChallenge =
    storedChallange.client_address === address;

  // Has the client_address signed the message we expect them to sign.
  const clientMessageRawIsStoredChallengeMessageHex =
    storedChallange.message_hex === message_raw;

  // We trust the store, and verify that this function has signed this challenge
  const functionAddressHasSignedStoredChallengeMessageHex = await confirmAddressSignedMessage(
    storedChallange.function_address,
    storedChallange.message_hex,
    storedChallange.message_signature
  );

  // Client and server must sign with different addresses.
  const functionAddressIsNotClientAddress =
    storedChallange.function_address !== address;

  // We trust client, and verify that they have signed the stored challenge
  // Does this signature originate from the client_address
  const clientAddressHasSignedMessageRaw = await confirmAddressSignedMessage(
    address,
    message_raw,
    message_signature
  );

  const conditions = {
    // client and function address must not be the same
    functionAddressIsNotClientAddress,
    // the function must sign the challenge for it to be valid
    functionAddressHasSignedStoredChallengeMessageHex,
    // the client address has a stored challenge
    // If not we cannot verify, clients must sign a challenge that is already signed by the function)
    clientAddressHasStoredChallenge,
    // the client message_raw is the stored message hex
    // the client is providing a signature for the stored message hex
    clientMessageRawIsStoredChallengeMessageHex,
    // the client message_raw, message_hex, message_signature were signed by the client address
    clientAddressHasSignedMessageRaw
  };

  const success = _.every(_.values(conditions));

  if (success) {
    storedChallange.token_issued = true;
    let updatedStoredChallange = await tcs.set(storedChallange);
    let customToken = await functionParams.env.TransmuteFramework.firebaseAdmin
      .auth()
      .createCustomToken(address, conditions);

    return {
      status: 200,
      body: {
        // callingArgs: _.omit(functionParams, "db", "admin"),
        token: customToken
      },
      redirect: null
    };
  } else {
    return {
      status: 401,
      body: {
        message: "client and function have not signed the same challenge."
      },
      redirect: null
    };
  }
};

module.exports = {
  challengeClientToSignMessage,
  verifyClientHasSignedMessage
};
